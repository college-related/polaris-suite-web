import { Link } from "react-router-dom"

interface IProjectCardProps {
    project: Project,
}

const ProjectCard = ({ project }: IProjectCardProps) => {

    const getStatusColor = (status: string) => {
        switch (status) {
            case "in progress":
                return "bg-yellow-400"
            case "done":
                return "bg-green-600"
            case "hold":
                return "bg-red-600"
            default:
                return "bg-gray-600"
        }
    }

  return (
    <Link to={`${project._id}`}>
        <div className="bg-white p-4 rounded-sm hover:shadow-lg w-[300px] h-[250px] flex flex-col items-start justify-between">
            <div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <p className={`${getStatusColor(project.status)} w-fit px-1.5 rounded-sm font-bold text-white mt-4`}>{project.status}</p>
            </div>
            <div className="w-full">
                <p>Last Updated</p>
                <b>{project.updatedAt}</b>
            </div>
        </div>
    </Link>
  )
}

export default ProjectCard