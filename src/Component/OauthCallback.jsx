import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Pages/AuthContext";

const OauthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setRefetchCurrentUser, setShowWeightModal } = useAuth();
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);

  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get("token") || searchParams.get("accessToken");
      const refreshToken = searchParams.get("refreshToken");
      const errorParam = searchParams.get("error");
      const missingWeight = searchParams.get("missingWeight");

      const debugData = {
        token: !!token,
        tokenLength: token?.length,
        refreshToken: !!refreshToken,
        refreshTokenLength: refreshToken?.length,
        error: errorParam,
        missingWeight,
        search: location.search,
        fullUrl: window.location.href,
        pathname: location.pathname,
        timestamp: new Date().toISOString()
      };

      console.log("OAuth callback received:", debugData);
      setDebugInfo(debugData);

      if (token) {
        console.log("Token received, setting up authentication");
        try {
          localStorage.setItem("token", token);
          console.log("Token stored in localStorage");
        } catch (e) {
          console.error("Failed to store token:", e);
        }
        
        if (refreshToken) {
          try {
            localStorage.setItem("refreshToken", refreshToken);
            console.log("Refresh token stored in localStorage");
          } catch (e) {
            console.error("Failed to store refresh token:", e);
          }
        }
        
        console.log("Triggering current user refetch");
        setRefetchCurrentUser(prev => !prev);

        if (missingWeight === "true") {
          console.log("Setting pending weight flag");
          localStorage.setItem("pendingWeight", "true");
          setShowWeightModal(true);
          navigate("/dashboard");
        } else {
          const redirectPath = searchParams.get("redirect") || searchParams.get("state") || "/dashboard";
          console.log("Navigating to:", redirectPath);
          setTimeout(() => {
            navigate(redirectPath);
          }, 100);
        }
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
    } catch (err) {
      console.error("Unexpected error in OAuth callback:", err);
      setError("An unexpected error occurred during authentication. Please try again.");
    }
  }, [location.search, navigate, setShowWeightModal, setRefetchCurrentUser]);

  // Add timeout for cases where backend fails and no redirect happens
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!error) {
        console.error("OAuth callback timeout - no response from backend");
        console.error("Current localStorage token:", !!localStorage.getItem("token"));
        setError("Authentication timed out. The backend may be experiencing issues. Please try again later.");
      }
    }, 20000); // 20 seconds timeout

    return () => clearTimeout(timeout);
  }, [error]);

  // Force navigation if we're stuck on callback page
  useEffect(() => {
    const forceNavigate = setTimeout(() => {
      const token = localStorage.getItem("token");
      if (location.pathname === '/auth/callback' && !error && token) {
        console.log("Forcing navigation to dashboard from callback - token exists");
        navigate("/dashboard", { replace: true });
      }
    }, 5000); // 5 seconds

    return () => clearTimeout(forceNavigate);
  }, [location.pathname, navigate, error]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-white mb-4">Authentication Error</h2>
          <p className="text-gray-300 mb-6 text-sm">{error}</p>
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
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-white text-lg">Completing Google authentication...</p>
        <p className="text-gray-400 text-sm mt-2">Please wait, you'll be redirected shortly</p>
      </div>
    </div>
  );
};

export default OauthCallback;
