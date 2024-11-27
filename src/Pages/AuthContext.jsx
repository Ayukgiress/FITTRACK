import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { API_URL } from "../../constants";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserLoading, setCurrentUserLoading] = useState(true);
  const [refetchCurrentUser, setRefetchCurrentUser] = useState(false);

  const isAuthenticated = useMemo(() => {
    return !currentUserLoading && !!currentUser?._id;
  }, [currentUser, currentUserLoading]);

  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  const fetchCurrentUser = async (token) => {
    try {
      const response = await fetch(`${API_URL}/users/current-user`, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });
  
      if (!response.ok) throw new Error("Failed to fetch current user");
      const user = await response.json();
      setCurrentUser(user);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };
  

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      const response = await fetch(`${API_URL}/users/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) throw new Error("Failed to refresh token");

      const { accessToken } = await response.json();
      localStorage.setItem("token", accessToken);
      return accessToken;
    } catch (error) {
      console.error("Token refresh error:", error);
      logout();
      return null;
    }
  };

  useEffect(() => {
    setCurrentUserLoading(true);
    const token = localStorage.getItem("token");
  
    if (!token) {
      setCurrentUserLoading(false);
      return;
    }
  
    fetchCurrentUser(token).finally(() => {
      setCurrentUserLoading(false);
    });
  }, [refetchCurrentUser]);
  

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        logout,
        currentUser,
        setCurrentUser,
        currentUserLoading,
        setCurrentUserLoading,
        setRefetchCurrentUser,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

