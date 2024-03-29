import { useEffect, useState } from "react";
import { Edit3, Lock, Trash, Unlock, UserMinus, UserPlus } from "react-feather";

import Input from "../../../components/form/Input";
import Button from "../../../components/Button";
import Select from "../../../components/form/Select";
import IconButton from "../../../components/IconButton";
import { APICaller } from "../../../helpers/api";
import { useModel } from "../../../utils/hooks/useModel";
import AlertModel from "../../../components/portal/AlertModel";
import { Link, useNavigate } from "react-router-dom";
import { getSettings, getUser } from "../../../helpers/cookie";

interface ISettingsProps {
  project: Partial<Project>;
  setProject: React.Dispatch<React.SetStateAction<Partial<Project>>>;
}

const TABS = {
  DETAIL: "detail",
  COLLABORATION: "collaboration",
  NOTIFICATIONS: "notifications",
}

const Settings = ({ project, setProject }: ISettingsProps) => {
  const [tab, setTab] = useState(TABS.DETAIL);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProject(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    setHasUpdate(true);
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsUpdating(true);

    const toSendProjectData: dynamicObject = {
      name: project.name,
      status: project?.status,
      description: project.description,
      members: project.members,
      repo: project.repo,
    };

    const { statusCode, data, error } = await APICaller(`/projects/${project._id}`,"PATCH",toSendProjectData);

    if (statusCode === 200) {
      setProject(data.project);
    } else {
      console.log(error);
    }

    setIsUpdating(false);
    setHasUpdate(false);
  }

  return (
    <section className="grid grid-cols-5">
      <div className="col-span-1 pr-4">
        <ul className="flex flex-col gap-2">
          <li onClick={()=>setTab(TABS.DETAIL)} className={`font-bold rounded-md p-3 cursor-pointer ${tab===TABS.DETAIL&&'bg-deep_blue text-white'}`}>Details</li>
          <li onClick={()=>setTab(TABS.COLLABORATION)} className={`font-bold rounded-md p-3 cursor-pointer ${tab===TABS.COLLABORATION&&'bg-deep_blue text-white'}`}>Collaboration</li>
          <li onClick={()=>setTab(TABS.NOTIFICATIONS)} className={`font-bold rounded-md p-3 cursor-pointer ${tab===TABS.NOTIFICATIONS&&'bg-deep_blue text-white'}`}>Notifications</li>
        </ul>
      </div>
      <form id="project-form" className="col-span-4 px-4 border-l-2" onSubmit={handleUpdate}>
        {
          hasUpdate && (
            <div className="p-2 mb-4 border-2 rounded-md bg-danger_light border-danger text-danger">
              <span className="text-sm font-bold">You have unsaved changes</span>
            </div>
          )
        }
        {
          project?.status === "archieved" && (
            <div className="p-2 mb-4 border-2 rounded-md bg-danger_light border-danger text-danger">
              <span className="text-sm font-bold">This project is archived</span>
            </div>
          )
        }
        { tab===TABS.DETAIL && (
          <>
            <DetailSetting project={project} handleChange={handleChange} setProject={setProject} />
            <div className="px-2 py-4 text-right">
              <Button 
                form="project-form" 
                type="submit" 
                variant="success" 
                onClick={()=>{}} 
                disabled={project?.status==="archieved" || isUpdating}
                isLoading={isUpdating}
                loadingText="Updating"
              >
                Update
              </Button>
            </div>
          </>
        )}
        { tab===TABS.COLLABORATION && <CollaborationTab project={project} setProject={setProject} /> }
        { tab===TABS.NOTIFICATIONS && <NotificationTab project={project} /> }
      </form>
    </section>
  )
}

