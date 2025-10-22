import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { API_URL } from "../../constants";
import WeightModal from "../Component/WeightModal";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserLoading, setCurrentUserLoading] = useState(true);
  const [refetchCurrentUser, setRefetchCurrentUser] = useState(false);
  const [showWeightModal, setShowWeightModal] = useState(false);

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
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // If token is invalid, clear it and don't set user
        if (response.status === 401) {
          localStorage.removeItem("token");
          setCurrentUser(null);
          return;
        }
        throw new Error("Failed to fetch current user");
      }

      const user = await response.json();
      setCurrentUser(user);

      // Prompt for weight if missing after any auth flow
      if (!user.weight || localStorage.getItem("pendingWeight")) {
        setShowWeightModal(true);
        if (!localStorage.getItem("pendingWeight")) {
          localStorage.setItem("pendingWeight", "true");
        }
      } else {
        setShowWeightModal(false);
        localStorage.removeItem("pendingWeight");
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
      // Clear invalid token on error
      localStorage.removeItem("token");
      setCurrentUser(null);
    }
  };


  useEffect(() => {
    setCurrentUserLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      setCurrentUserLoading(false);
      setShowWeightModal(false);
      return;
    }
  
    fetchCurrentUser(token).finally(() => {
      setCurrentUserLoading(false);
    });
  }, [refetchCurrentUser]);

  const handleWeightComplete = () => {
    setShowWeightModal(false);
    setRefetchCurrentUser(prev => !prev);
  };

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
        setShowWeightModal,
      }}
    >
      {children}
      <WeightModal
        isOpen={showWeightModal}
        onClose={() => setShowWeightModal(false)}
        onSubmit={handleWeightComplete}
      />
    </AuthContext.Provider>
  );
};

