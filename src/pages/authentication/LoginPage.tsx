import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

import Button from "../../components/Button";
import Input from "../../components/form/Input";
import { useState } from "react";
import { APICaller } from "../../helpers/api";
import { addToken, addUser } from "../../helpers/cookie";

const LoginPage = () => {

  const [search] = useSearchParams();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<dynamicObject>({});
  const [isLogging, setIsLogging] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(search.get("code")) {
      (async () => {
        const { statusCode, data, error } = await APICaller('/auth/login/github', 'POST', {
          code: search.get("code")
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
      })()
    }
  }, [search])

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

  const loginToGoogle = useGoogleLogin({
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

  const loginWithGithub = async () => {
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}`)
  }

  return (
    <>
      <h2 className="font-bold text-h2">Login Page</h2>
      <p>
        Don't have an account?{" "}
        <Link to="/auth/register" className="text-primary">
          Create one
        </Link>
      </p>

      <form className="flex flex-col gap-4 mt-16" onSubmit={handleSubmit}>
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
          classes="rounded-sm bg-success text-white"
          type="submit"
        >
          Login
        </Button>
      </form>

      <p className="mt-10 text-center">OR</p>

      <div className="flex flex-col items-center w-full gap-4 mt-2">        
        <Button
          onClick={loginToGoogle}
          disabled={isLogging}
          variant="default"
          size="xl"
          classes="w-full bg-white text-black"
        >
          <span className="flex items-center">
            <img src="/social-logos/google-g-2015.svg" alt="google" className="w-6 mr-12" />
            Log in with Google
          </span>
        </Button>
        <Button
          onClick={loginWithGithub}
          variant="dark"
          disabled={isLogging}
          classes="font-bold w-full"
          size="xl"
        >
          <span className="flex items-center">
            <img src="/social-logos/github-white.svg" alt="github" className="w-6 mr-12" />
            Log in with Github
          </span>
        </Button>
      </div>

      <div className="mt-5 text-right">
        <Link to="/auth/forgot-password" className="text-primary">
          Forgot Password?
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
