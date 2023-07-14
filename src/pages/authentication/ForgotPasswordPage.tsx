import { Link, useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import Input from "../../components/form/Input";
import { useState } from "react";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

  return (
    <>
      <h2 className="text-h2 font-bold">Forgot password</h2>
      <p>Already have an account? <Link to="/auth/login" className="text-primary">Login</Link></p>

      <form className="flex flex-col gap-4 mt-12" onSubmit={handleSubmit}>
        <Input 
          type="email"
          label="Email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleInputChange} 
          errors={error}
        />
        <Button onClick={()=>navigate("/auth/reset-password")} variant="default" classes="bg-success text-white font-bold">Send Reset Email</Button>
      </form>
    </>
  )
}

export default ForgotPasswordPage