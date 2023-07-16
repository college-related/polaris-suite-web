import { useState } from "react";
import { Minus } from "react-feather";

import Backdrop from "./Backdrop";
import Input from "../form/Input";
import Button from "../Button";
import { APICaller } from "../../helpers/api";
import IconButton from "../IconButton";

interface IEnvironmentModelProps {
  closeModel: () => void;
  setEnvironments: React.Dispatch<React.SetStateAction<Partial<Project> | null>>;
  projectId: string;
}

const EnvironmentModel = ({
  closeModel,
  setEnvironments,
  projectId,
}: IEnvironmentModelProps) => {
  const [environment, setEnvironment] = useState<Partial<Environment>>({
    name: "",
    description: "",
    variables: [],
  });
  const [isCreating, setIsCreating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEnvironment((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const addVariables = () =>
    setEnvironment((prev) => ({
      ...prev,
      variables: [...prev.variables!, { name: "", value: "" }],
    }));

  const removeVariable = (index: number) =>
    setEnvironment((prev) => ({
      ...prev,
      variables: prev.variables?.filter((_, i) => index !== i),
    }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsCreating(true);

    let toSendEnvironment: Partial<Environment> = {
      name: environment.name,
    };

    if (environment.description !== "") {
      toSendEnvironment = {
        ...toSendEnvironment,
        description: environment.description,
      };
    }
    if (environment.variables?.length !== 0) {
      toSendEnvironment = {
        ...toSendEnvironment,
        variables: environment.variables?.map((env) => ({
          name: env.name,
          value: env.value,
        })),
      };
    }

    const { statusCode, data, error } = await APICaller(
      `/environments/${projectId}`,
      "POST",
      toSendEnvironment
    );

    if (statusCode === 201) {
      setEnvironments((prev) => ({
        ...prev,
        environments: [...prev?.environments!, data.environment],
      }));
    } else {
      console.log(error);
    }

    closeModel();
    setIsCreating(false);
  };

  return (
    <Backdrop closeModel={closeModel}>
      <div
        className="bg-white rounded-md p-4 w-1/2 mt-20 mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl font-bold">Create Environment</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            name="name"
            onChange={handleChange}
            value={environment.name || ""}
            placeholder="Environment Name"
          />
          <br />
          <Input
            label="Description"
            name="description"
            onChange={handleChange}
            value={environment.description || ""}
            placeholder="Environment description"
            required={false}
          />
          <br />
          {environment.variables?.map((variable, index) => (
            <div key={index} className="flex gap-2 items-end w-full">
              <Input
                label="Variable Name"
                name="name"
                onChange={(e) => {
                  setEnvironment((prev) => ({
                    ...prev,
                    variables: prev.variables?.map((v, i) =>
                      i === index ? { ...v, name: e.target.value } : v
                    ),
                  }));
                }}
                value={variable.name}
                placeholder="Variable Name"
                required={false}
              />
              <br />
              <Input
                label="Variable Value"
                name="value"
                onChange={(e) => {
                  setEnvironment((prev) => ({
                    ...prev,
                    variables: prev.variables?.map((v, i) =>
                      i === index ? { ...v, value: e.target.value } : v
                    ),
                  }));
                }}
                value={variable.value}
                placeholder="Variable Value"
                required={false}
              />
              <IconButton
                type="button"
                variant="danger"
                icon={<Minus />}
                onClick={() => removeVariable(index)}
              />
            </div>
          ))}
          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              onClick={addVariables}
              variant="primary"
              classes="font-medium"
            >
              Add Variables
            </Button>
            <Button
              type="button"
              onClick={closeModel}
              variant="danger"
              classes="font-medium"
            >
              Cancel
            </Button>
            <Button
              variant="success"
              onClick={() => {}}
              isLoading={isCreating}
              type="submit"
              classes="font-medium"
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </Backdrop>
  );
};

export default EnvironmentModel;
