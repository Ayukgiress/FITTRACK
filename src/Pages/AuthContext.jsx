import React, { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "../../constants";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserLoading, setCurrentUserLoading] = useState(true);
  const [refetchCurrentUser, setRefetchCurrentUser] = useState(false);

  const isAuthenticated = currentUser && !currentUserLoading;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setCurrentUser(null);
  };

  const fetchCurrentUser = async (token) => {
    try {
      console.log('Fetching Current User with Token:', token);
      const response = await fetch(`${API_URL}/users/current-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('Fetch Current User Response Status:', response.status);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Fetch Current User Error Response:', errorText);
        throw new Error(`Failed to fetch current user: ${errorText}`);
      }
  
      const user = await response.json();
      console.log('Fetched User:', user);
      setCurrentUser(user);
    } catch (error) {
      console.error("Comprehensive Error fetching current user:", error);
      logout();
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
