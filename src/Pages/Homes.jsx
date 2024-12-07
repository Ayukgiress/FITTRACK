import React, { useEffect, useState } from 'react';  
import MonthlyStepChart from '../Component/MonthlyStepChart';  
import { useAuth } from './AuthContext'; 
import { API_URL } from '../../constants';

const MonthlyActivity = () => {  
  const { currentUser, isAuthenticated } = useAuth();  
  const [workoutLog, setWorkoutLog] = useState([]);  

  useEffect(() => {  
    const fetchWorkoutLog = async () => {  
      if (!currentUser?._id || !isAuthenticated) return;  
      try {  
        const token = localStorage.getItem("token");  
        const response = await fetch(`${API_URL}/workouts/${currentUser._id}`, {  
          method: 'GET',  
          headers: {  
            'Authorization': `Bearer ${token}`,  
            'Content-Type': 'application/json',  
          },  
        });  
        if (!response.ok) throw new Error("Failed to fetch workout log");  
        const data = await response.json();  
        if (Array.isArray(data)) {  
          setWorkoutLog(data);  
        }  
      } catch (error) {  
        console.error("Error fetching workout log:", error);  
      }  
    };  

    fetchWorkoutLog();  
  }, [currentUser, isAuthenticated]);  

  if (!isAuthenticated) {  
    return <p>Please log in to view your monthly workouts.</p>;  
  }  

  return (  
    <div className="flex flex-col p-4">  
      <h2 className="text-white text-xl mb-4 text-center">Monthly Calories Burned</h2>  
      <MonthlyStepChart workoutLog={workoutLog} />  
    </div>  
  );  
};  

export default MonthlyActivity;