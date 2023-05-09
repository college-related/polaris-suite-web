import { Link } from "react-router-dom"
import Button from "../../components/Button"
import Input from "../../components/form/Input";
import { useState } from "react";

const LoginPage = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }

  return (
    <>
        <h1>Login Page</h1>
        <p>Don't have an account? <Link to="/auth/register">Create one</Link></p>

        <form className="flex flex-col gap-4 mt-16" onSubmit={handleSubmit}>
            <Input 
                type="email"
                label="Email"
                name="email"
                placeholder="Email"
                value={user.email}
                onChange={handleInputChange}
                errors={error}
            />
            <Input 
                type="password"
                label="Password"
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={handleInputChange}
                errors={error} 
            />
            <button className="bg-primary text-white px-4 py-2 rounded-sm" type="submit">Login</button>
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