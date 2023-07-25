import { useState } from "react";

import Button from "../../components/Button"
import { addUser, getUser } from "../../helpers/cookie"
import { APICaller } from "../../helpers/api";
import Input from "../../components/form/Input";

const Profile = () => {
  const [isSendingVerification, setIsSendingVerification] = useState(false);
  const [verificationMailSent, setVerificationMailSent] = useState(false);
  const [token, setToken] = useState("");

  const sendVerificationLink = async () => {
    setIsSendingVerification(true);

    const { statusCode, error } = await APICaller(`/auth/send-verification-email`, "POST", { email: getUser().email, userId: getUser()._id });

    if(statusCode !== 200) {
      console.log(error);
    } else {
      setVerificationMailSent(true);
    }

    setIsSendingVerification(false);
  }

  const verifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    const { statusCode, error } = await APICaller(`/auth/verify-email?token=${token}`, "POST");

    if(statusCode !== 200) {
      console.log(error);
    } else {
      addUser({ ...getUser(), isEmailVerified: true });
      setVerificationMailSent(false);
    }
  }

  return (
    <main>
      <h3 className="text-h3">Profile</h3>
      <div className="bg-white rounded-md p-8 my-4">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20">
            <img
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${getUser().name}&backgroundType=gradientLinear&fontSize=36&fontWeight=500`}
              alt="profile picture with initails"
              className="rounded-full"
            />
          </div>
          <div className="flex gap-1 flex-col">
            <h4 className="text-h4">{getUser().name}</h4>
            <p className="text-sm">{getUser().email}</p>
            {
              getUser().isEmailVerified ? (
                <p className="text-sm text-success font-bold">Email Verified</p>
              ) : (
                <>
                  {
                    verificationMailSent ? (
                      <>
                        <p className="text-sm text-warning font-bold">Email Verification Link Sent</p>
                        <form onSubmit={verifyEmail}>
                          <Input 
                            name="token"
                            label="Verification Code"
                            placeholder="Enter Verification Code"
                            type="text"
                            onChange={(e)=>setToken(e.target.value)}
                            value={token}
                          />
                          <Button variant="primary" type="submit" onClick={()=>{}}>Verify Email</Button>
                        </form>
                      </>
                    ) : (
                      <p className="text-sm text-warning font-bold">
                        Email Not Verified
                        <Button isLoading={isSendingVerification} loadingText="Sending Email...." variant="clear" classes="underline text-primary" onClick={sendVerificationLink}>Send Verification Link</Button>
                      </p>
                    )
                  }
                </>
              )
            }
          </div>
        </div>
      </div>
    </main>
  )
}

export default Profile