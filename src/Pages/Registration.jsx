import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaDumbbell } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { API_URL } from "../../constants";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import GoogleAuth from "../Component/GoogleAuth";

const Registration = () => {
  const [loading, setLoading] = useState(false);
  const { setRefetchCurrentUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async ({ username, email, password, weight }) => {
    console.log("Registering with:", { username, email, password, weight });
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, weight }),
      });

      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          toast.error("Email already exists. Please log in.");
          return;
        }
        const errorData = await response.json();
        toast.error(errorData.message || "Registration failed.");
        return;
      }

      const data = await response.json();
      toast.success("Registration successful! Redirecting to dashboard...");
      navigate("/dashboard");
      setRefetchCurrentUser(prev => !prev);
    } catch (error) {
      console.error("Error registering:", error);
      toast.error("An unexpected error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
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
            Join ActivePulse
          </h1>
          <p className="text-gray-600">
            Start your fitness journey today
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  {...register("username", { required: "Username is required" })}
                  className="w-full py-3 px-4 pr-12 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  placeholder="Choose a username"
                  aria-invalid={errors.username ? "true" : "false"}
                />
                <FaUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format"
                    }
                  })}
                  className="w-full py-3 px-4 pr-12 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                  aria-invalid={errors.email ? "true" : "false"}
                />
                <FaEnvelope className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long"
                    }
                  })}
                  className="w-full py-3 px-4 pr-12 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  placeholder="Create a password"
                  aria-invalid={errors.password ? "true" : "false"}
                />
                <FaLock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label htmlFor="weight" className="block text-sm font-semibold text-gray-700 mb-2">
                Weight (kg)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="weight"
                  {...register("weight", {
                    required: "Weight is required",
                    min: {
                      value: 30,
                      message: "Weight must be at least 30 kg"
                    },
                    max: {
                      value: 300,
                      message: "Weight must be less than 300 kg"
                    }
                  })}
                  className="w-full py-3 px-4 pr-12 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your weight in kg"
                  aria-invalid={errors.weight ? "true" : "false"}
                />
                <FaDumbbell className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>}
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
                  Creating Account...
                </span>
              ) : (
                "Create Account"
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
                Already have an account?{" "}
                <Link to="/login" className="text-red-600 hover:text-red-700 font-semibold transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
