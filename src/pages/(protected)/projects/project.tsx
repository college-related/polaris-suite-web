import { useEffect, useState } from "react"
import { Minus, Plus, Trash } from "react-feather"

import { APICaller } from "../../../helpers/api"
import Button from "../../../components/Button"
import EnvironmentModel from "../../../components/portal/EnvironmentModel"
import { useModel } from "../../../utils/hooks/useModel"
import AlertModel from "../../../components/portal/AlertModel"
import IconButton from "../../../components/IconButton"
import Input from "../../../components/form/Input"

interface ISingleProjectProps {
  project: Partial<Project>;
  setProject: React.Dispatch<React.SetStateAction<Partial<Project> | null>>;
  projectId: string;
}

const SingleProject = ({ project, projectId, setProject }: ISingleProjectProps) => {

  const [showModel, setShowModel] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasVariableEmptyError, setHasVariableEmptyError] = useState(false);
  const [selectedEnvironment, setSelectedEnvironment] = useState<Partial<Environment> | undefined>(undefined);
  const { isModelOpen, openModel, closeModel } = useModel();

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
  const handleSelectEnv = (id: string) => {
    const environment = project?.environments?.find(env => env._id === id)
    setSelectedEnvironment(environment)
  }

  const updateEnviroment = async () => {
    setIsSaving(true);
    setHasVariableEmptyError(false);

    if(!selectedEnvironment) return;
    
    const isEmpty = selectedEnvironment?.variables?.some(variable => variable.name === "" || variable.value === "")

    if(isEmpty) {
      setIsSaving(false);
      setHasVariableEmptyError(true);
      return;
    }

    const toSend = {
      variables: selectedEnvironment?.variables
    }

    const { statusCode, error } = await APICaller(`/environments/${projectId}/${selectedEnvironment?._id}`, "PATCH", toSend);

    if(statusCode !== 200) {
      console.log(error)
    }

    setIsSaving(false);
  }

  useEffect(() => {
    setSelectedEnvironment(project?.environments?.[0])
  }, [project?.environments])

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Button variant="primary" onClick={()=>setShowModel(true)} disabled={project?.status==='archieved'}>
          <span className="flex gap-2">
            <Plus />
            Add Environment
          </span>
        </Button>
      </div>
      {
        project?.environments?.length === 0 ? (
          <p className="p-3">No environments found</p>
        ) : (
          <h6 className="text-h6 mb-4">Selected Environment: <span className="text-primary">{selectedEnvironment?.name}</span></h6>
        )
      }
      <div className="flex gap-4 items-center flex-wrap">
        {
          project?.environments?.map((environment) => (
            <div key={environment._id!} className={`bg-white rounded-md p-4 flex items-center gap-8 cursor-pointer ${selectedEnvironment?._id===environment._id&&'border-2 border-primary'}`} onClick={()=>handleSelectEnv(environment._id!)}>
              <div>
                <h5 className="text-h5">{environment.name}</h5>
                <p>
                  <span className="text-primary font-bold">{environment.variables?.length}</span> variables
                </p>
              </div>
              <IconButton variant="danger" icon={<Trash className="w-4 h-4" />} onClick={()=>handleDeleteEnvSelect(environment._id!)} />
            </div>
          ))
        }
      </div>
      <div className="mt-8">
        <h6><span className="text-primary">{selectedEnvironment?.name}</span> Environment</h6>
        <p>{selectedEnvironment?.description}</p>
        <p className="mt-4 font-bold underline">Variables</p>
        {
          selectedEnvironment?.variables?.map((variable, i) => (
            <div key={i} className="flex items-end gap-4">
              <Input
                label=""
                name="name"
                onChange={(e) => {
                  setSelectedEnvironment((prev) => ({
                    ...prev,
                    variables: prev?.variables?.map((v, index) =>
                      index === i ? { ...v, [e.target.name]: e.target.value } : v
                    )
                  }));
                }}
                value={variable.name}
                placeholder="Variable Name"
                required={false}
                classes="w-full"
                inpClasses={`${hasVariableEmptyError && variable.name === "" && "border-2 border-danger"}`}
              />
              <Input
                label=""
                name="value"
                onChange={(e) => {
                  setSelectedEnvironment((prev) => ({
                    ...prev,
                    variables: prev?.variables?.map((v, index) =>
                      index === i ? { ...v, [e.target.name]: e.target.value } : v
                    )
                  }));
                }}
                value={variable.value}
                placeholder="Variable Value"
                required={false}
                classes="w-full"
                inpClasses={`${hasVariableEmptyError && variable.value === "" && "border-2 border-danger"}`}
              />
              <IconButton
                type="button"
                variant="danger"
                icon={<Minus />}
                onClick={() => {
                  setSelectedEnvironment((prev) => ({
                    ...prev,
                    variables: prev?.variables?.filter((_, index) => index !== i)
                  }));
                }}
              />
            </div>
          ))
        }
        <div className="flex gap-4 mt-4">
          <Button 
            variant="primary" 
            onClick={()=>{
              setSelectedEnvironment((prev) => ({
                ...prev,
                variables: [...prev?.variables!, { name: "", value: "" }]
              }));
            }}
          >
            <span className="flex items-center gap-2">
              <Plus />
              Add Variable
            </span>
          </Button>
          <Button 
            variant="success" 
            onClick={updateEnviroment}
            isLoading={isSaving}
            loadingText="Saving changes..."
          >
            Save Changes
          </Button>
        </div>
      </div>
      {showModel && <EnvironmentModel projectId={projectId!} closeModel={()=>setShowModel(false)} setEnvironments={setProject} />}
      {isModelOpen && (<AlertModel closeModel={closeModel} handleConfirm={handleDelete} title="Delete Environment" message="Are you sure you want to delete this environment?" />)}    
    </>
  )
}

export default SingleProject