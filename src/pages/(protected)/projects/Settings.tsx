import { useState } from "react";
import Input from "../../../components/form/Input";
import Button from "../../../components/Button";
import { Archive, Trash, UserMinus, UserPlus } from "react-feather";
import Select from "../../../components/form/Select";
import IconButton from "../../../components/IconButton";

interface ISettingsProps {
  project: Partial<Project>;
}

const TABS = {
  DETAIL: "detail",
  COLLABORATION: "collaboration",
  NOTIFICATIONS: "notifications",
}

const Settings = ({ project }: ISettingsProps) => {
  const [tab, setTab] = useState(TABS.DETAIL);

  return (
    <section className="grid grid-cols-5">
      <div className="col-span-1 pr-4">
        <ul className="flex flex-col gap-2">
          <li onClick={()=>setTab(TABS.DETAIL)} className={`font-bold rounded-md p-3 cursor-pointer ${tab===TABS.DETAIL&&'bg-deep_blue text-white'}`}>Details</li>
          <li onClick={()=>setTab(TABS.COLLABORATION)} className={`font-bold rounded-md p-3 cursor-pointer ${tab===TABS.COLLABORATION&&'bg-deep_blue text-white'}`}>Collaboration</li>
          <li onClick={()=>setTab(TABS.NOTIFICATIONS)} className={`font-bold rounded-md p-3 cursor-pointer ${tab===TABS.NOTIFICATIONS&&'bg-deep_blue text-white'}`}>Notifications</li>
        </ul>
      </div>
      <div className="col-span-4 px-4 border-l-2">
        { tab===TABS.DETAIL && <DetailSetting project={project} /> }
        { tab===TABS.COLLABORATION && <CollaborationTab project={project} /> }
        { tab===TABS.NOTIFICATIONS && <NotificationTab project={project} /> }
      </div>
      <div className="col-span-5 text-right py-4 px-2 mt-4">
        <Button variant="success" onClick={()=>{}}>
          Update
        </Button>
      </div>
    </section>
  )
}

// Details TAB
const DetailSetting = ({ project }: { project: Partial<Project> }) => {
  return (
    <div className="flex flex-col gap-4">
      <Input label="Project Name" name="name" onChange={()=>{}} value={project?.name || ""} />
      <Input label="Project Description" name="description" onChange={()=>{}} value={project?.description || ""} />
      <Select 
        label="Project Status"
        name="status"
        value={project?.status || "in progress"}
        onChange={()=>{}}
        options={[
          { name: "Active", value: "in progress" },
          { name: "Archieve", value: "archieved" },
          { name: "On Hold", value: "hold" },
          { name: "Draft", value: "draft" },
          { name: "Complete", value: "done" },
        ]}
      />
      <div className="my-4">
        <h6 className="text-h6">Project Linking</h6>
        <p className="text-sm my-2">Link this project to a repository or drop project folder</p>
        <div className="flex items-center gap-4">
          <input type="file" />
          <Button variant="primary" onClick={()=>{}}>
            <span className="flex gap-2">
              <span>Link to Github</span>
            </span>
          </Button>
        </div>
      </div>
      <h6 className="text-h6 text-danger">Danger Area</h6>
      <div className="flex items-center justify-between">
        <p className="font-bold">Delete the Project</p>
        <Button variant="danger" onClick={()=>{}}>
          <span className="flex gap-2">
            <Trash />
            Delete Project
          </span>
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-bold">Archieve the Project</p>
        <Button variant="danger" onClick={()=>{}}>
          <span className="flex gap-2">
            <Archive />
            Archieve Project
          </span>
        </Button>
      </div>
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
const CollaborationTab = ({ project }: { project: Partial<Project> }) => {
  return (
    <div className="flex flex-col gap-2">
      <h6 className="text-h6">Collaboration</h6>
      <p className="text-sm">Invite people to collaborate in the project</p>
      <div className="flex items-end gap-2">
        <Input 
          label="Email"
          name="email"
          type="email"
          value={""}
          onChange={()=>{}}
          classes="w-full"
          placeholder="Email"
          required
          errors={null}
        />
        <Select 
          name="role"
          label="Role"
          onChange={()=>{}}
          options={[
              { name: "Tester", value: "tester" },
              { name: "Developer", value: "developer" },
              { name: "Stakeholder", value: "stakeholder" },
          ]}
        />
        <IconButton variant="success" icon={<UserPlus />} onClick={()=>{}} />
      </div>
      {
        project?.members?.length === 0 ? (
          <h6 className="text-h6 font-bold text-center">No collaborators found</h6>
        ) : (
          <h6 className="text-h6">Collaborators</h6>
        )
      }
      {
        project?.members?.map((collaborator) => (
          <>
            <div className="flex gap-2 items-end">
              <Input 
                label=""
                name="email"
                type="email"
                value={collaborator.email || ''}
                onChange={()=>{}}
                placeholder="Email"
                required
                classes="w-full"
                errors={null}
              />
              <Select 
                name=""
                label="Role"
                onChange={()=>{}}
                options={[
                  { name: "Tester", value: "tester" },
                  { name: "Developer", value: "developer" },
                  { name: "Stakeholder", value: "stakeholder" },
                ]}
              />
              <IconButton variant="danger" icon={<UserMinus />} onClick={()=>{}} />
            </div>
          </>
        ))
      }
    </div>
  )
}

export default Settings