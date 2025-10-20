import React, { useState } from "react";
import { FaEnvelope, FaLock, FaDumbbell } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import GoogleAuth from "../Component/GoogleAuth.jsx";
import { useAuth } from "./AuthContext.jsx";
import { API_URL } from "../../constants.js";

const Login = () => {
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setCurrentUser } = useAuth();
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
      localStorage.setItem("token", data.accessToken);

      // Fetch current user to update auth state
      try {
        const userResponse = await fetch(`${API_URL}/users/current-user`, {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        });
        if (userResponse.ok) {
          const user = await userResponse.json();
          setCurrentUser(user);
          toast.success('Login successful');
          navigate("/dashboard");
        } else {
          toast.error("Failed to authenticate user.");
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
        toast.error("An error occurred while logging in.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black "></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FaDumbbell className="text-red-600 text-3xl" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to continue your fitness journey
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: true })}
                  className="w-full py-3 px-4 pr-12 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                  aria-invalid={errors.email ? "true" : "false"}
                />
                <FaEnvelope className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  {...register("password", { required: true })}
                  className="w-full py-3 px-4 pr-12 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  aria-invalid={errors.password ? "true" : "false"}
                />
                <FaLock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">Password is required</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-red-500/25 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                "Sign In"
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <GoogleAuth />

            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="text-red-600 hover:text-red-700 font-semibold transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
