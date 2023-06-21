import { useEffect, useState } from "react"
import { APICaller } from "../../../helpers/api"
import { useParams } from "react-router-dom"
import Button from "../../../components/Button"
import { Plus } from "react-feather"
import EnvironmentModel from "../../../components/portal/EnvironmentModel"

const SingleProject = () => {

    const [project, setProject] = useState<Partial<Project> | null>(null)
    const { projectId } = useParams();
    const [showModel, setShowModel] = useState(false)

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

  return (
    <main>
        <div className="flex justify-between items-center">
            <h1>{project?.name}</h1>
            <Button variant="primary" onClick={()=>setShowModel(true)}>
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
                                <td className="p-3">
                                    <Button variant="default" onClick={()=>{}} classes="px-3 py-1 mr-3 bg-blue-500 text-white rounded-sm">
                                        Edit
                                    </Button>
                                    <Button variant="default" onClick={()=>{}} classes="px-3 py-1 bg-red-500 text-white rounded-sm">
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        {showModel && <EnvironmentModel projectId={projectId!} closeModel={()=>setShowModel(false)} setEnvironments={setProject} />}
    </main>
  )
}

export default SingleProject