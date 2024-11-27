import React, { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import GoogleAuth from "../Component/GoogleAuth.jsx";
import { useAuth } from "./AuthContext.jsx";
import { API_URL } from "../../constants.js";
import ForgotPass from "../Component/ForgotPass.jsx";
import { Link } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);  // State to toggle password visibility

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setRefetchCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async ({ email, password }) => {
    setLoading(true);
  
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "Invalid email or password.");
        return;
      }
  
      const data = await response.json();
      localStorage.setItem("token", data.accessToken); 
      toast.success("Login successful");
      navigate("/dashboard");
      setRefetchCurrentUser(prev => !prev);
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="bg-login-color flex justify-center items-center h-screen">
      <div className="lg:p-36 md:p-52 sm:20 p-10 w-full lg:w-1/2 ">
        <h1 className="text-2xl 3xl:text-6xl font-bold mb-4 text-white flex justify-center items-center">
          Login
        </h1>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-4 relative">
            <label htmlFor="email" className="block text-white font-bold 3xl:text-5xl">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-md focus-within:border-blue-500">
              <input
                type="text"
                id="email"
                {...register("email", { required: true })}
                className="w-full py-2 px-3  3xl:text-4xl 3xl:w-[56rem] focus:outline-none 3xl:h-24"
                placeholder="Enter your email"
                aria-invalid={errors.email ? "true" : "false"}
              /> 
              <FaEnvelope className="text-white mx-2" />
            </div>
            {errors.email && <p className="text-red-500 3xl:text-5xl">Email is required</p>}
          </div>
          <div className="mb-4 relative">

            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-white font-bold 3xl:text-6xl">
                Password
              </label>
              <ForgotPass />
            </div>
            <div className="flex items-center border border-gray-300 rounded-md focus-within:border-blue-500">
              <input
                type={passwordVisible ? "text" : "password"}  // Toggle between password and text
                id="password"
                {...register("password", { required: true })}
                className="w-full py-2 px-3 3xl:w-[56rem]  3xl:h-24 3xl:text-4xl focus:outline-none"
                placeholder="Enter your password"
                aria-invalid={errors.password ? "true" : "false"}
              />
              <button
                type="button"
                className="text-white mx-2"
                onClick={() => setPasswordVisible(prev => !prev)}  // Toggle password visibility
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}  {/* Toggle the icon */}
              </button>
            </div>
            {errors.password && <p className="text-red-500 3xl:text-5xl">Password is required</p>}
          </div>

          <div className="flex item-center justify-center flex-col gap-4">
            <button
              type="submit"
              disabled={loading}
              className={`bg-red-700 hover:bg-black 3xl:h-24 text-white 3xl:text-5xl font-semibold rounded-md py-2 px-4 w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <span className="flex justify-center items-center 3xl:text-5xl">
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
                    <path className="opacity-75 3xl:text-5xl" d="M4 12a8 8 0 0112-7.24V12H4z" />
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>

            <h1 className="text-center text-2xl text-white 3xl:text-7xl">or</h1>

            <GoogleAuth />

            <div className="flex items-center justify-center h-10 3xl:h-24 rounded-md bg-black gap-2 text-white">
              <h2 className="text-center 3xl:text-4xl">Don't have an account?</h2>
              <Link to="/registration" className="text-red-700 text-center 3xl:text-4xl">Register</Link>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;
