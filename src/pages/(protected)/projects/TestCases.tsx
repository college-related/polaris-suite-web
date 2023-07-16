import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, CheckSquare, HelpCircle, Plus } from "react-feather";

import Button from "../../../components/Button";
import { useModel } from "../../../utils/hooks/useModel";
import { useApiRead } from "../../../utils/hooks/useApiRead";
import TestCaseModel from "../../../components/portal/TestCaseModel";

interface ITestCasesProps {
  project: Partial<Project>,
  projectId: string,
}

const TestCases = ({ project, projectId }: ITestCasesProps) => {

  const [testCases, setTestCases] = useState<Partial<TestCase>[]>([]);
  const { isModelOpen, openModel, closeModel } = useModel();

  const { data, isLoading } = useApiRead(`/testcases/${projectId}`, "testcases")

  useEffect(() => {
    setTestCases(data as TestCase[] || [])
  }, [isLoading])

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <Button variant="primary" onClick={openModel} disabled={project?.status==='archieved'}>
          <span className="flex gap-2">
            <Plus />
            Add Test Case
          </span>
        </Button>
      </div>
      {
        testCases.length === 0 && (
          <p className="font-bold">No test cases found</p>
        )
      }
      <div className="flex gap-4 flex-wrap">
        {
          testCases?.map((testcase) =>
            <Link key={testcase._id} to={`/polaris/projects/${projectId}/testcase/${testcase._id}`}>
              <div className="flex gap-4 items-center bg-white p-4 rounded-md">
                <div>
                    <h5 className="text-h5">{testcase.name}</h5>
                    <p className={`${
                      testcase.recentRun === 'pass' ? 'text-success' :
                      testcase.recentRun === 'fail' ? 'text-danger' :
                        'text-warning'
                    }`}>
                      {testcase.recentRun || "Not tested"}
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
      {isModelOpen && <TestCaseModel projectId={projectId!} closeModel={closeModel} setTestCases={setTestCases} envId="aa" />}
    </section>
  )
}

export default TestCases