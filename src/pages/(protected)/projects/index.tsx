import { useEffect, useState } from "react"
import ProjectCard from "../../../components/projects/ProjectCard"
import { APICaller } from "../../../helpers/api"
import ProjectModel from "../../../components/portal/ProjectModel"
import Button from "../../../components/Button"
import { Plus } from "react-feather"

export default function ProjectsPage() {
  
    const [projects, setProjects] = useState<Project[]>([])
    const [isFetching, setIsFetching] = useState(false)
    const [showModel, setShowModel] = useState(false)

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

    const handleDelete = async (id: string) => {
        if(window.confirm("Are you sure you want to delete this project?") === false) return

        const { statusCode, error } = await APICaller(`/projects/${id}`, "DELETE")

        if(statusCode === 200) {
            setProjects(prev => prev.filter(project => project._id !== id))
        }else {
            console.log(error)
        }
    }
  
    return (
        <main>
            <div className="flex justify-between items-center">
                <h1>Projects</h1>
                <Button variant="primary" onClick={()=>setShowModel(true)}>
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
                                projects.map((project) => <ProjectCard key={project._id} project={project} handleDelete={handleDelete} />)
                            }
                        </>
                    )
                }
            </div>
            {showModel && (<ProjectModel setProjects={setProjects} closeModel={()=>setShowModel(false)} />)}
        </main>
    )
}