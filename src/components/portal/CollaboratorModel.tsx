import { useState } from "react";
import Backdrop from "./Backdrop"
import Button from "../Button";
import Input from "../form/Input";
import { APICaller } from "../../helpers/api";
import { Trash } from "react-feather";
import { useModel } from "../../utils/hooks/useModel";
import AlertModel from "./AlertModel";
import Select from "../form/Select";

interface ICollaboratorModelProps {
    closeModel: () => void;
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
    projectData: Partial<Project> | undefined;
}


const CollaboratorModel = ({ closeModel, setProjects, projectData }: ICollaboratorModelProps) => {

    const [collaborator, setCollaborator] = useState<Partial<Collaborator>>({
        email: '',
        role: 'tester',
    })
    const [selectedMail, setSelectedMail] = useState<string>('')
    const [collaborators, setCollborators] = useState<Partial<Collaborator>[]>(projectData?.members || [])
    const { isModelOpen, openModel, closeModel: handleCloseModel } = useModel();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setCollaborator(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const { statusCode, data, error } = await APICaller(`/projects/${projectData?._id}/invite`, "PATCH", collaborator);

        if(statusCode === 200) {
            setProjects(prev => (prev.map(proj => proj._id === data.project._id ? data.project : proj)));
            setCollborators(prev => ([...prev, {
                email: collaborator.email || '',
                role: collaborator.role || 'tester',
                status: 'pending',
            }]));
        } else {
            console.log(error);
        }
    }

    const handleDeleteSelect = (email: string) => {
        openModel();
        setSelectedMail(email);
    }

    const handleDelete = async () => {
        const { statusCode, error } = await APICaller(`/projects/${projectData?._id}/members/remove`, "PATCH", { email: selectedMail })

        if(statusCode === 200) {
            setProjects(prev => (prev.map(proj => proj._id === projectData?._id ? {...proj, members: proj.members.filter(member => member.email !== selectedMail)} : proj)));
            setCollborators(prev => (prev.filter(collaborator => collaborator.email !== selectedMail)));
        }else {
            console.log(error)
        }

        setSelectedMail('');
        handleCloseModel();
    }

  return (
    <Backdrop closeModel={closeModel}>
        <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-md w-1/2 fixed top-20 left-1/2 -translate-x-1/2 p-4">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-3 gap-2 items-center">
                    <Input 
                        label="Email"
                        name="email"
                        type="email"
                        value={collaborator.email || ''}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        classes="col-span-2"
                        errors={null}
                    />
                    <Select 
                        name="role"
                        label="Role"
                        onChange={handleChange}
                        options={[
                            { name: "Tester", value: "tester" },
                            { name: "Developer", value: "developer" },
                            { name: "Stakeholder", value: "stakeholder" },
                        ]}
                    />
                </div>
                {
                    projectData && (
                        <div className="mt-4 border-t-2 py-4">
                            <h5>Collaborators</h5>
                            {
                                collaborators.length === 0 && (
                                    <>
                                        <p>No Collaborators</p>
                                        <p>Add collaborators to work together</p>
                                    </>
                                )
                            }
                            {
                                collaborators.map((collaborator, index) => (
                                    <div key={index} className="flex items-center justify-between border rounded-sm my-2 p-4">
                                        <p>{collaborator.email}</p>
                                        <div className="flex items-center gap-2">
                                            <p className={`text-white px-3 ${collaborator.status==='accepted'?'bg-green-600':collaborator.status==='pending'?'bg-yellow-600':'bg-red-600'}`}>{collaborator.role}</p>
                                            <span className="text-red-400 cursor-pointer" onClick={()=>handleDeleteSelect(collaborator.email!)}>
                                                <Trash />
                                            </span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
                <Button 
                    children={`Add Collaborator to Project`}
                    type="submit"
                    onClick={() => {}}
                    variant="primary"
                    classes="w-full"
                />
                <Button 
                    children="Cancel"
                    type="button"
                    onClick={closeModel}
                    variant="default"
                    classes="w-full mt-4 bg-red-500"
                />
            </form>
        </div>
        {isModelOpen && (<AlertModel closeModel={handleCloseModel} handleConfirm={handleDelete} title="Remove Collaborator" message="Are you sure you want to remove the person?" />)}
    </Backdrop>
  )
}

export default CollaboratorModel