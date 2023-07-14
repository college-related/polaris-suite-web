import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useState } from "react";
import Input from "../../components/form/Input";

const ResetPasswordPage = () => {
  const [user, setUser] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user.password === user.confirmPassword) {
    } else {
      setError({
        password: "Password and Confirm Password do not match",
        confirmPassword: "Password and Confirm Password do not match",
      });
    }
  };

  return (
    <>
      <h2 className="text-h2 font-bold">Reset password</h2>
      <p>
        Already have an account?{" "}
        <Link to="/auth/login" className="text-primary">
          Login
        </Link>
      </p>

      <form className="flex flex-col gap-4 mt-16" onSubmit={handleSubmit}>
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
        <Button onClick={() => navigate("/auth/reset-password")} variant="default" classes="bg-success text-white font-bold">
          Reset Password
        </Button>
      </form>
    </>
  );
};

export default ResetPasswordPage;
