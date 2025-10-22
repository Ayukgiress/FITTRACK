import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Pages/AuthContext";

const OauthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setRefetchCurrentUser, setShowWeightModal } = useAuth();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
   
    if (token) {
      localStorage.setItem("token", token); // ensure auth context can load current user
      setRefetchCurrentUser(prev => !prev);

      const redirectPath = searchParams.get("redirect") || searchParams.get("state") || "/dashboard";

      if (searchParams.get("missingWeight") === "true") {
        localStorage.setItem("pendingWeight", "true");
        setShowWeightModal(true);
      }

      navigate(redirectPath);
    } else {
      navigate("/login?error=auth_failed");
    }
  }, [location, navigate, setRefetchCurrentUser]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default OauthCallback;
