import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';
import { API_URL } from '../../constants';
import { getIsoWeekNumber } from '../utils/utils';

const PlanContext = createContext();

export const useFitness = () => {
  return useContext(PlanContext);
};

export const FitnessProvider = ({ children }) => {
  const { currentUser } = useAuth() || {};
  const [dailyStepCount, setDailyStepCount] = useState([]);
  const [weeklyRunningDistance, setWeeklyRunningDistance] = useState([]);
  const [weeklyStepTarget, setWeeklyStepTarget] = useState(0);
  const [weeklyDistanceTarget, setWeeklyDistanceTarget] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!currentUser || !currentUser._id) {
      console.log("No current user provided, skipping data fetch");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No auth token found");
        setLoading(false);
        return;
      }

      const [stepsResponse, distanceResponse, goalsResponse] = await Promise.allSettled([
        axios.get(`${API_URL}/plan/daily-steps`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_URL}/plan/daily-distance`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_URL}/goals/`, { headers: { Authorization: `Bearer ${token}` } })
      ]);

      if (stepsResponse.status === 'fulfilled') {
        setDailyStepCount(stepsResponse.value.data);
      } else {
        console.warn("Failed to fetch daily steps:", stepsResponse.reason);
        setDailyStepCount([]);
      }

      if (distanceResponse.status === 'fulfilled') {
        setWeeklyRunningDistance(distanceResponse.value.data);
      } else {
        console.warn("Failed to fetch weekly distance:", distanceResponse.reason);
        setWeeklyRunningDistance([]);
      }

      if (goalsResponse.status === 'fulfilled' && goalsResponse.value.data) {
        const weeklyDistanceGoal = goalsResponse.value.data.find(goal => goal.type === 'weeklyDistance');
        const dailyStepsGoal = goalsResponse.value.data.find(goal => goal.type === 'dailySteps');
        setWeeklyDistanceTarget(weeklyDistanceGoal ? weeklyDistanceGoal.value : 0);
        setWeeklyStepTarget(dailyStepsGoal ? dailyStepsGoal.value : 0);
      } else {
        console.warn("Failed to fetch goals:", goalsResponse.reason);
        setWeeklyDistanceTarget(0);
        setWeeklyStepTarget(0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const setTargets = async (stepsTarget = null, distanceTarget = null) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/plan/goals`, {
        weeklyStepTarget: stepsTarget,
        weeklyDistanceTarget: distanceTarget,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (stepsTarget !== null) setWeeklyStepTarget(stepsTarget);
      if (distanceTarget !== null) setWeeklyDistanceTarget(distanceTarget);
      toast.success("Targets set successfully!");
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error setting targets";
      toast.error(errorMessage);
      console.error("Error setting targets:", errorMessage);
      throw error;
    }
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
      const response = await axios.post(`${API_URL}/plan/weekly-distance-goal`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWeeklyDistanceTarget(data.distance);
      toast.success("Weekly distance goal set successfully!");
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error setting weekly distance goal";
      toast.error(errorMessage);
      console.error("Error setting weekly distance goal:", errorMessage);
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

