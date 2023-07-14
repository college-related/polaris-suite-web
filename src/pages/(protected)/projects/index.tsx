import { useEffect, useState } from "react"
import { PlusSquare } from "react-feather"

import ProjectCard from "../../../components/projects/ProjectCard"
import { APICaller } from "../../../helpers/api"
import ProjectModel from "../../../components/portal/ProjectModel"

export default function ProjectsPage() {

  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Partial<Project> | undefined>(undefined)
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

  const handleCreate = () => {
    setSelectedProject(undefined)
    setShowModel(true)
  }
  
  return (
    <main>
      <h3 className="text-h3">Projects</h3>
      <p>You have <span className="text-primary font-bold">{projects.length}</span> projects</p>
      <br />

      <div className="flex gap-4 flex-wrap">
        
        {
          isFetching ? (
            <>
              {
                Array(12).fill(0).map((_, i) => (
                  <div key={i} className="bg-gray-300 rounded-sm min-w-[350px] min-h-[200px] animate-pulse">
                  </div>
                ))
              }
            </>
          ) : (
            <>
              <div 
                className="bg-primary_light text-primary p-5 w-[350px] flex items-center justify-center cursor-pointer rounded-md hover:shadow-md"
                onClick={handleCreate}
              >
                <PlusSquare className="w-20 h-20" />
              </div>
              { projects.map((project) => <ProjectCard key={project._id} project={project} />) }
            </>
          )
        }
      </div>
      {showModel && (<ProjectModel projectData={selectedProject} setProjects={setProjects} closeModel={()=>setShowModel(false)} />)}
    </main>
  )
}