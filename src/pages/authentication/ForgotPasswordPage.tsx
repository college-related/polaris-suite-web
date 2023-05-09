import { Link, useNavigate } from "react-router-dom"
import Button from "../../components/Button"

const ForgotPasswordPage = () => {

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

  return (
    <>
        <h1>Forgot password</h1>
        <p>Already have an account? <Link to="/auth/login">Login</Link></p>

        <form className="flex flex-col gap-4 mt-16" onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" className="border border-gray-300 px-4 py-2 rounded-md" />
            <Button onClick={()=>navigate("/auth/reset-password")} variant="dark">Send Reset Email</Button>
        </form>
    </>
  )
}

export default ForgotPasswordPage