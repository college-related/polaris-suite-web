import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/form/Input";
import { useState } from "react";
import { APICaller } from "../../helpers/api";
import { addToken, addUser } from "../../helpers/cookie";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<dynamicObject>({});
  const [isLogging, setIsLogging] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLogging(true);
    setError({});
    const { statusCode, data, error } = await APICaller(
      "/auth/login",
      "POST",
      user
    );

    if (statusCode === 200) {
      // add user and token to localstorage
      addUser(data.user);
      addToken(data.token);

      // redirect to dashboard
      navigate("/polaris/dashboard");
    } else {
      if (statusCode === 401) {
        setError({
          message: error.message,
        });
      } else {
        console.log(error);
      }
    }

    setIsLogging(false);
  };

  return (
    <>
      <h2 className="text-h2 font-bold">Login Page</h2>
      <p>
        Don't have an account?{" "}
        <Link to="/auth/register" className="text-primary">
          Create one
        </Link>
      </p>

      <form className="flex flex-col gap-4 mt-16" onSubmit={handleSubmit}>
        {error && error.hasOwnProperty("message") && (
          <div className="px-3 py-4 rounded-md border border-red-500 bg-red-100">
            <p className="text-red-500">{error.message}</p>
          </div>
        )}
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
        <Button
          variant="default"
          onClick={() => {}}
          isLoading={isLogging}
          classes="rounded-sm"
          type="submit"
        >
          Login
        </Button>
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
        variant="success"
        classes="font-bold w-full"
        size="xl"
      >
        Github
      </Button>

      <div className="text-right mt-5">
        <Link to="/auth/forgot-password" className="text-primary">
          Forgot Password?
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
