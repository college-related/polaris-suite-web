import { useEffect, useState } from "react"
import ProjectCard from "../../../components/projects/ProjectCard"
import { APICaller } from "../../../helpers/api"
import ProjectModel from "../../../components/portal/ProjectModel"

export default function ProjectsPage() {
  
    const [projects, setProjects] = useState<Project[]>([])
    const [showModel, setShowModel] = useState(false)

    useEffect(() => {
        (async () => {
            const { statusCode, data, error } = await APICaller("/projects", "GET");

            if(statusCode === 200) {
                setProjects(data.projects);
            } else {
                console.log(error);
            }
        })()
    }, [])
  
    return (
        <main>
            <h1>Projects</h1>
            <br />

            <div className="flex gap-4 flex-wrap">
                {
                    projects.map((project) => <ProjectCard key={project._id} project={project} />)
                }
                <div onClick={()=>setShowModel(true)} className="bg-white p-4 rounded-sm cursor-pointer min-w-[300px] min-h-[250px] flex flex-col items-center justify-center">
                    PLUS
                </div>
            </div>
            {showModel && (<ProjectModel setProjects={setProjects} closeModel={()=>setShowModel(false)} />)}
        </main>
    )
}