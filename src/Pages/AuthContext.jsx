import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { API_URL } from "../../constants";
import jwt_decode from "jwt-decode";
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

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  }, []);

  const fetchCurrentUser = useCallback(async (token) => {
    try {
      const response = await fetch(`${API_URL}/users/current-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch current user");

      const user = await response.json();
      setCurrentUser(user);
    } catch (error) {
      console.error("Error fetching current user:", error);
      logout(); 
    }
  }, [logout]);

  const checkTokenExpiration = useCallback((token) => {
    try {
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000; 

      if (decoded.exp < currentTime) {
        logout();
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  }, [logout]);

  useEffect(() => {
    setCurrentUserLoading(true);
    const token = localStorage.getItem("token");

    if (!token || !checkTokenExpiration(token)) {
      setCurrentUserLoading(false);
      return;
    }

    fetchCurrentUser(token).finally(() => {
      setCurrentUserLoading(false);
    });
  }, [fetchCurrentUser, checkTokenExpiration, refetchCurrentUser]);

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
