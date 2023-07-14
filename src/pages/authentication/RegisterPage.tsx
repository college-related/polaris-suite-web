import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useState } from "react";
import Input from "../../components/form/Input";
import { APICaller } from "../../helpers/api";
import { addToken, addUser } from "../../helpers/cookie";

const RegisterPage = () => {
  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<dynamicObject>({});
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsRegistering(true);

    if (user.password === user.confirmPassword) {
      setError({});
      const { statusCode, data, error } = await APICaller(
        "/auth/register",
        "POST",
        {
          name: user.name,
          email: user.email,
          password: user.password,
        }
      );

      if (statusCode === 201) {
        // add user and token to localstorage
        addUser(data.user);
        addToken(data.token);

        // redirect to dashboard
        navigate("/polaris/dashboard");
      } else {
        console.log(error);
      }
    } else {
      setError({
        password: "Password and Confirm Password do not match",
        confirmPassword: "Password and Confirm Password do not match",
      });
    }

    setIsRegistering(false);
  };

  return (
    <>
      <h2 className="text-h2 font-bold">Register</h2>
      <p>
        Already have an account?{" "}
        <Link to="/auth/login" className="text-primary">
          Login
        </Link>
      </p>

      <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
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
          type="text"
          label="Username"
          name="name"
          placeholder="Username"
          value={user.name}
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
        <Button
          variant="default"
          onClick={() => {}}
          classes="rounded-sm bg-success text-white"
          isLoading={isRegistering}
        >
          Register
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
      <Button onClick={() => {}} size="xl" variant="dark" classes="font-bold w-full">
        Github
      </Button>

      <div className="text-right mt-2">
        <Link to="/auth/forgot-password" className="text-primary">
          Forgot Password?
        </Link>
      </div>
    </>
  );
};

export default RegisterPage;
