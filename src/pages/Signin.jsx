import React, { useEffect, useState } from "react";

import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { setUserData } from "../redux/authSlice";

const Signin = () => {
  const { authenticated, setAuthenticated } = useAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };


  const onLogin = async () => {
    if (!recaptchaToken) {
      toast.error("Please complete the reCAPTCHA");
      return;
    }

    try {
      setLoading(true);
      setButtonDisabled(true);

      const response = await axios.post("http://localhost:8000/auth/login", {
        ...user,
        recaptchaToken,
      });

      if (response?.data) {
        localStorage.setItem("userData", JSON.stringify(response.data));
        toast.success("Login successful");

        // Update global state and redirect
        dispatch(setUserData(response.data));
        setAuthenticated(true); // Assuming you have a setAuthenticated function
        navigate("/");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  useEffect(() => {
    if (user.username.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  useEffect(() => {
    if (authenticated) {
      navigate("/");
    }
  }, [authenticated]);

  const apiKey = import.meta.env.VITE_SITE_KEY;
  return (
    <div className="py-16">
      <div className="flex bg-white dark:bg-neutral-200 rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover dark:bg-neutral-200"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?t=st=1723281755~exp=1723285355~hmac=5bc1aed879dde3ac917b31e4d47badf1bfd2e9e3b77cf39bc55ecb1c91d965a6&w=740')",
            width: "50%",
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Authenticator
          </h2>
          <p className="text-xl text-gray-600 text-center">Welcome back!</p>

          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <a href="#" className="text-xs text-center text-gray-500 uppercase">
              or login with username
            </a>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="username"
              name="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Username"
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
            </div>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="password"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
            />
          </div>
          <p
            className="flex justify-end mt-1 text-xs text-gray-500 uppercase cursor-pointer hover:text-red-600 "
            onClick={() => {
              navigate("/forget-password");
            }}
          >
            Forget Password?
          </p>
          <div className="mt-4">
            <div className="flex justify-between">
              <ReCAPTCHA sitekey={apiKey} onChange={handleRecaptchaChange} />
            </div>
          </div>
          <div className="mt-8">
            <button
              className={`bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600 ${
                buttonDisabled ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={onLogin}
              disabled={buttonDisabled}
            >
              Login
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <p
              className="text-xs text-gray-500 uppercase cursor-pointer hover:text-cyan-600 "
              onClick={() => {
                navigate("/signup");
              }}
            >
              or sign up
            </p>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
