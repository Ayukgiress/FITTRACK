import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const PlanContext = createContext();

export const useFitness = () => {
  return useContext(PlanContext);
};

export const FitnessProvider = ({ children }) => {
  const [dailyStepCount, setDailyStepCount] = useState([]);
  const [weeklyRunningDistance, setWeeklyRunningDistance] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const stepsResponse = await axios.get('http://localhost:5000/plan/daily-steps');
      const distanceResponse = await axios.get('http://localhost:5000/plan/weekly-distance');
      setDailyStepCount(stepsResponse.data);
      setWeeklyRunningDistance(distanceResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const addDailySteps = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/plan/daily-steps', data);
      fetchData();
      toast.success("daily steps added succcessfully!")
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unknown error occurred";
      toast.error("error adding steps")
      console.error("Error adding daily steps:", errorMessage);
      throw new Error(errorMessage);
    }
  };
  

  const addWeeklyDistance = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/plan/weekly-distance', data);
      fetchData();
      toast.success("weekly distance added successfully")
      return response.data;
    } catch (error) {
      toast.error("error adding weekly distance")
      console.error("Error adding weekly distance:", error.response?.data || error.message);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PlanContext.Provider value={{ dailyStepCount, weeklyRunningDistance, addDailySteps, addWeeklyDistance, loading }}>
      {children}
    </PlanContext.Provider>
  );
};
