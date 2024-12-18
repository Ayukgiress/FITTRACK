import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';
import { API_URL } from '../../constants';

const PlanContext = createContext();

export const useFitness = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};

export const FitnessProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [dailyStepCount, setDailyStepCount] = useState([]);
  const [weeklyRunningDistance, setWeeklyRunningDistance] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const [stepsResponse, distanceResponse] = await Promise.all([
        axios.get(`${API_URL}/plan/daily-steps`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API_URL}/plan/weekly-distance`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ]);

      setDailyStepCount(stepsResponse.data);
      setWeeklyRunningDistance(distanceResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(error.response?.data?.message || "Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addDailySteps = async (data) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.post(`${API_URL}/plan/daily-steps`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      await fetchData();  // Refresh data after adding
      toast.success("Daily steps added successfully!");
      return response.data;
    } catch (error) {
      console.error('Error adding daily steps:', error); 
      const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const addWeeklyDistance = async (data) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.post(`${API_URL}/plan/weekly-distance`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      await fetchData();  // Refresh data after adding
      toast.success("Weekly distance added successfully!");
      return response.data;
    } catch (error) {
      console.error('Error adding weekly distance:', error);
      const errorMessage = error.response?.data?.message || error.message || "Error adding weekly distance";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  return (
    <PlanContext.Provider value={{
      dailyStepCount,
      weeklyRunningDistance,
      loading,
      addDailySteps,
      addWeeklyDistance,
    }}>
      {children}
    </PlanContext.Provider>
  );
};
