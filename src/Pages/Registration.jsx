import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { API_URL } from "../../constants";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "../Component/GoogleAuth";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) newErrors.username = "Username is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
  
    setLoading(true); 
  
    try {
      const response = await fetch(`http://localhost:5000/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
  
      if (response.ok) {
        toast.success("Registration successful! Please check your email to verify your account.");
        setUsername("");
        setEmail("");
        setPassword("");
      } else if (response.status === 404) {
        toast.error("Registration endpoint not found. Please check your server.");
      } else if (response.status === 400) {
        setErrors({ email: "Email already exists. Please login." });
        toast.error("Email already exists, please login");
      } else {
        const data = await response.json();
        toast.error(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("An error occurred during registration, please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-login-color flex justify-center items-center h-screen">
      <div className="lg:p-36 md:p-52 sm:20 p-10 w-full lg:w-1/2">
        <h1 className="text-2xl font-bold mb-4 text-white items-center justify-center flex">
          Register
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-white font-bold">
              Username
            </label>
            <div className="flex items-center border border-gray-300 rounded-md focus-within:border-blue-500">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
              <FaUser className="text-white mx-2" />
            </div>
            {errors.username && <p className="text-red-500">{errors.username}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-white font-bold">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-md focus-within:border-blue-500">
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
              <FaEnvelope className="text-white mx-2" />
            </div>
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-white font-bold">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-md focus-within:border-blue-500">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
              <FaLock className="text-white mx-2" />
            </div>
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>

<div className="item-center justify-center flex flex-col gap-3">
<button
            type="submit"
            disabled={loading}
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
                Registering...
              </span>
            ) : (
              "Register"
            )}
          </button>

          <h1 className="text-2xl text-center text-white">or</h1>

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

export default Registration;
