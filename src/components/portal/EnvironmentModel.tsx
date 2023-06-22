import { useState } from "react";
import Backdrop from "./Backdrop"
import Input from "../form/Input";
import Button from "../Button";
import { APICaller } from "../../helpers/api";
import { Minus } from "react-feather";

interface IEnvironmentModelProps {
    closeModel: () => void;
    setEnvironments: React.Dispatch<React.SetStateAction<Partial<Project> | null>>;
    projectId: string;
    environmentData: Partial<Environment> | undefined;
}

const EnvironmentModel = ({ closeModel, setEnvironments, projectId, environmentData }: IEnvironmentModelProps) => {
  
    const [environment, setEnvironment] = useState<Partial<Environment>>({
        name: environmentData?.name || '',
        description: environmentData?.description || '',
        variables: environmentData?.variables || [],
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setEnvironment(prev => ({
        ...prev,
        [e.target.name]: e.target.value,
    }))

    const addVariables = () => setEnvironment(prev => ({
        ...prev,
        variables: [...prev.variables!, { name: '', value: '' }]
    }))

    const removeVariable = (index: number) => setEnvironment(prev => ({
        ...prev,
        variables: prev.variables?.filter((_, i) => index !== i)
    }))

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let toSendEnvironment: Partial<Environment> = {
            name: environment.name,
        };

        if(environment.description !== '') {
            toSendEnvironment = {
                ...toSendEnvironment,
                description: environment.description,
            }
        }
        if(environment.variables?.length !== 0) {
            toSendEnvironment = {
                ...toSendEnvironment,
                variables: environment.variables?.map(env => ({ name: env.name, value: env.value })),
            }
        }

        let url = `/environments/${projectId}`;
        let method: "POST" | "PATCH" = "POST";

        if(environmentData) {
            url += `/${environmentData._id}`;
            method = "PATCH";
        }

        const { statusCode, data, error } = await APICaller(url, method, toSendEnvironment);
        
        if(statusCode === 201) {
            setEnvironments(prev => ({
                ...prev,
                environments: [...prev?.environments!, data.environment],
            }));
        } else if(statusCode === 200) {
            setEnvironments(prev => ({
                ...prev,
                environments: prev?.environments?.map(env => env._id === environmentData?._id ? data.environment : env),
            }));  
        } else {
            console.log(error);
        }

        closeModel();
    }

    return (
    <Backdrop closeModel={closeModel}>
        <div className="bg-white rounded-md p-4 w-1/2 mt-20 mx-auto" onClick={(e)=>e.stopPropagation()}>
            <h1 className="text-2xl font-bold">Create Environment</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <Input 
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    value={environment.name || ''}
                    placeholder="Environment Name"
                />
                <br />
                <Input 
                    label="Description"
                    name="description"
                    onChange={handleChange}
                    value={environment.description || ''}
                    placeholder="Environment description"
                    required={false}
                />
                <br />
                {
                    environment.variables?.map((variable, index) => (
                      <div key={index} className="flex gap-2 items-end w-full">
                        <Input 
                            label="Variable Name"
                            name="name"
                            onChange={(e) => {
                                setEnvironment(prev => ({
                                    ...prev,
                                    variables: prev.variables?.map((v, i) => i === index ? { ...v, name: e.target.value } : v)
                                }))
                            }}
                            value={variable.name}
                            placeholder="Variable Name"
                            required={false}
                        />
                        <br />
                        <Input 
                            label="Variable Value"
                            name="value"
                            onChange={(e) => {
                                setEnvironment(prev => ({
                                    ...prev,
                                    variables: prev.variables?.map((v, i) => i === index ? { ...v, value: e.target.value } : v)
                                }))
                            }}
                            value={variable.value}
                            placeholder="Variable Value"
                            required={false}
                        />
                        <Button type="button" variant="dark" onClick={()=>removeVariable(index)}><Minus /></Button>
                      </div>  
                    ))
                }
                <div className="flex justify-end gap-2 mt-4">
                    <Button type="button" onClick={addVariables} variant="default" classes="rounded-sm">Add Variables</Button>
                    <Button type="button" onClick={closeModel} variant="default" classes="bg-red-500 rounded-sm">Cancel</Button>
                    <button className="px-3 py-1 bg-green-500 text-white rounded-sm" type="submit">{environmentData ? 'Edit' : 'Create'}</button>
                </div>
            </form>
        </div>
    </Backdrop>
  )
}

export default EnvironmentModel