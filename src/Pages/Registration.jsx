import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { API_URL } from "../../constants";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom"; 

const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
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
  
    try {
      const response = await fetch(`${API_URL}/register`, {
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
        const data = await response.json();
        localStorage.setItem("token", data.token);
        toast.success("Registration successful! Redirecting to login");
        navigate("/login");
      } else if (response.status === 404) {
        toast.error("Registration endpoint not found. Please check your server.");
      } else if (response.status === 400) {
        setErrors({ email: "Email already exists. Please login." });
        toast.error("Email already exists, please login");
      } else {
        const data = await response.json();
        console.error("Registration failed:", data.message);
        toast.error(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("An error occurred during registration, please try again later");
    }
  };
  
  

  return (
    <div className="bg-login-color flex justify-center items-center h-screen">
      <div className="lg:p-36 md:p-52 sm:20 p-10 w-full lg:w-1/2">
        <h1 className="text-2xl font-bold mb-4 text-white items-center justify-center flex">
          Register
        </h1>
        <form action="#" method="POST" onSubmit={handleSubmit}>
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

          <button
            className="bg-red-700 hover:bg-black text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Register
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

          <div className="">
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

export default Registration;
