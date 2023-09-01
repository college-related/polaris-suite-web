import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

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

  const registerWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { statusCode, data, error } = await APICaller('/auth/login/google', 'POST', {
        googleToken: tokenResponse.access_token,
      });

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
    },
  })

  const registerWithGithub = async () => {
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}`)
  }

  return (
    <>
      <h2 className="font-bold text-h2">Register</h2>
      <p>
        Already have an account?{" "}
        <Link to="/auth/login" className="text-primary">
          Login
        </Link>
      </p>

      <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
        {error && error.hasOwnProperty("message") && (
          <div className="px-3 py-4 bg-red-100 border border-red-500 rounded-md">
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

      <p className="mt-10 text-center">OR</p>

      <div className="flex flex-col gap-4 mt-2">
        <Button
          onClick={registerWithGoogle}
          variant="default"
          size="xl"
          classes="w-full bg-white text-black"
        >
          <span className="flex items-center">
            <img src="/social-logos/google-g-2015.svg" alt="google" className="w-6 mr-12" />
            Log in with Google
          </span>
        </Button>
        <Button onClick={registerWithGithub} size="xl" variant="dark" classes="font-bold w-full">
          <span className="flex items-center">
            <img src="/social-logos/github-white.svg" alt="github" className="w-6 mr-12" />
            Log in with Github
          </span>
        </Button>
      </div>

      <div className="mt-2 text-right">
        <Link to="/auth/forgot-password" className="text-primary">
          Forgot Password?
        </Link>
      </div>
    </>
  );
};

export default RegisterPage;
