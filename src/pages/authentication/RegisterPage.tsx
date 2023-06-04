import { Link } from "react-router-dom"
import Button from "../../components/Button"
import { useState } from "react";
import Input from "../../components/form/Input";

const RegisterPage = () => {
    const [user, setUser] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
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

        if(user.password === user.confirmPassword) {

        } else {
            setError({
                password: "Password and Confirm Password do not match",
                confirmPassword: "Password and Confirm Password do not match",
            })
        }
    }

  return (
    <>
        <h1>Register</h1>
        <p>Already have an account? <Link to="/auth/login">Login</Link></p>

        <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
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
                type="text"
                label="Username"
                name="username"
                placeholder="Username"
                value={user.username}
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
            <Input 
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={user.confirmPassword}
                onChange={handleInputChange} 
                errors={error}
            />
            <button className="bg-primary text-white px-4 py-2 rounded-sm">Register</button>
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

        <div className="text-right mt-2">
            <Link to="/auth/forgot-password">Forgot Password?</Link>
        </div>
    </>
  )
}

export default RegisterPage