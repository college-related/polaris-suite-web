import moment from "moment";
import { AlertTriangle, AtSign, Check, FileMinus, FilePlus, MessageSquare, UserMinus, UserPlus } from "react-feather";

interface IActivitiesProps {
  activities: Activity[];
}

const Activities = ({ activities }: IActivitiesProps) => {
  const typeIcon = (status:string) => {
    switch (status) {
      case "project-create":
        return <FilePlus className="w-4 h-4" />
      case "project-delete":
        return <FileMinus className="w-4 h-4" />
      case "comment":
        return <MessageSquare className="w-4 h-4" />
      case "test-pass":
        return <Check className="w-4 h-4" />
      case "test-fail":
        return <AlertTriangle className="w-4 h-4" />
      case "mentioned":
        return <AtSign className="w-4 h-4" />
      case "collaborator-add":
        return <UserPlus className="w-4 h-4" />
      case "collaborator-remove":
        return <UserMinus className="w-4 h-4" />
    }
  }

  return (
    <div className="relative py-2">
      {
        activities.map((activity, index) => (
          <div key={index} className="flex items-center gap-4 p-4">
            <div className="flex items-center gap-4">
              <span className={`text-white ${activity.status==="test-fail"?'bg-danger':activity.status==="test-pass"?'bg-success':'bg-deep_blue border-b border-black'} rounded-full p-3`}>
                {typeIcon(activity.status)}
              </span>
              <div>
                <h6 className="text-h6">{activity.name} - {moment(activity.createdAt).fromNow()}</h6>
                <p className="text-sm">{activity.description}</p>
              </div>
            </div>
          </div>
        ))
      }
      <div className="absolute top-0 left-[2.1rem] -z-10 bg-deep_blue w-1 h-full" />
    </div>
  )
}

export default Activities