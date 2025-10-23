import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Pages/AuthContext";

const OauthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setRefetchCurrentUser, setShowWeightModal } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token") || searchParams.get("accessToken");
    const errorParam = searchParams.get("error");
    const missingWeight = searchParams.get("missingWeight");

    console.log("OAuth callback received:", {
      token: !!token,
      error: errorParam,
      missingWeight,
      search: location.search,
      fullUrl: window.location.href,
      pathname: location.pathname
    });

    if (token) {
      console.log("Token received, setting up authentication");
      localStorage.setItem("token", token);
      setRefetchCurrentUser(prev => !prev);

      const redirectPath = searchParams.get("redirect") || searchParams.get("state") || "/dashboard";

      if (missingWeight === "true") {
        localStorage.setItem("pendingWeight", "true");
        setShowWeightModal(true);
      }

      console.log("Redirecting to:", redirectPath);
      navigate(redirectPath);
    } else if (missingWeight === "true") {
      console.log("Missing weight detected, showing weight modal");
      localStorage.setItem("pendingWeight", "true");
      setShowWeightModal(true);
      navigate("/dashboard");
    } else {
      const errorMessage = errorParam || "No authentication token received from Google. Check backend OAuth configuration.";
      console.error("OAuth callback error:", errorMessage);
      console.error("Full URL:", window.location.href);
      console.error("Search params:", location.search);
      setError(errorMessage);
    }
  }, [location, navigate, setRefetchCurrentUser, setShowWeightModal]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-white mb-4">Authentication Error</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-white text-lg">Completing Google authentication...</p>
      </div>
    </div>
  );
};

export default OauthCallback;
