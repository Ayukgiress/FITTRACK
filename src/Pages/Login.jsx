import React from "react";
import { FaEnvelope, FaLock } from "react-icons/fa"; 
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; 
import { toast } from "sonner"; 
import { API_URL } from "../../constants.js"; 
import { useAuth } from "./AuthContext.jsx"; 

const Login = () => {
  const { login } = useAuth(); 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); 

  const navigate = useNavigate(); 

  const handleFormSubmit = async ({ email, password }) => {
    console.log("Logging in with:", { email, password });
  
    try {
      const response = await fetch(`https://fitness-tracker-api-backend.onrender.com/users/login`, {
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
      toast.success("Login successful! Redirecting to Dashboard...");
      
      login(); // Call the login function from context
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("An unexpected error occurred.");
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
          <button
            type="submit"
            className="bg-red-700 hover:bg-black text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
