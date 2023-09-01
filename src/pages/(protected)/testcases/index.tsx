import { AlertTriangle, CheckSquare, Heart, HelpCircle, Minus, Play, Plus, Send } from "react-feather";

import Button from "../../../components/Button";
import Input from "../../../components/form/Input";
import React, { useEffect, useState } from "react";
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
  projectId: string;
}

const SingleTestCase = ({ testcase, setTestCase, testcaseId, environmentId, projectId }: ISingleTestCaseProps) => {
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

  const handleTestSchemaUpdate = async () => {
    const { statusCode, data, error } = await APICaller(`/testcases/${projectId}/${environmentId}/${testcase._id}`, "PATCH", {
      testSchema: testcase.testSchema,
    })

    if(statusCode === 200) {
      setTestCase(data.testcase);
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

      <SingleTestCaseSkeleton testSchema={testcase?.testSchema} setTestCase={setTestCase} />

      <Button variant="primary" classes="mt-2" onClick={handleTestSchemaUpdate}>Update Test Schema</Button>

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

const SingleTestCaseSkeleton = ({ testSchema, setTestCase }: { testSchema: TestSchema[], setTestCase: React.Dispatch<React.SetStateAction<TestCase | null>> }) => {
  const { openModel, closeModel, isModelOpen } = useModel();
  const [toPlaceIndex, setToPlaceIndex] = useState(0);
  const [newSchema, setNewSchema] = useState<TestSchema>({
    name: "",
    params: [],
    returns: null,
    children: [],
    customFunctions: [],
    customSchema: null,
  })

  const removeTestSchemaPart = (level: number, levelOneIndex: number, levelTwoIndex?: number, levelThreeIndex?: number) => {
    let schema = testSchema;
    
    if(level === 0) {
      schema.splice(levelOneIndex, 1);
      setTestCase((prev) => ({ ...prev!, schema }));
    } else if(level === 1) {
      schema[levelOneIndex].children.splice(levelTwoIndex!, 1);
      setTestCase(prev => ({ ...prev!, schema }));
    } else if(level === 2) {
      schema[levelOneIndex].children[levelTwoIndex!].children.splice(levelThreeIndex!, 1);
      setTestCase(prev => ({ ...prev!, schema }));
    }
  }

  const addTestSchemaPart = (level: number, data: Partial<TestSchema>, levelOneIndex: number, levelTwoIndex?: number, levelThreeIndex?: number) => {
    let schema = testSchema;
    
    if(level === 0) {
      schema.splice(levelOneIndex, 0, data as TestSchema);
      setTestCase((prev) => ({ ...prev!, schema }));
    } else if(level === 1) {
      schema[levelOneIndex].children.splice(levelTwoIndex!, 0, data as TestSchema);
      setTestCase(prev => ({ ...prev!, schema }));
    } else if(level === 2) {
      schema[levelOneIndex].children[levelTwoIndex!].children.splice(levelThreeIndex!, 0, data as TestSchema);
      setTestCase(prev => ({ ...prev!, schema }));
    }

    console.log(testSchema);
  }

  const handleOpenModel = (i: number) => {
    setToPlaceIndex(i);
    openModel();
  }

  useEffect(() => {
  }, [testSchema])

  return (
    <div className="flex w-full mt-2 border border-gray-200 rounded-md">
      <div className="w-[60%] p-4">
        <p className="mb-4 font-bold underline">BLUEPRINT REPRESENTATION</p>
          {
            testSchema?.map((schema, index) => (
              <React.Fragment key={index}>
                <SingleSchema schema={schema} removeSchema={removeTestSchemaPart} index={index} />
                <Button variant="default" onClick={()=>handleOpenModel(1)}><Plus /></Button>
              </React.Fragment>
            ))
          }
      </div>
      {isModelOpen && <AddSchemaModel closeModel={closeModel} addSchema={addTestSchemaPart} schema={newSchema} setSchema={setNewSchema} toPlaceIndex={toPlaceIndex} />}
      <div className="w-[40%] p-4 text-white bg-deep_blue">
        <p className="font-bold underline">RUN LOG</p>
      </div>
    </div>
  )
}

interface IAddSchemaProps {
  closeModel: () => void;
  addSchema: (level: number, data: Partial<TestSchema>, levelOneIndex: number, levelTwoIndex?: number, levelThreeIndex?: number) => void;
  schema: TestSchema;
  setSchema: React.Dispatch<React.SetStateAction<TestSchema>>;
  toPlaceIndex: number;
}

const AddSchemaModel = ({ addSchema, closeModel, schema, setSchema, toPlaceIndex }: IAddSchemaProps) => {
  const [funType, setFunType] = useState("builtIn");
  const [builtInType, setBuiltInType] = useState("Suite");

  const handleBuiltIn = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    switch (value) {
      case "Suite":
        setSchema(prev => ({ 
          ...prev,
          name: "Suite",
          params: ["", "() => {}"],
          returns: null,
          children: [],
          customFunctions: [],
          customSchema: null,
        }))
        break;
      case "Test":
        setSchema(prev => ({ 
          ...prev,
          name: "Test",
          params: ["", "() => {}"],
          returns: null,
          children: [],
          customFunctions: [],
          customSchema: null,
        }))
        break;
      case "Expect":
        setSchema(prev => ({ 
          ...prev,
          name: "Expect",
          params: [""],
          returns: "next-return",
          children: [],
          customFunctions: [],
          customSchema: null,
        }))
        break;
      case "Call":
        setSchema(prev => ({ 
          ...prev,
          name: "Call",
          params: [""],
          returns: null,
          children: [],
          customFunctions: [],
          customSchema: null,
        }))
        break;
      default:
        break;
    }

    setBuiltInType(value);
  }
  
  return (
    <Backdrop closeModel={closeModel}>
      <div onClick={e => e.stopPropagation()} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50%] p-4 bg-white rounded-md">
        <p className="mb-4 font-bold underline">ADD NEW SCHEMA</p>
        <div className="flex flex-col gap-4">
          <Select 
            label="Type"
            name="type"
            value={funType}
            onChange={(e)=>setFunType(e.target.value)}
            options={[
              { name: "Built In", value: "builtIn" },
              { name: "Custom", value: "custom" },
            ]}
          />
          {
            funType === "builtIn" ? (
              <>
                <Select 
                  label="Built in Function"
                  name="builtInfunction"
                  value={funType}
                  onChange={(e)=>setFunType(e.target.value)}
                  options={[
                    { name: "Suite", value: "Suite" },
                    { name: "Test", value: "Test" },
                    { name: "Expect", value: "Expect" },
                    { name: "Call", value: "Call" },
                    { name: "API", value: "API" },
                    { name: "Goto", value: "Goto" },
                    { name: "Component", value: "Component" },
                  ]}
                />
              </>
            ) : (
              <>
                <Input 
                  label="Name"
                  name="name"
                  value={schema?.name.toString()}
                  onChange={(e) => setSchema(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Name"
                  classes="mb-2 w-full"
                />
              </>
            )
          }
          {/* <Input 
            label="Params"
            name="params"
            value={schema?.params}
            onChange={(e) => setScschema(prev => ({ ...prev, params: e.target.value.split(",") }))}
            placeholder="Params"
            classes="mb-2 w-full"
          /> */}
          <Input 
            label="Returns"
            name="returns"
            value={schema?.returns || ""}
            onChange={(e) => setSchema(prev => ({ ...prev, returns: e.target.value }))}
            placeholder="Returns"
            classes="mb-2 w-full"
          />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="primary" onClick={()=>{addSchema(0, schema, toPlaceIndex); closeModel()}}>Add</Button>
          <Button variant="default" onClick={closeModel}>Cancel</Button>
        </div>
      </div>
    </Backdrop>
  )
}

interface ISingleSchemaProps {
  schema: TestSchema; 
  removeSchema: (level: number, levelOneIndex: number, levelTwoIndex?: number, levelThreeIndex?: number) => void;
  // addSchema: (level: number, data: Partial<TestSchema>, levelOneIndex: number, levelTwoIndex?: number, levelThreeIndex?: number) => void;
  index: number;
}

const SingleSchema = ({ schema, removeSchema, index }: ISingleSchemaProps) => {
  return (
    <div className="relative px-3 py-4 mb-1 bg-white border rounded-md">
      <IconButton 
        classes="bg-red-500 text-white absolute right-2 top-2"
        variant="default"
        icon={<Minus className="w-3 h-3" />}
        onClick={()=>removeSchema(0, index)}
      />
      <p className="inline-block p-1 font-bold bg-green-400 rounded-md">{schema.name}</p> <br />
        {
          schema.params.map((param, i) => {
            if(param !== "polaris-anom-next-function" && param !== "polaris-anom-function") {
              return (
                <span key={i} className="inline-block p-0 mx-4 mt-4">&lt; {param.toString()} &gt;</span>
              )
            }
          })
        }
        {
          schema.returns && <span className="font-semibold underline">Returns Next Function</span>
        }
      <div className="flex">
        <div className="w-1/12"></div>
        {
          schema.children.map((childSchema, j) => (
            <React.Fragment key={j}>
              <div className="relative w-full px-3 py-4 my-4 text-white bg-blue-400 border rounded-md">
                <IconButton 
                  classes="bg-red-500 text-white absolute right-2 top-2"
                  variant="default"
                  icon={<Minus className="w-3 h-3" />}
                  onClick={()=>removeSchema(1, index, j)}
                />
                <p className="inline-block p-1 font-bold bg-green-400 rounded-md">{childSchema.name}</p> <br />
                {
                  childSchema.params.map((param, i) => {
                    if(param !== "polaris-anom-next-function" && param !== "polaris-anom-function") {
                      return (
                        <span key={i} className="inline-block p-0 mx-4 mt-4">&lt; {param.toString()} &gt;</span>
                      )
                    }
                  })
                }
                {
                  childSchema.returns && <span className="font-semibold underline">Returns Next Function</span>
                }
                {
                  childSchema.children.map((childChildSchema, k) => (
                    <React.Fragment key={k}>
                      <div className="relative px-3 py-4 my-2 bg-indigo-500 rounded-md">
                        <IconButton 
                          classes="bg-red-500 text-white absolute right-2 top-2"
                          variant="default"
                          icon={<Minus className="w-3 h-3" />}
                          onClick={()=>removeSchema(2, index, j, k)}
                        />
                        <p className="inline-block p-1 font-bold bg-green-400 rounded-md">{childChildSchema.name}</p> <br />
                        {
                          childChildSchema.params.map((param, i) => {
                            if(param !== "polaris-anom-next-function" && param !== "polaris-anom-function") {
                              return (
                                <span key={i} className="inline-block p-0 mx-4 mt-4">&lt; {param.toString()} &gt;</span>
                              )
                            }
                          })
                        }
                        {
                          childChildSchema.returns && <span className="font-semibold underline">Returns Next Function</span>
                        }
                      </div>
                    </React.Fragment>
                  ))
                }
              </div>
            </React.Fragment>
          ))
        }
      </div>
    </div>
  )
}

export default SingleTestCase