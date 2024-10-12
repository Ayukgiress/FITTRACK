import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserLoading, setCurrentUserLoading] = useState(true);
  const [refetchCurrentUser, setRefetchCurrentUser] = useState(false);

  const isAuthenticated = useMemo(() => {
    if (currentUserLoading || !currentUser) return false;

    if (currentUser && currentUser?._id) return true;

    return false;
  }, [currentUser, currentUserLoading])

  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  const fetchCurrentUser = async (token) => {
    try {
      const response = await fetch("http://localhost:5000/users/current-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch current user");
      const user = await response.json();

      setCurrentUser(user);
      console.log(user)
    } catch (error) {
      console.log(user);
      console.error("Error fetching current user:", error);
    }
  };

  useEffect(() => {
    setCurrentUserLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setCurrentUserLoading(false);
      return;
    }
  
    fetchCurrentUser(token)
      .finally(() => {
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
