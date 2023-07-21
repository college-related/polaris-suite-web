import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useState } from "react";
import Input from "../../components/form/Input";
import { APICaller } from "../../helpers/api";

const ResetPasswordPage = () => {
  const [user, setUser] = useState({
    password: "",
    confirmPassword: "",
    token: "",
  });
  const [error, setError] = useState({});
  const [isResetingPassword, setIsResetingPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsResetingPassword(true);
    setError({});

    if (user.password === user.confirmPassword) {
      const { statusCode, error } = await APICaller(`/auth/reset-password?token=${user.token}`, "POST", { password: user.password });

      if(statusCode === 200) {
        navigate("/auth/login");
      }else {
        setError({ token: error.message });
      }
    } else {
      setError({
        password: "Password and Confirm Password do not match",
        confirmPassword: "Password and Confirm Password do not match",
      });
    }

    setIsResetingPassword(false);
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
          type="text"
          label="Token"
          name="token"
          placeholder="Paste the Token here"
          value={user.token}
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
        <Button loadingText="Reseting your password.." isLoading={isResetingPassword} onClick={() => {}} variant="default" classes="bg-success text-white font-bold">
          Reset Password
        </Button>
      </form>
    </>
  );
};

export default ResetPasswordPage;
