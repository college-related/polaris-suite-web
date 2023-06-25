import { useState } from "react";
import Backdrop from "./Backdrop"
import Button from "../Button";
import Input from "../form/Input";
import { APICaller } from "../../helpers/api";
import { Trash } from "react-feather";

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
    const [collaborators, setCollborators] = useState<Partial<Collaborator>[]>(projectData?.members || [])

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

    const handleDelete = async (email: string) => {
        if(window.confirm("Are you sure you want to delete this collaborator?") === false) return

        const { statusCode, error } = await APICaller(`/projects/${projectData?._id}/members/remove`, "PATCH", { email })

        if(statusCode === 200) {
            setProjects(prev => (prev.map(proj => proj._id === projectData?._id ? {...proj, members: proj.members.filter(member => member.email !== email)} : proj)));
            setCollborators(prev => (prev.filter(collaborator => collaborator.email !== email)));
        }else {
            console.log(error)
        }
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
                    <select name="role" onChange={handleChange}>
                        <option value="tester">Tester</option>
                        <option value="developer">Developer</option>
                        <option value="stakeholder">Stakeholder</option>
                    </select>
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
                                            <span className="text-red-400 cursor-pointer" onClick={()=>handleDelete(collaborator.email!)}>
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
    </Backdrop>
  )
}

export default CollaboratorModel