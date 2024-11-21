import React, { useState } from "react";
import { FaEnvelope, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { API_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "../Component/GoogleAuth";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);  // Track registration success
  const navigate = useNavigate();

  const handleInputChanged = (e) => {
    const { id, value } = e.target;
    if (id === "username") setUsername(value);
    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);
  };

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
      Object.values(errors).forEach((error) => {
        toast.error(error);
      });
      return;
    }

    setLoading(true);
    toast.loading("Registering...");

    try {
      const response = await fetch(`${API_URL}/users/register`, {
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

      setLoading(false);

      if (response.ok) {
        const data = await response.json();
        setRegistrationSuccess(true);  // Set registration success
        toast.success("Registration successful! Please check your email for verification instructions.");
        // Optionally redirect to a different page, e.g., login page, for manual verification.
        navigate("/verify-email");  // Redirect to verify email page
      } else if (response.status === 400) {
        const data = await response.json();
        setErrors({ email: "Email already exists. Please log in." });
        toast.error("Email already exists. Please log in.");
      } else {
        const data = await response.json();
        toast.error(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred during registration. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-login-color flex justify-center items-center h-screen">
      <div className="lg:p-36 md:p-52 sm:20 p-10 w-full lg:w-1/2 ">
        <h1 className="text-2xl 3xl:text-6xl font-bold mb-4 text-white flex justify-center items-center">
          Register
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label htmlFor="username" className="block text-white font-bold 3xl:text-5xl">
              Username
            </label>
            <div className="flex items-center border border-gray-300 rounded-md focus-within:border-blue-500">
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleInputChanged}
                className="w-full py-2 px-3 3xl:text-4xl 3xl:w-[56rem] focus:outline-none 3xl:h-24"
                placeholder="Enter your username"
              />
              <FaUser className="text-white mx-2" />
            </div>
            {errors.username && <p className="text-red-500 3xl:text-5xl">{errors.username}</p>}
          </div>

          <div className="mb-4 relative">
            <label htmlFor="email" className="block text-white font-bold 3xl:text-5xl">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-md focus-within:border-blue-500">
              <input
                type="text"
                id="email"
                value={email}
                onChange={handleInputChanged}
                className="w-full py-2 px-3 3xl:text-4xl 3xl:w-[56rem] focus:outline-none 3xl:h-24"
                placeholder="Enter your email"
              />
              <FaEnvelope className="text-white mx-2" />
            </div>
            {errors.email && <p className="text-red-500 3xl:text-5xl">{errors.email}</p>}
          </div>

          <div className="mb-4 relative">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-white font-bold 3xl:text-5xl">
                Password
              </label>
            </div>
            <div className="flex items-center border border-gray-300 rounded-md focus-within:border-blue-500">
              <input
                type={passwordVisible ? "text" : "password"}  
                id="password"
                value={password}
                onChange={handleInputChanged}
                className="w-full py-2 px-3 3xl:w-[56rem] 3xl:h-24 3xl:text-4xl focus:outline-none"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="text-white mx-2"
                onClick={() => setPasswordVisible(prev => !prev)} 
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}  
              </button>
            </div>
            {errors.password && <p className="text-red-500 3xl:text-5xl">{errors.password}</p>}
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
                  Registering...
                </span>
              ) : (
                "Register"
              )}
            </button>

            <h1 className="text-center text-2xl text-white 3xl:text-7xl">or</h1>

            <GoogleAuth />

            <div className="flex items-center justify-center h-10 3xl:h-24 rounded-md bg-black gap-2 text-white">
              <h2 className="text-center 3xl:text-4xl">Already have an account?</h2>
              <Link to="/login" className="text-red-700 text-center 3xl:text-4xl">Login</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
