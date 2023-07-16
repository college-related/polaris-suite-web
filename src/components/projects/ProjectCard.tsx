import { Link } from "react-router-dom"
import moment from "moment";

interface IProjectCardProps {
  project: Project,
}

const ProjectCard = ({ project }: IProjectCardProps) => {

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in progress":
        return "bg-warning"
      case "done":
        return "bg-success"
      case "hold":
        return "bg-danger"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <Link to={`${project._id}`}>
      <div className="bg-white p-4 rounded-md w-[350px] h-[200px] flex flex-col items-start justify-between hover:shadow-md">
        <div className="w-full">
          <h4 className="text-h4">{project.name}</h4>
          <p>{project.description}</p>
        </div>
        <div className="w-full flex items-center justify-between">
          <div>
            <p>Last Updated</p>
            <b>{moment(project.updatedAt).fromNow()}</b>
          </div>
          <p className={`${getStatusColor(project.status)} w-fit px-1.5 rounded-sm font-bold text-white mt-4`}>{project.status}</p>
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard