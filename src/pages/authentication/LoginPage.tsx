import { Link } from "react-router-dom"
import Button from "../../components/Button"

const LoginPage = () => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }

  return (
    <>
        <h1>Login Page</h1>
        <p>Don't have an account? <Link to="/auth/register">Create one</Link></p>

        <form className="flex flex-col gap-4 mt-16" onSubmit={handleSubmit}>
            <input type="text" placeholder="Email" className="border border-gray-300 px-4 py-2 rounded-md" />
            <input type="password" placeholder="Password" className="border border-gray-300 px-4 py-2 rounded-md" />
            <button className="bg-primary text-white px-4 py-2 rounded-md">Login</button>
        </form>

        <p className="text-center mt-10">OR</p>

        <Button
            onClick={() => {}}
            variant="default"
            size="xl"
            classes="w-full my-4 bg-white text-black"
        >
            Google
        </Button>
        <Button
            onClick={() => {}}
            variant="dark"
            size="xl"
            classes="w-full"
        >
            Github
        </Button>

        <div className="text-right mt-5">
            <Link to="/auth/forgot-password">Forgot Password?</Link>
        </div>
    </>
  )
}

export default LoginPage