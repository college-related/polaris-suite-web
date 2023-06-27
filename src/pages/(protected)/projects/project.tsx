import { useEffect, useState } from "react"
import { APICaller } from "../../../helpers/api"
import { useNavigate, useParams } from "react-router-dom"
import Button from "../../../components/Button"
import { ArrowLeft, Plus } from "react-feather"
import EnvironmentModel from "../../../components/portal/EnvironmentModel"
import { useModel } from "../../../utils/hooks/useModel"
import AlertModel from "../../../components/portal/AlertModel"

const SingleProject = () => {

    const { projectId } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState<Partial<Project> | null>(null);
    const [showModel, setShowModel] = useState(false);
    const [selectedEnvironment, setSelectedEnvironment] = useState<Partial<Environment> | undefined>(undefined);
    const { isModelOpen, openModel, closeModel } = useModel();

    useEffect(() => {
        (async () => {
            const { statusCode, data, error } = await APICaller(`/projects/${projectId}`, "GET")

            if(statusCode === 200) {
                setProject(data.project)
            } else {
                console.log(error)
            }
        })()
    }, [])

    const handleDeleteEnvSelect = (id: string) => {
        openModel();
        setSelectedEnvironment(project?.environments?.find(env => env._id === id))
    }

    const handleDelete = async () => {
        const { statusCode, error } = await APICaller(`/environments/${projectId}/${selectedEnvironment?._id}`, "DELETE")

        if(statusCode === 200) {
            setProject(prev => ({
                ...prev,
                environments: prev?.environments?.filter(env => env._id !== selectedEnvironment?._id)
            }))
        } else {
            console.log(error)
        }

        setSelectedEnvironment(undefined);
        closeModel();
    }

    const handleEditOpen = (id: string) => {
        const environment = project?.environments?.find(env => env._id === id)
        setSelectedEnvironment(environment)
        setShowModel(true)
    }
    const handleCreateOpen = () => {
        setSelectedEnvironment(undefined)
        setShowModel(true)
    }

  return (
    <main>
        <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <ArrowLeft className="cursor-pointer" onClick={()=>navigate(-1)} />  
                <h1>{project?.name}</h1>
            </div>
            <Button variant="primary" onClick={handleCreateOpen}>
                <span className="flex gap-2">
                    <Plus />
                    Create Environment
                </span>
            </Button>
        </div>
        <p className="font-bold mt-2">{project?.description}</p>
        <br />

        <div className="bg-white">
            <table className="w-full">
                <thead className="text-left font-bold border-b-2 border-gray-500">
                    <tr>
                        <th className="p-3">Environments</th>
                        <th className="p-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        project?.environments?.map((environment) => (
                            <tr key={environment._id} className="border-b-2">
                                <td className="p-3">{environment.name}</td>
                                <td className="p-3 flex items-center gap-2">
                                    <Button variant="default" onClick={()=>{}} classes="px-3 py-1 bg-green-500 text-white rounded-sm">
                                        View
                                    </Button>
                                    <Button variant="default" onClick={()=>handleEditOpen(environment._id!)} classes="px-3 py-1 bg-blue-500 text-white rounded-sm">
                                        Edit
                                    </Button>
                                    <Button variant="default" onClick={()=>handleDeleteEnvSelect(environment._id!)} classes="px-3 py-1 bg-red-500 text-white rounded-sm">
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        {showModel && <EnvironmentModel projectId={projectId!} environmentData={selectedEnvironment} closeModel={()=>setShowModel(false)} setEnvironments={setProject} />}
        {isModelOpen && (<AlertModel closeModel={closeModel} handleConfirm={handleDelete} title="Delete Project" message="Are you sure you want to delete this project?" />)}    
    </main>
  )
}

export default SingleProject