// Details TAB
const DetailSetting = ({ 
  project, handleChange , setProject,
}: { 
  project: Partial<Project>, 
  setProject: React.Dispatch<React.SetStateAction<Partial<Project>>>,
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void 
}) => {

  const navigate = useNavigate();
  const { openModel, closeModel, isModelOpen } = useModel();
  const [alertDetails, setAlertDetails] = useState({
    title: "",
    description: "",
    action: () => {},
  });
  const [repos, setRepos] = useState([]);

  const handleOpenAlert = (type: "delete" | "archieve") => {
    if (type === "delete") {
      setAlertDetails({
        title: "Delete Project",
        description: "Are you sure you want to delete this project?",
        action: deleteProject,
      })
    } else {
      setAlertDetails({
        title: `${project?.status==="archieved"?'Unarchieve':'Archieve'} Project`,
        description: `Are you sure you want to ${project?.status==="archieved"?'unarchieve':'archieve'} this project?`,
        action: archieveProject,
      })
    }
    
    openModel();
  }

  const deleteProject = async () => {
    const { statusCode, error } = await APICaller(`/projects/${project._id}`,"DELETE");

    if (statusCode === 200) {
      closeModel();
      navigate("/polaris/projects");
    } else {
      console.log(error);
    }
  }

  const archieveProject = async () => {

    let status = "archieved";

    if (project?.status === "archieved") {
      status = "in progress";
    }

    const { statusCode, error, data } = await APICaller(`/projects/${project._id}`,"PATCH",{ status });

    if (statusCode === 200) {
      setProject(data.project)
    } else {
      console.log(error);
    }
    closeModel();
  }

  useEffect(() => {
    (async () => {
      const { statusCode, data, error } = await APICaller(`/github/${getUser()._id}/repos`, "GET");

      if(statusCode === 200) {
        setRepos(data.repos);
      } else {
        console.log(error);
      }
    })()
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <Input disabled={project?.status==="archieved"} label="Project Name" name="name" onChange={handleChange} value={project?.name || ""} />
      <Input disabled={project?.status==="archieved"} label="Project Description" name="description" onChange={handleChange} value={project?.description || ""} required={false} />
      <Select 
        label="Project Status"
        name="status" 
        disabled={project?.status==="archieved"}
        value={project?.status || "in progress"}
        onChange={handleChange}
        options={[
          { name: "Active", value: "in progress" },
          { name: "On Hold", value: "hold" },
          { name: "Complete", value: "done" },
        ]}
      />
      <div className="my-4">
        <h6 className="text-h6">Project Linking</h6>
        <p className="my-2 text-sm">Link this project to a repository</p>
        <div className="flex items-center gap-4">
          {
            getSettings().github?.enabled ? (
              <select name="repo" onChange={handleChange} className="p-2 border border-gray-200 rounded-md">
                <option value="">Select a repository</option>
                {
                  repos?.map((repo: dynamicObject) => (
                    <option key={repo.id} value={repo.id} className={`${repo.id==project?.repo && "bg-success_light text-success"}`}>{repo.name}</option>
                  ))
                }
              </select>
            ) : (
              <Link to={project?.status === "archieved" ? "#" : "https://github.com/apps/polaris-suite/installations/select_target"}>
                <span className={`flex gap-2 p-3 rounded-md ${project?.status === "archieved" ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-primary_light text-primary"}`}>
                  <span>Link to Github</span>
                </span>
              </Link>
            )
          }
        </div>
      </div>
      <h6 className="text-h6 text-danger">Danger Area</h6>
      <div className="flex items-center justify-between">
        <p className="font-bold">Delete the Project</p>
        <Button type="button" variant="danger" onClick={()=>handleOpenAlert("delete")}>
          <span className="flex gap-2">
            <Trash />
            Delete Project
          </span>
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-bold">Archieve the Project</p>
        <Button type="button" variant={`${project?.status==="archieved"?"success":"danger"}`} onClick={()=>handleOpenAlert("archieve")}>
          {
            project?.status === "archieved" ? (
              <span className="flex gap-2">
                <Unlock />
                Unarchieve Project
              </span>
            ) : (
              <span className="flex gap-2">
                <Lock />
                Archieve Project
              </span>
            )
          }
        </Button>
      </div>
      {isModelOpen && (<AlertModel title={alertDetails.title} message={alertDetails.description} handleConfirm={alertDetails.action} closeModel={closeModel} />)}
    </div>
  )
}

// Notification TAB
const NotificationTab = ({ project }: { project: Partial<Project> }) => {
  return (
    <div className="flex flex-col gap-2">
      <h6 className="text-h6">Notifications</h6>
      <p className="text-sm">Get notified from polaris suite</p>
      <Select 
        label=""
        name="notification"
        value={project?.status || "email"}
        disabled={project?.status==="archieved"}
        onChange={()=>{}}
        options={[
          { name: "Email", value: "email" },
          { name: "Push Notification", value: "push" },
          { name: "No notification", value: "none" },
        ]}
      />
    </div>
  )
}

// Collaboration TAB
const CollaborationTab = ({ 
  project, 
  setProject,
}: { 
  project: Partial<Project>, 
  setProject: React.Dispatch<React.SetStateAction<Partial<Project>>>,
}) => {
  const [member, setMember] = useState<Partial<Collaborator>>({
    email: "",
    role: "tester",
  });

  const [oldMembers, setOldMembers] = useState<Collaborator[]>(project?.members || []);
  const [isSending, setIsSending] = useState(false);
  const [isUpdating, setIsUpdating] = useState<{status: boolean, index: number | null}>({
    status: false,
    index: null,
  });
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const { isModelOpen, openModel, closeModel } = useModel();


  const handleCollabAdd = async () => {
    if (member.email === "") return;

    setIsSending(true);

    const { data, statusCode, error } = await APICaller(`/projects/${project._id}/invite`, "PATCH", member);

    if(statusCode === 200) {
      setProject(data.project);
      setMember({ email: "", role: "tester" });
      setOldMembers(data.project.members);
    } else {
      console.log(error);
    }

    setIsSending(false);
  }

  const handleCollabRemove = async () => {
    const { data, statusCode, error } = await APICaller(`projects/${project._id}/members/remove`, "PATCH", { email: oldMembers[selectedMember!].email });

    if(statusCode === 200) {
      setProject(data.project);
      setMember({ email: "", role: "tester", status: "pending" });
      setOldMembers(data.project.members);
    } else {
      console.log(error);
    }

    closeModel();
  }

  const handleCollabUpdate = async (i: number) => {
    setIsUpdating({ status: true, index: i });

    const toSend = {
      members: oldMembers,
    }

    const { data, statusCode, error } = await APICaller(`/projects/${project._id}`, "PATCH", toSend);

    if(statusCode === 200) {
      setProject(data.project);
      setOldMembers(data.project.members);
    } else {
      console.log(error);
    }

    setIsUpdating({ status: false, index: null });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setMember(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleOldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, i: number) => {
    setOldMembers(prev => (
      prev.map((member, index) => {
        if (index === i) return { ...member, [e.target.name]: e.target.value };
        return member
      })
    ));
  }

  const handleMemberSelect = (i: number) => {
    setSelectedMember(i);
    openModel();
  }

  return (
    <div className="flex flex-col gap-2">
      <h6 className="text-h6">Collaboration</h6>
      <p className="text-sm">Invite people to collaborate in the project</p>
      <div className="flex items-end gap-2">
        <Input 
          label="Email"
          name="email"
          type="email"
          disabled={isSending || project?.status === 'archieved'}
          value={member.email!}
          onChange={handleChange}
          classes="w-[50%]"
          placeholder="Email"
          required={false}
          errors={null}
        />
        <Select 
          name="role"
          label="Role"
          value={member.role}
          onChange={handleChange}
          disabled={isSending || project?.status === 'archieved'}
          options={[
            { name: "Tester", value: "tester" },
            { name: "Developer", value: "developer" },
            { name: "Stakeholder", value: "stakeholder" },
          ]}
        />
        <Button 
          variant="success" 
          onClick={handleCollabAdd} 
          disabled={isSending || project?.status === 'archieved'}
          isLoading={isSending}
          loadingText="Sending"
        >
          <span className="flex items-center gap-2">
            <UserPlus />
            Send Invitation
          </span>
        </Button>
      </div>
      {
        oldMembers?.length === 0 ? (
          <h6 className="font-bold text-center text-h6">No collaborators found</h6>
        ) : (
          <h6 className="text-h6">Collaborators</h6>
        )
      }
      {
        oldMembers?.map((collaborator, i) => (
          <div className="flex items-end gap-2" key={collaborator.email}>
            <Input 
              label=""
              name="email"
              type="email"
              disabled={true}
              value={oldMembers[i]?.email || ""}
              onChange={e=>handleOldChange(e, i)}
              placeholder="Email"
              required
              classes="w-[50%]"
              errors={null}
            />
            <Select 
              label=""
              name="role"
              value={oldMembers[i]?.role || "tester"}
              disabled={(isUpdating.status && isUpdating.index === i) || project?.status === 'archieved'}
              onChange={e=>handleOldChange(e, i)}
              options={[
                { name: "Tester", value: "tester" },
                { name: "Developer", value: "developer" },
                { name: "Stakeholder", value: "stakeholder" },
              ]}
            />
            <span 
              className={`p-2 rounded-md text-xs font-bold text-white ${oldMembers[i]?.status === 'accepted' ? 'bg-success' : oldMembers[i]?.status === 'pending' ? 'bg-warning' : 'bg-danger'}`}
            >
              {oldMembers[i]?.status}
            </span>
            <Button 
              variant="primary" 
              onClick={()=>handleCollabUpdate(i)} 
              disabled={(isUpdating.status && isUpdating.index === i) || project?.status === 'archieved'}
              isLoading={isUpdating.status && isUpdating.index === i}
              loadingText="Updating"
            >
              <span className="flex items-center gap-2">
                <Edit3 />
                Update
              </span>
            </Button>
            <IconButton variant="danger" icon={<UserMinus />} onClick={()=>handleMemberSelect(i)} disabled={(isUpdating.status && isUpdating.index === i) || project?.status === 'archieved'}  />
          </div>
        ))
      }
      {isModelOpen && (<AlertModel closeModel={closeModel} handleConfirm={handleCollabRemove} title="Remove Collaborator" message="Do you want to remove this collaborator?" />)}
    </div>
  )
}

export default Settings