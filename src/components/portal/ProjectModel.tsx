import { APICaller } from "../../helpers/api";
import Backdrop from "./Backdrop";
import Input from "../form/Input";
import { useState } from "react";
import Button from "../Button";
import { getUser } from "../../helpers/cookie";

interface IProjectModelProps {
    closeModel: () => void;
}

const ProjectModel = ({ closeModel }: IProjectModelProps) => {

    const [project, setProject] = useState<Partial<Project>>({
        name: '',
        description: '',
    })
    const [status, setStatus] = useState<string>("in progress");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const { statusCode, data, error } = await APICaller("/projects", "POST", {
            ...project,
            ownerID: getUser()._id,
            status,
        });
        
        if(statusCode === 201) {
            console.log(data);
        } else {
            console.log(error);
        }

        closeModel();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProject(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <Backdrop closeModel={closeModel}>
            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-md w-1/2 fixed top-20 left-1/2 -translate-x-1/2 p-4">
                <form onSubmit={handleSubmit}>
                    <Input 
                        label="Project Name"
                        name="name"
                        type="text"
                        value={project.name || ''}
                        onChange={handleChange}
                        placeholder="Project Name"
                        required
                        classes="mb-4"
                        errors={null}
                    />
                    <Input 
                        label="Project Description"
                        name="description"
                        type="text"
                        value={project.description || ""}
                        onChange={handleChange}
                        placeholder="Project Description"
                        required={false}
                        classes="mb-4"
                        errors={null}
                    />
                    <Button 
                        children="Create Project"
                        type="submit"
                        onClick={() => {}}
                        variant="primary"
                        classes="w-full"
                    />
                    <Button 
                        children="Save as Draft"
                        type="submit"
                        onClick={() => setStatus("draft")}
                        variant="dark"
                        classes="w-full mt-4"
                    />
                </form>
            </div>
        </Backdrop>
    )
}

export default ProjectModel