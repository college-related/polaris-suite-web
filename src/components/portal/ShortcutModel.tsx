import React, { useState } from "react";

import { APICaller } from "../../helpers/api";
import Backdrop from "./Backdrop";
import Input from "../form/Input";
import Button from "../Button";
import { getUser } from "../../helpers/cookie";
import IconButton from "../IconButton";
import { Edit3, File, Minus, Plus } from "react-feather";
import Select from "../form/Select";

interface IShortCutModelProps {
  projects: Project[],
  shortcuts: Shortcut;
  closeModel: () => void;
  setDashboardShortcut: React.Dispatch<React.SetStateAction<Dashboard>>;
}

const ShortcutModel = ({
  projects,
  shortcuts,
  closeModel,
  setDashboardShortcut,
}: IShortCutModelProps) => {
  const [shortcutsList, setShortcutsList] = useState<ShortcutSchema[]>(shortcuts.shortcuts);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsUpdating(true);

    const toSendShortcutList = shortcutsList.map(shortcut => ({
      title: shortcut.title,
      project: shortcut.project,
    }));

    const { statusCode, data, error } = await APICaller(
      `/shortcuts/${shortcuts._id}`,
      "PATCH",
      {
        userId: getUser()._id,
        shortcuts: toSendShortcutList,
      }
    );

    if (statusCode === 200) {
      setDashboardShortcut(prev => ({
        ...prev,
        shortcuts: data.shortcut,
      }));
    } else {
      console.log(error);
    }

    closeModel();
    setIsUpdating(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
    const { name, value } = e.target;

    const newShortcuts = shortcutsList.map((shortcut, i) => {
      if (i === index) {
        return {
          ...shortcut,
          [name]: value,
        };
      }

      return shortcut;
    });

    setShortcutsList(newShortcuts);
  };

  return (
    <Backdrop closeModel={closeModel}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed w-1/2 p-4 -translate-x-1/2 bg-white rounded-md top-20 left-1/2"
      >
        <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-2">
          {
            setShortcutsList.length === 0 && (
              <p className="my-4 text-center">No shortcuts yet.</p>
            )
          }
          {
            shortcutsList.map((shortcut, index) => (
              <React.Fragment key={index}>
                <div className="flex items-end gap-2">
                  <Input
                    label="Shortcut title"
                    name="title"
                    type="text"
                    value={shortcut.title || ""}
                    onChange={(e)=>handleChange(e, index)}
                    placeholder="Shortcut Title"
                    required
                    errors={null}
                  />
                  <Select 
                    label="Project"
                    name="project"
                    value={shortcut.project || ""}
                    onChange={(e)=>handleChange(e, index)}
                    options={projects.map(project => ({ name: project.name, value: project._id }))}
                  />
                  <IconButton variant="danger" icon={<Minus />} onClick={()=>{setShortcutsList(prev => 
                    prev.filter((shortcut, i) => i !== index)  
                  )}} />
                </div>
              </React.Fragment>
            ))
          }
          <IconButton variant="primary" icon={<Plus />} onClick={()=>{setShortcutsList(prev => ([...prev, { title: "", project: "" }]))}} />
          {/* 
          <Input
            label="Project Description"
            name="description"
            type="text"
            value={project.description || ""}
            onChange={handleChange}
            placeholder="Project Description"
            required={false}
            classes="mb-4"
            errors={null}
          /> */}
          <Button
            children="Update Shortcuts"
            type="submit"
            onClick={() => {}}
            variant="success"
            classes="w-full mt-4 font-bold"
            isLoading={isUpdating}
          />
          <Button
            children="Cancel"
            type="button"
            onClick={closeModel}
            variant="danger"
            classes="w-full font-bold"
          />
        </form>
      </div>
    </Backdrop>
  );
};

export default ShortcutModel;
