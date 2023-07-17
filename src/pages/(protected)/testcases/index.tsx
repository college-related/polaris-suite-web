import { AlertTriangle, CheckSquare, Heart, HelpCircle, Play, Send } from "react-feather";

import Button from "../../../components/Button";
import Input from "../../../components/form/Input";
import { useState } from "react";
import { APICaller } from "../../../helpers/api";
import { getUser } from "../../../helpers/cookie";
import IconButton from "../../../components/IconButton";

interface ISingleTestCaseProps {
  testcase: Partial<TestCase>;
  setTestCase: React.Dispatch<React.SetStateAction<Partial<TestCase> | null>>;
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
          <h5 className="text-h6 mt-4">Type: <span className="text-primary">{testcase?.type}</span></h5>
        </div>
        <div>
          <Button variant="primary" onClick={() => {}}>
            <span className="flex gap-2">
              <Play />
              Run Test
            </span>
          </Button>
          <h6 className="text-h6 mt-4">Environment: {(testcase?.environment as Partial<Environment>)?.name}</h6>
        </div>
      </div>

      <h5 className="text-h5 mt-8 border-t border-gray-200">Comments</h5>
      {
        testcase?.comments?.length === 0 && (
          <div className="mt-4">
            <h6 className="text-h6 text-center">No Comments</h6>
          </div>
        )
      }
      <div className="mt-4">
        {
          testcase?.comments?.map((comment) => (
            <div className="p-4" key={comment._id}>
              <div className="flex gap-4 items-center ">
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
                      <div className="flex gap-4 items-center ">
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

export default SingleTestCase