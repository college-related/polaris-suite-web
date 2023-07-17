import { useEffect } from "react";
import { Loader } from "react-feather"
import { useNavigate, useSearchParams } from "react-router-dom"

import { APICaller } from "../../../helpers/api";

const AcceptInvitation = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const projectId = params.get("projectId");
  const email = params.get("email");

  useEffect(() => {
    (async () => {
      const { statusCode, error } = await APICaller(`/projects/${projectId}/invite/accept`, "PATCH", { email });

      if (statusCode === 200) {
        navigate(`/`);
      } else {
        console.log(error);
      }
    })()
  }, [])
  
  return (
    <main className="w-screen h-screen bg-primary_light flex flex-col items-center justify-center">
      <Loader className="w-20 h-20 text-primary animate-[spin_2s_ease-in-out_infinite]" />
      <h2 className="text-h2 text-primary">Invitation Accepted</h2>
    </main>
  )
}

export default AcceptInvitation