import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';
import { API_URL } from '../../constants';

const PlanContext = createContext();

export const useFitness = () => {
  return useContext(PlanContext);
};

export const FitnessProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [dailyStepCount, setDailyStepCount] = useState([]);
  const [weeklyRunningDistance, setWeeklyRunningDistance] = useState([]);
  const [weeklyStepTarget, setWeeklyStepTarget] = useState(0);
  const [weeklyDistanceTarget, setWeeklyDistanceTarget] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!currentUser || !currentUser._id) {
      console.error("No current user provided");
      return;
    }
    
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const stepsResponse = await axios.get(`${API_URL}/plan/daily-steps`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const distanceResponse = await axios.get(`${API_URL}/plan/weekly-distance`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDailyStepCount(stepsResponse.data);
      setWeeklyRunningDistance(distanceResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const setTargets = async (stepsTarget, distanceTarget) => {
    setWeeklyStepTarget(stepsTarget);
    setWeeklyDistanceTarget(distanceTarget);
    toast.success("Targets set successfully!");
  };

  const addDailySteps = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/plan/daily-steps`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchData(); // Fetch the updated data
      toast.success("Daily steps added successfully!");
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unknown error occurred";
      toast.error(errorMessage);
      console.error("Error adding daily steps:", errorMessage);
      throw new Error(errorMessage);
    }
  };

  const addWeeklyDistance = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/plan/weekly-distance`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchData();
      toast.success("Weekly distance added successfully!");
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error adding weekly distance";
      toast.error(errorMessage);
      console.error("Error adding weekly distance:", errorMessage);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  return (
    <PlanContext.Provider value={{
      dailyStepCount,
      weeklyRunningDistance,
      loading,
      weeklyStepTarget,
      weeklyDistanceTarget,
      addDailySteps,
      addWeeklyDistance,
      setTargets,
    }}>
      {children}
    </PlanContext.Provider>
  );
};
