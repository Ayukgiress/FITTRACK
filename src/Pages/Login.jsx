import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa"; 
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; 
import { toast } from "sonner"; 
import GoogleAuth from "../Component/GoogleAuth.jsx";
import { useAuth } from "./AuthContext.jsx";
import { API_URL } from "../../constants.js";
import  ForgotPass  from "../Component/ForgotPass.jsx";

const Login = () => {
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setRefetchCurrentUser } = useAuth();
  const navigate = useNavigate(); 

  const handleFormSubmit = async ({ email, password }) => {
    console.log("Logging in with:", { email, password });
    setLoading(true); // Set loading to true when form is submitted

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
      localStorage.setItem("token", data.token);
      toast.success('login in successfull')
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
      <div className="lg:p-36 md:p-52 sm:20 p-10 w-full lg:w-1/2">
        <h1 className="text-2xl font-bold mb-4 text-white flex justify-center items-center">
          Login
        </h1>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-4 relative">
            <label htmlFor="email" className="block text-white font-bold">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-md focus-within:border-blue-500">
              <input
                type="text"
                id="email"
                {...register("email", { required: true })}
                className="w-full py-2 px-3 focus:outline-none"
                placeholder="Enter your email"
                aria-invalid={errors.email ? "true" : "false"}
              />
              <FaEnvelope className="text-white mx-2" />
            </div>
            {errors.email && <p className="text-red-500">Email is required</p>}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-white font-bold">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-md focus-within:border-blue-500">
              <input
                type="password"
                id="password"
                {...register("password", { required: true })}
                className="w-full py-2 px-3 focus:outline-none"
                placeholder="Enter your password"
                aria-invalid={errors.password ? "true" : "false"}
              />
              <FaLock className="text-white mx-2" />
            </div>
            {errors.password && <p className="text-red-500">Password is required</p>}
          </div>

          <div className="flex item-center justify-cemter flex-col gap-4">

          <button
            type="submit"
            disabled={loading} // Disable button when loading
            className={`bg-red-700 hover:bg-black text-white font-semibold rounded-md py-2 px-4 w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span className="flex justify-center items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
                  <path className="opacity-75" d="M4 12a8 8 0 0112-7.24V12H4z" />
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
          <ForgotPass/>

          <h1 className="text-center text-2xl text-white">or</h1>

          <div className='flex item-start justify-start'>
      <h2 className='flex text-start justify-start text-white text-xl'>Continue with Google</h2>

      </div>

          <GoogleAuth/>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
