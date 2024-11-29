import React from "react";
import MonthlyCaloriesChart from '../Component/Goals';
import { useAuth } from './AuthContext';
import { API_URL } from "../../constants";

const MonthlyActivity = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [workoutLog, setWorkoutLog] = React.useState([]);

  React.useEffect(() => {
    const fetchWorkoutLog = async () => {
      if (!currentUser?._id || !isAuthenticated) return;
    
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/workouts/${currentUser._id}?t=${new Date().getTime()}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          console.error(`Error: ${response.status} - ${response.statusText}`);
          throw new Error("Failed to fetch workout log");
        }
    
        const data = await response.json();
        console.log("Received workout data:", data); 
    
        if (Array.isArray(data)) {
          const aggregatedData = aggregateWorkoutsByMonth(data);
          console.log("Aggregated workout data:", aggregatedData); 
          setWorkoutLog(aggregatedData);
        }
      } catch (error) {
        console.error("Error fetching workout log:", error);
      }
    };
    

    fetchWorkoutLog();
  }, [currentUser, isAuthenticated]);

  const aggregateWorkoutsByMonth = (data) => {
    const aggregated = {};
  
    data.forEach((workout) => {
      const date = new Date(workout.date); 
      const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`; 
  
      if (!aggregated[monthYear]) {
        aggregated[monthYear] = {
          month: monthYear,
          totalCalories: 0,  
        };
      }
  
      aggregated[monthYear].totalCalories += workout.calories; 
    });
  
    
    const aggregatedData = Object.values(aggregated);
    console.log("Aggregated workout data (as array):", aggregatedData); 
    return aggregatedData;
  };
  
  

  if (!isAuthenticated) {
    return (
      <div className="text-center text-white">
        <p>Please log in to view your monthly workouts.</p>
      </div>
    );
  }

  return (
    <div className="3xl:h-[45rem] 3xl:w-[110rem] flex flex-col sm:w-[20rem] p-6 bg-neutral-900 rounded-lg shadow-lg w-full h-[30rem] md:w-[80rem] md:w-[80rem]">
      <h2 className="text-white text-xl text-center">Monthly Calories Burned</h2>
      <MonthlyCaloriesChart workoutLog={workoutLog} />
    </div>
  );
};

export default MonthlyActivity;
