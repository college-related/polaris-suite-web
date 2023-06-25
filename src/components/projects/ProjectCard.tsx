import { Link } from "react-router-dom"
import moment from "moment";
import { Edit, Eye, Trash, UserPlus } from "react-feather";

interface IProjectCardProps {
    project: Project,
    handleDelete: (id: string) => Promise<void>,
    handleEdit: (id: string) => void,
    handleCollab: (id: string) => void,
}

const ProjectCard = ({ project, handleDelete, handleEdit, handleCollab }: IProjectCardProps) => {

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
    <div className="bg-white p-4 rounded-sm w-[300px] h-[250px] flex flex-col items-start justify-between">
        <div className="w-full">
            <div className="flex items-center justify-between">
                <h3>{project.name}</h3>
                <div className="flex gap-2">
                    <div onClick={()=>handleDelete(project._id)} className="cursor-pointer bg-gray-300 rounded-sm p-2 hover:bg-red-500 hover:text-white">
                        <Trash className="h-4 w-4" />
                    </div>
                    <div onClick={()=>handleEdit(project._id)} className="cursor-pointer bg-gray-300 rounded-sm p-2 hover:bg-blue-500 hover:text-white">
                        <Edit className="h-4 w-4" />
                    </div>
                </div>
            </div>
            <p>{project.description}</p>
            <p className={`${getStatusColor(project.status)} w-fit px-1.5 rounded-sm font-bold text-white mt-4`}>{project.status}</p>
        </div>
        <div className="w-full flex items-center justify-between">
            <div>
                <p>Last Updated</p>
                <b>{moment(project.updatedAt).fromNow()}</b>
            </div>
            <div className="flex gap-2 items-center">
                <div onClick={()=>handleCollab(project._id)} className="p-2 border-2 hover:bg-primary hover:border-primary hover:text-white rounded-full cursor-pointer">
                    <UserPlus />
                </div>
                <Link to={`${project._id}`}>
                    <div className="p-2 border-2 hover:border-primary rounded-full">
                        <Eye />
                    </div>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default ProjectCard