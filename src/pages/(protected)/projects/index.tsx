import { useEffect, useState } from "react"
import ProjectCard from "../../../components/projects/ProjectCard"
import { APICaller } from "../../../helpers/api"
import ProjectModel from "../../../components/portal/ProjectModel"
import Button from "../../../components/Button"
import { Plus } from "react-feather"
import CollaboratorModel from "../../../components/portal/CollaboratorModel"
import { useModel } from "../../../utils/hooks/useModel"
import AlertModel from "../../../components/portal/AlertModel"

export default function ProjectsPage() {
  
    const [projects, setProjects] = useState<Project[]>([])
    const [selectedProject, setSelectedProject] = useState<Partial<Project> | undefined>(undefined)
    const [isFetching, setIsFetching] = useState(false)
    const [showModel, setShowModel] = useState(false)
    const [showCollabaoratorModel, setShowCollabaoratorModel] = useState(false)
    const { isModelOpen, openModel, closeModel } = useModel();

    useEffect(() => {
        (async () => {
            setIsFetching(true);
            const { statusCode, data, error } = await APICaller("/projects", "GET");

            if(statusCode === 200) {
                setProjects(data.projects);
                setIsFetching(false);
            } else {
                console.log(error);
            }
        })()
    }, [])

    const handleDeleteSelect = async (id: string) => {
        openModel();
        setSelectedProject(projects.find(project => project._id === id))
    }

    const handleDelete = async () => {
        const { statusCode, error } = await APICaller(`/projects/${selectedProject?._id}`, "DELETE")

        if(statusCode === 200) {
            setProjects(prev => prev.filter(project => project._id !== selectedProject?._id))
        }else {
            console.log(error)
        }

        setSelectedProject(undefined);
        closeModel();
    }

    const handleEdit = (id: string) => {
        const project = projects.find(project => project._id === id)
        setSelectedProject(project)
        setShowModel(true)
    }

    const handleCreate = () => {
        setSelectedProject(undefined)
        setShowModel(true)
    }

    const handleCollab = (id: string) => {
        const project = projects.find(project => project._id === id)
        setSelectedProject(project)
        setShowCollabaoratorModel(true)
    }
  
    return (
        <main>
            <div className="flex justify-between items-center">
                <h1>Projects</h1>
                <Button variant="primary" onClick={handleCreate}>
                    <span className="flex gap-2">
                        <Plus />
                        Create Project
                    </span>
                </Button>
            </div>
            <br />

            <div className="flex gap-4 flex-wrap">
                {
                    isFetching ? (
                        <>
                            {
                                Array(12).fill(0).map((_, i) => (
                                    <div key={i} className="bg-gray-300 rounded-sm min-w-[300px] min-h-[250px] animate-pulse">
                                    </div>
                                ))
                            }
                        </>
                    ) : (
                        <>
                            {
                                projects.map((project) => <ProjectCard 
                                    key={project._id} 
                                    project={project} 
                                    handleDelete={handleDeleteSelect} 
                                    handleEdit={handleEdit}
                                    handleCollab={handleCollab} 
                                />)
                            }
                        </>
                    )
                }
            </div>
            {showModel && (<ProjectModel projectData={selectedProject} setProjects={setProjects} closeModel={()=>setShowModel(false)} />)}
            {showCollabaoratorModel && (<CollaboratorModel setProjects={setProjects} projectData={selectedProject} closeModel={()=>setShowCollabaoratorModel(false)} />)}
            {isModelOpen && (<AlertModel closeModel={closeModel} handleConfirm={handleDelete} title="Delete Project" message="Are you sure you want to delete this project?" />)}
        </main>
    )
}