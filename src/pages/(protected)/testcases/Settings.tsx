import { useState } from "react";
import { Trash } from "react-feather";

import Input from "../../../components/form/Input";
import Button from "../../../components/Button";
import Select from "../../../components/form/Select";
import { APICaller } from "../../../helpers/api";
import { useModel } from "../../../utils/hooks/useModel";
import AlertModel from "../../../components/portal/AlertModel";
import { useNavigate } from "react-router-dom";

interface ISettingsProps {
  testcase: Partial<TestCase>;
  setTestCase: React.Dispatch<React.SetStateAction<Partial<TestCase> | null>>;
  projectId: string;
  environmentId: string;
}

const TestCaseSettings = ({ testcase, setTestCase, projectId, environmentId }: ISettingsProps) => {
  const navigate = useNavigate();
  const { openModel, closeModel, isModelOpen } = useModel();

  const [hasUpdate, setHasUpdate] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTestCase(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    setHasUpdate(true);
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsUpdating(true);

    let toSendTestCase: dynamicObject = {
      name: testcase.name,
      type: testcase.type,
    }

    if(testcase.description) {
      toSendTestCase.description = testcase.description;
    }

    const { statusCode, data, error } = await APICaller(`/testcases/${projectId}/${environmentId}/${testcase._id}`, "PATCH", toSendTestCase);

    if (statusCode === 200) {
      setTestCase(data.testcase);
    } else {
      console.log(error);
    }

    setIsUpdating(false);
    setHasUpdate(false);
  }

  const handleDelete = async () => {
    const { statusCode, error } = await APICaller(`/testcases/${projectId}/${environmentId}/${testcase._id}`,"DELETE");

    if (statusCode === 200) {
      closeModel();
      navigate(`/polaris/projects/${projectId}/test-cases`);
    } else {
      console.log(error);
    }
  }

  return (
    <section className="">
      <form id="project-form" className="px-4" onSubmit={handleUpdate}>
        {
          hasUpdate && (
            <div className="p-2 mb-4 border-2 rounded-md bg-danger_light border-danger text-danger">
              <span className="text-sm font-bold">You have unsaved changes</span>
            </div>
          )
        }
        <div className="flex flex-col gap-4">
          <Input label="Test Case Name" name="name" onChange={handleChange} value={testcase?.name || ""} />
          <Input label="Test Case Description" name="description" onChange={handleChange} value={testcase?.description || ""} required={false} />
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
          {/* <Select 
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
          /> */}
        <h6 className="text-h6 text-danger">Danger Area</h6>
        <div className="flex items-center justify-between">
          <p className="font-bold">Delete the Test Case</p>
          <Button type="button" variant="danger" onClick={openModel}>
            <span className="flex gap-2">
              <Trash />
              Delete Test Case
            </span>
          </Button>
        </div>
        {isModelOpen && (<AlertModel title={"Delete the test case"} message={"Are you sure you want to delete it?"} handleConfirm={handleDelete} closeModel={closeModel} />)}
        </div>
        <div className="px-2 py-4 text-right">
          <Button 
            form="project-form" 
            type="submit" 
            variant="success" 
            onClick={()=>{}} 
            disabled={isUpdating || !hasUpdate}
            isLoading={isUpdating}
            loadingText="Updating"
          >
            Update
          </Button>
        </div>
      </form>
    </section>
  )
}

export default TestCaseSettings