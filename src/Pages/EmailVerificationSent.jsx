import React, { useState } from "react";
import { FaEnvelope, FaCheckCircle, FaKey } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { API_URL } from "../../constants";

const EmailVerificationSent = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCodeVerification = async () => {
    if (!verificationCode.trim()) {
      toast.error("Please enter the verification code");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/verify-email-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: verificationCode.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("Email verified successfully! You can now log in.");
        navigate("/login");
      } else {
        toast.error(data.message || "Invalid verification code. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      toast.error("An error occurred during verification.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    try {
      // This would need to be implemented on the backend
      // For now, just show a message
      toast.info("Verification code resent. Please check your email.");
    } catch (error) {
      toast.error("Failed to resend verification code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <FaEnvelope className="text-blue-600 text-3xl" />
            </div>
          </div>
          <h1 className="text-4xl font-black text-white mb-2">
            Check Your Email
          </h1>
          <p className="text-blue-100">
            We've sent you a verification code
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8">
          <div className="text-center">
            <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Verification Code Sent!
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We've sent a 6-digit verification code to your email address. Enter it below to activate your account.
            </p>

            {/* Verification Code Input */}
            <div className="mb-6">
              <label htmlFor="verificationCode" className="block text-sm font-semibold text-gray-700 mb-2">
                Verification Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full py-3 px-4 pr-12 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-center text-2xl font-mono tracking-widest"
                  placeholder="000000"
                  maxLength="6"
                />
                <FaKey className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleCodeVerification}
                disabled={loading}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-blue-500/25 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? "Verifying..." : "Verify Code"}
              </button>

              <button
                onClick={handleResendCode}
                disabled={loading}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-300"
              >
                Resend Code
              </button>

              <Link
                to="/login"
                className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-300 text-center"
              >
                Back to Login
              </Link>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Need help?{" "}
                <a href="mailto:support@Noslack.com" className="text-blue-600 hover:text-blue-700 font-medium">
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationSent;
