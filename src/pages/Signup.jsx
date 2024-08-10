import axios from "axios";
import  { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const userSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/auth/signup",
        user
      );
      console.log(response);
      if (response.data.success) {
        toast.success("User created successfully! Please login to continue");
        navigate("/signin");
      }
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.name.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="py-16">
      <div className="flex bg-white dark:bg-neutral-200 rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg?t=st=1723281961~exp=1723285561~hmac=34fce5e594a774c32fcb9977693112945f6258e416d6d3a8280f83d0cfd2faeb&w=740')",
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
              {" "}
              login with username
            </a>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              name="name"
              placeholder="Enter your name"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              name="username"
              placeholder="Enter Your Username"
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
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              name="password"
              placeholder="Enter Your Password"
            />
          </div>
          <div className="mt-8">
            <button
              onClick={userSignUp}
              disabled={buttonDisabled}
              className={`bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600  buttonDisabled ? "cursor-not-allowed opacity-50" : ""
                    }`}
            >
              Sign Up
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <p
              className="text-xs text-gray-500 uppercase cursor-pointer hover:text-cyan-600"
              onClick={() => {
                navigate("/signin");
              }}
            >
              or sign in
            </p>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
