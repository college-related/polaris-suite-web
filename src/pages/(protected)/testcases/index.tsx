import { AlertTriangle, CheckSquare, Heart, HelpCircle, Play, Plus, Send } from "react-feather";

import Button from "../../../components/Button";
import Input from "../../../components/form/Input";
import { useEffect, useState } from "react";
import { APICaller } from "../../../helpers/api";
import { getUser } from "../../../helpers/cookie";
import IconButton from "../../../components/IconButton";
import { useModel } from "../../../utils/hooks/useModel";
import Backdrop from "../../../components/portal/Backdrop";
import Select from "../../../components/form/Select";

interface ISingleTestCaseProps {
  testcase: TestCase;
  setTestCase: React.Dispatch<React.SetStateAction<TestCase | null>>;
  testcaseId: string;
  environmentId: string;
}

const SingleTestCase = ({ testcase, setTestCase, testcaseId, environmentId }: ISingleTestCaseProps) => {
  const [comment, setComment] = useState<string>("");

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { statusCode, data, error } = await APICaller(`/comments/${testcaseId}`, "POST", { comment, userId: getUser()._id })

    if(statusCode === 201) {
      setTestCase(data.testcase);
      setComment("");
    } else {
      console.log(error)
    }
  }

  const handleLikeUnlike = async (commentId: string) => {

    let likeUnlike = 'like';

    if(testcase?.comments?.find(comment => comment._id === commentId)?.likes?.includes(getUser()._id)) {
      likeUnlike = 'unlike';
    }

    const { statusCode, data, error } = await APICaller(`/comments/${testcaseId}/${commentId}/${likeUnlike}`, "PATCH", { userId: getUser()._id })

    if(statusCode === 200) {
      setTestCase(data.testcase);
      setComment("");
    } else {
      console.log(error)
    }
  }

  return (
    <section>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4">
            <p className={`${
              testcase?.recentRun === 'pass' ? 'text-success' :
              testcase?.recentRun === 'fail' ? 'text-danger' :
                'text-warning'
            }`}>
              {testcase?.recentRun ? `Recently ${testcase?.recentRun}` : "Not tested"}
            </p>
            <span
              className={`p-2 rounded-md
                ${
                  testcase?.recentRun === 'pass' ? 'bg-success_light text-success' :
                    testcase?.recentRun === 'fail' ? 'bg-danger_light text-danger' :
                      'bg-warning_light text-warning'
                }
              `}
            >
              {
                testcase?.recentRun === 'pass' ? <CheckSquare /> :
                  testcase?.recentRun === 'fail' ? <AlertTriangle /> :
                    <HelpCircle />
              }
            </span>
          </div>
          <h5 className="mt-4 text-h6">Type: <span className="text-primary">{testcase?.type}</span></h5>
        </div>
        <div className="flex flex-col items-end">
          <Button variant="primary" onClick={() => {}}>
            <span className="flex gap-2">
              <Play />
              Run Test
            </span>
          </Button>
          <h6 className="mt-4 text-h6">Environment: <span className="text-primary">{(testcase?.environment as Partial<Environment>)?.name}</span></h6>
        </div>
      </div>

      <SingleTestCaseSkeleton testSchema={testcase?.testSchema} />

      <h5 className="mt-8 border-t border-gray-200 text-h5">Comments</h5>
      {
        testcase?.comments?.length === 0 && (
          <div className="mt-4">
            <h6 className="text-center text-h6">No Comments</h6>
          </div>
        )
      }
      <div className="mt-4">
        {
          testcase?.comments?.map((comment) => (
            <div className="p-4" key={comment._id}>
              <div className="flex items-center gap-4 ">
                <p className="text-md">{comment.comment}</p>
                <p className="text-sm font-bold">- {(comment.userId as User).name}</p>
              </div>
              <div className="flex items-end gap-2">
                <IconButton 
                  icon={<Heart className="w-3 h-3" />}
                  onClick={()=>handleLikeUnlike(comment._id!)}
                  variant={`${comment.likes!.includes(getUser()._id) ? 'success' : 'default'}`}
                  classes="p-2"
                />
                {comment.likes!.length}
              </div>
              <form onSubmit={()=>{}}>
                <Input 
                  label="Reply"
                  name="comment"
                  value={""}
                  onChange={()=>{}}
                  placeholder="Add reply"
                  classes="mb-2 w-full mt-5"
                />
                <Button variant="primary" classes="p-2" type="submit" onClick={()=>{}}>
                  <span className="flex items-center gap-2">
                    reply
                    <Send className="w-4 h-4" />
                  </span>
                </Button>
              </form>
              <div className="p-4">
                <p className="font-bold">Replies</p>
                {
                  comment.replies?.map((reply) => (
                    <div className="p-4" key={reply._id}>
                      <div className="flex items-center gap-4 ">
                        <p className="text-md">{reply.comment}</p>
                        <p className="text-sm font-bold">- {(reply.userId as User).name}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
      <form onSubmit={handleCommentSubmit}>
        <Input 
          label="Add Comment"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add Comment"
          classes="mb-2 w-full mt-5"
        />
        <Button variant="primary" type="submit" onClick={()=>{}}>
          <span className="flex items-center gap-2">
            comment
            <Send />
          </span>
        </Button>
      </form>
    </section>
  )
}

const SingleTestCaseSkeleton = ({ testSchema }: { testSchema: TestSchema[] }) => {
  const { openModel, closeModel, isModelOpen } = useModel();
  const [testUIModels, setTestUIModels] = useState([]);

  useEffect(() => {
    if(!testSchema) return;
    setTestUIModels([]);
  }, [testSchema])

  return (
    <div className="flex w-full mt-2 border border-gray-200 rounded-md">
      <div className="w-[60%] p-4">
        <p className="font-bold underline">BLUEPRINT REPRESENTATION</p>
        <div className="relative py-2 mt-4 border border-dashed min-h-[400px]">
          {
            <>{
              testSchema?.map((schema, index) => (
                <SchemaDisplay schema={schema} index={index} key={index} />
              ))
            }</>
          }
          <Button variant="success" onClick={openModel} classes="absolute top-4 left-4">
            <span className="flex gap-2">
              <Plus />
              Add Function
            </span>
          </Button>
          {
            isModelOpen && (
              <>
                <Backdrop closeModel={closeModel}>
                  <div className="absolute p-4 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md top-1/2 left-1/2" onClick={e=>e.stopPropagation()}>
                    <form>
                      <Select 
                        label="Function Type"
                        name="functionType"
                        onChange={()=>{}}
                        options={[{ name: "In Built", value: "inbuilt" }, { name: "Custom", value: "custom" }, { name: "Not Function", value: "not-function" }]}
                      />
                      <Select 
                        label="Inbuilt functions"
                        name="inbuiltFunction"
                        onChange={()=>{}}
                        options={[
                          { name: "Suite", value: "suite" }, 
                          { name: "Test", value: "test" },
                          { name: "Expect", value: "expect" },
                          { name: "Call", value: "call" },
                          { name: "Api", value: "api" },
                          { name: "Component", value: "component" },
                          { name: "Page", value: "page" },
                        ]}
                      />
                      <Input 
                        label="Function Name"
                        name="name"
                        value=""
                        onChange={()=>{}}
                      />
                      <Input 
                        label="Custom Schema"
                        name="customSchema"
                        value=""
                        onChange={()=>{}}
                        required={false}
                      />
                      <Input 
                        label="Path"
                        name="path"
                        value=""
                        onChange={()=>{}}
                      />
                      
                    </form>
                  </div>
                </Backdrop>
              </>
            )
          }
        </div>
      </div>
      <div className="w-[40%] p-4 text-white bg-deep_blue">
        <p className="font-bold underline">RUN LOG</p>
      </div>
    </div>
  )
}

const SchemaDisplay = ({ schema, index }: { schema: TestSchema, index: number }) => {
  return (
    <div 
      className={`absolute top-32 p-2 bg-primary_light text-primary rounded-sm`}
      style={{
        left: `${(index * 100) + 20 + index*100}px`
      }}
    >
      <p className="text-base font-bold underline">{schema.name}</p>
      <p className="text-sm font-semibold">Params</p>
      {
        schema.params?.map((param, index) => (
          <p className="pl-4 text-sm" key={index}>&rarr; {param === "polaris-anom-function" ? "() => {}" : param}</p>
        ))
      }
      {
        schema.anonymousTestChildren ? (
          <p className="my-2 text-sm">
            <span className="font-semibold">Children:</span> {schema.anonymousTestChildren}
          </p>
        ) : (<></>)
      }
      {
        schema.siblingTest ? (
          <p className="my-2 text-sm">
            <span className="font-semibold">Sibling Function:</span> {schema.siblingTest}
          </p>
        ) : (<></>)
      }
      <p className="my-2 text-sm"><span className="font-semibold">hasCustomSchema:</span> {schema.customSchema ? "true" : "false"}</p>
    </div>
  )
}

export default SingleTestCase