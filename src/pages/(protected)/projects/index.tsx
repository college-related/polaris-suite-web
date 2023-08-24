import { useEffect, useState } from "react"
import { Eye, EyeOff, PlusSquare } from "react-feather"

import ProjectCard from "../../../components/projects/ProjectCard"
import { APICaller } from "../../../helpers/api"
import ProjectModel from "../../../components/portal/ProjectModel"
import Button from "../../../components/Button"
import { useModel } from "../../../utils/hooks/useModel"
import { getUser } from "../../../helpers/cookie"

export default function ProjectsPage() {

  const [projects, setProjects] = useState<Project[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const { openModel, closeModel, isModelOpen } = useModel();
  const [isShowingAll, setIsShowingAll] = useState(false);

  const fetchProjects = async (query?: string) => {
    setIsFetching(true);

    const q = query ? `?${query}` : "";
    const { statusCode, data, error } = await APICaller(`/projects/user/${getUser()._id}${q}`, "GET");

    if(statusCode === 200) {
      setProjects(data.projects);
      setIsFetching(false);
    } else {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, [])

  const handleShow = () => {
    setIsShowingAll(!isShowingAll);
    fetchProjects(!isShowingAll ? "status=all" : "");
  }
  
  return (
    <main>
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-h3">Projects</h3>
          <p>You have <span className="font-bold text-primary">{projects.length}</span> projects</p>
        </div>
        <Button variant={`${isShowingAll?'danger':'success'}`} onClick={handleShow}>
          <span className="flex items-center gap-2">
            {
              isShowingAll ? (
                <>
                  <EyeOff />
                  Hide archived
                </>
              ) : (
                <>
                  <Eye />
                  Show archived
                </>
              )
            }
          </span>
        </Button>
      </div>
      <br />

      <div className="flex flex-wrap gap-4">
        
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
                className="bg-primary_light text-primary p-5 w-[350px] min-h-[200px] flex items-center justify-center cursor-pointer rounded-md hover:shadow-md"
                onClick={openModel}
              >
                <PlusSquare className="w-20 h-20" />
              </div>
              { projects.map((project) => <ProjectCard key={project._id} project={project} />) }
            </>
          )
        }
      </div>
      {isModelOpen && (<ProjectModel setProjects={setProjects} closeModel={closeModel} />)}
    </main>
  )
}