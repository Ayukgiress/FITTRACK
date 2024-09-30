import React from "react";
import { FaEnvelope, FaLock } from "react-icons/fa"; 
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; 
import { toast } from "sonner"; 
import { API_URL } from "../../constants.js"; 

const Login = ({ setIsAuthenticated }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); 

  const navigate = useNavigate(); 

  const handleFormSubmit = async ({ email, password }) => {
    console.log("Logging in with:", { email, password });
  
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.msg || "Invalid email or password."); // Updated to use error message from server
        throw new Error("Network response was not ok");
      }
      
  
      const data = await response.json();
      localStorage.setItem("token", data.token);
      toast.success("Login successful! Redirecting to Dashboard...");
      
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  
  return (
    <div className="bg-login-color flex justify-center items-center h-screen">
      <div className="lg:p-36 md:p-52 sm:20 p-10 w-full lg:w-1/2">
        <h1 className="text-2xl font-bold mb-4 text-white items-center justify-center flex">
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

      <div className="relative w-1/2 h-screen hidden lg:block">
        <img
          src="src/assets/pexels-adrien-olichon-1257089-2387533.jpg"
          alt="Image"
          className="object-cover w-full h-full"
        />
        <div className="absolute flex items-center justify-center top-36 left-36 w-96 h-96 bg-login-color rounded-md">
          <h1 className="w-96 text-center justify-center font-bold text-3xl text-white">
            Achieve your <br /> fitness with <br />
            Active<span className="text-red-600">Pulse</span>
          </h1>
          <div>
            <img
              src="src/assets/images/pexels-mike-jones-8874913-Photoroom.png"
              alt="img"
              className="h-96 w-96 bg-transparent border-b-2 border-red-600 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
