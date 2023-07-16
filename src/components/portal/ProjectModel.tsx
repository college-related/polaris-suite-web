import { useState } from "react";

import { APICaller } from "../../helpers/api";
import Backdrop from "./Backdrop";
import Input from "../form/Input";
import Button from "../Button";
import { getUser } from "../../helpers/cookie";

interface IProjectModelProps {
  closeModel: () => void;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

const ProjectModel = ({
  closeModel,
  setProjects,
}: IProjectModelProps) => {
  const [project, setProject] = useState<Partial<Project>>({
    name: "",
    description: "",
  });
  const [status, setStatus] = useState<string>("in progress");
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsCreating(true);

    let toSendProjectData: dynamicObject = {
      name: project.name,
      status: status,
      ownerID: getUser()._id,
    };

    if (project.description) {
      toSendProjectData.description = project.description;
    }

    const { statusCode, data, error } = await APICaller(
      "/projects",
      "POST",
      toSendProjectData
    );

    if (statusCode === 201) {
      setProjects((prev) => [...prev, data.project]);
    } else if (statusCode === 200) {
      setProjects((prev) =>
        prev.map((proj) =>
          proj._id === data.project._id ? data.project : proj
        )
      );
    } else {
      console.log(error);
    }

    closeModel();
    setIsCreating(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProject((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Backdrop closeModel={closeModel}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-md w-1/2 fixed top-20 left-1/2 -translate-x-1/2 p-4"
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Project Name"
            name="name"
            type="text"
            value={project.name || ""}
            onChange={handleChange}
            placeholder="Project Name"
            required
            classes="mb-4"
            errors={null}
          />
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
          />
          <Button
            children="Create Project"
            type="submit"
            onClick={() => {}}
            variant="success"
            classes="w-full font-bold"
            isLoading={isCreating}
          />
          <Button
            children="Save as Draft"
            type="submit"
            onClick={() => setStatus("draft")}
            variant="warning"
            classes="w-full mt-4 font-bold"
            isLoading={isCreating}
          />
          <Button
            children="Cancel"
            type="button"
            onClick={closeModel}
            variant="danger"
            classes="w-full mt-4 font-bold"
          />
        </form>
      </div>
    </Backdrop>
  );
};

export default ProjectModel;
