import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, CheckSquare, HelpCircle, Plus } from "react-feather";

import Button from "../../../components/Button";
import { useModel } from "../../../utils/hooks/useModel";
import TestCaseModel from "../../../components/portal/TestCaseModel";
import Select from "../../../components/form/Select";
import { APICaller } from "../../../helpers/api";

interface ITestCasesProps {
  project: Partial<Project>,
  projectId: string,
}

const TestCases = ({ project, projectId }: ITestCasesProps) => {

  const [testCases, setTestCases] = useState<Partial<TestCase>[]>([]);
  const [selectedEnv, setSelectedEnv] = useState<Partial<Environment> | undefined>(undefined);
  const { isModelOpen, openModel, closeModel } = useModel();

  const fetchTestCases = async (hasEnv: string="") => {
    let url = `/testcases/${projectId}`;

    if(hasEnv!=="") {
      url = `/testcases/${projectId}/${hasEnv}`;
    }

    const { statusCode, data, error } = await APICaller(url, "GET");
    
    if (statusCode === 200) {
      setTestCases(data.testcases as TestCase[]);
    } else {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTestCases();
  }, [projectId])

  const handleEnvSelect = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const envId = e.target.value;

    setSelectedEnv(project?.environments?.find((env) => env._id === envId) || undefined);

    if (envId === "all") {
      fetchTestCases();
    } else {
      fetchTestCases(envId);
    }
  }

  return (
    <section>
      <div className="flex items-start justify-between mb-4">
        <div>
          <Button 
            variant="primary" 
            onClick={openModel} 
            disabled={project?.status==='archieved' || project?.environments?.length === 0}
          >
            <span className="flex gap-2">
              <Plus />
              Add Test Case
            </span>
          </Button>
          <h3 className="mt-2 mb-4 text-h4">Currently showing the test cases from <span className="text-primary">{selectedEnv?.name ? selectedEnv?.name : "All"}</span> environment</h3>
        </div>
        {
          project?.environments?.length === 0 && (
            <p className="text-danger">No environment found</p>
          )
        }
        <Select 
          label="Selected Environment"
          name="environment"
          onChange={handleEnvSelect}
          value={selectedEnv?._id || "all"}
          options={project?.environments?.map((env) => ({ name: env?.name!, value: env?._id! })).concat({ name: "All", value: "all"}) || [{ name: "All", value: "all" }]}
        />
      </div>
      {
        testCases.length === 0 && (
          <p className="font-bold">No test cases found</p>
        )
      }
      <div className="flex flex-wrap gap-4">
        {
          testCases?.map((testcase) =>
            <Link key={testcase._id} to={`/polaris/projects/${projectId}/testcase/${(testcase.environment as Environment)?._id}/${testcase._id}`}>
              <div className="flex items-center gap-4 p-4 bg-white rounded-md">
                <div>
                    <h5 className="text-h5">{testcase.name}</h5>
                    <p className={`${
                      testcase?.recentRun === 'pass' ? 'text-success' :
                      testcase?.recentRun === 'fail' ? 'text-danger' :
                        'text-warning'
                    }`}>
                      {testcase?.recentRun || "Not tested"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`p-2 rounded-md
                        ${
                          testcase.recentRun === 'pass' ? 'bg-success_light text-success' :
                            testcase.recentRun === 'fail' ? 'bg-danger_light text-danger' :
                              'bg-warning_light text-warning'
                        }
                      `}
                    >
                      {
                        testcase.recentRun === 'pass' ? <CheckSquare /> :
                          testcase.recentRun === 'fail' ? <AlertTriangle /> :
                            <HelpCircle />
                      }
                    </span>
                  </div>
              </div>
            </Link>
          )
        }
      </div>
      {isModelOpen && <TestCaseModel projectId={projectId!} closeModel={closeModel} setTestCases={setTestCases} envId={selectedEnv?._id!} />}
    </section>
  )
}

export default TestCases