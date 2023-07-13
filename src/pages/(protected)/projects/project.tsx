import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Edit, Plus, Trash } from "react-feather"

import { APICaller } from "../../../helpers/api"
import Button from "../../../components/Button"
import EnvironmentModel from "../../../components/portal/EnvironmentModel"
import { useModel } from "../../../utils/hooks/useModel"
import AlertModel from "../../../components/portal/AlertModel"
import ProjectLayout from "../../../layouts/ProjectLayout"
import IconButton from "../../../components/IconButton"

const SingleProject = () => {

  const { projectId } = useParams();
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
    <ProjectLayout title={project?.name!} description={project?.description!}>
      <div className="flex justify-between items-center mb-4">
        <Button variant="primary" onClick={handleCreateOpen}>
          <span className="flex gap-2">
            <Plus />
            Add Environment
          </span>
        </Button>
      </div>
      {
        project?.environments?.length === 0 && (
          <tr>
            <td className="p-3">No environments found</td>
          </tr>
        )
      }
      <div className="flex gap-4 items-center flex-wrap">
        {
          project?.environments?.map((environment) => (
            <div key={environment._id} className="bg-white rounded-md p-4 flex items-center gap-8">
              <div>
                <h5 className="text-h5">{environment.name}</h5>
                <p>
                  <span className="text-primary font-bold">{environment.variables?.length}</span> variables
                </p>
              </div>
              <div className="flex items-center gap-2">
                <IconButton variant="primary" icon={<Edit className="w-4 h-4" />} onClick={()=>handleEditOpen(environment._id!)} />
                <IconButton variant="danger" icon={<Trash className="w-4 h-4" />} onClick={()=>handleDeleteEnvSelect(environment._id!)} />
              </div>
            </div>
          ))
        }
      </div>
      {showModel && <EnvironmentModel projectId={projectId!} environmentData={selectedEnvironment} closeModel={()=>setShowModel(false)} setEnvironments={setProject} />}
      {isModelOpen && (<AlertModel closeModel={closeModel} handleConfirm={handleDelete} title="Delete Project" message="Are you sure you want to delete this project?" />)}    
    </ProjectLayout>
  )
}

export default SingleProject