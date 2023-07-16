import { useState } from "react";

import Backdrop from "./Backdrop";
import Input from "../form/Input";
import Button from "../Button";
import { APICaller } from "../../helpers/api";
import Select from "../form/Select";

interface ITestCaseModelProps {
  closeModel: () => void;
  setTestCases: React.Dispatch<React.SetStateAction<Partial<TestCase>[]>>;
  projectId: string;
  envId: string;
}

const TestCaseModel = ({
  closeModel,
  setTestCases,
  projectId,
  envId,
}: ITestCaseModelProps) => {
  const [testCase, setTestCase] = useState<Partial<TestCase>>({
    name: "",
    description: "",
    type: "unit",
  });
  const [isCreating, setIsCreating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setTestCase((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsCreating(true);

    let toSendTestCase: Partial<TestCase> = {
      name: testCase.name,
      type: testCase.type,
      linkedProject: projectId,
      environment: envId,
    };

    if (testCase.description !== "") {
      toSendTestCase = {
        ...toSendTestCase,
        description: testCase.description,
      };
    }

    const { statusCode, data, error } = await APICaller(
      '/testcases',
      "POST",
      toSendTestCase
    );

    if (statusCode === 201) {
      setTestCases((prev) => ([...prev!, data.testcases]));
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
        <h1 className="text-2xl font-bold">Create TestCase</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            name="name"
            onChange={handleChange}
            value={testCase.name || ""}
            placeholder="TestCase Name"
          />
          <br />
          <Input
            label="Description"
            name="description"
            onChange={handleChange}
            value={testCase.description || ""}
            placeholder="TestCase description"
            required={false}
          />
          <br />
          <Select 
            label="Type"
            name="type"
            onChange={handleChange}
            options={[
              {value: 'unit', name: 'Unit'},
              {value: 'integration', name: 'Integration'},
              {value: 'api', name: 'API'},
              {value: 'component', name: 'Component'},
              {value: 'e2e', name: 'End to End'},
            ]}
            required
          />
          <br />
          <div className="flex justify-end gap-2 mt-4">
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

export default TestCaseModel;
