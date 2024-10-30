import React from 'react';
import MonthlyCaloriesChart from '../Component/Goals';
import { useAuth } from './AuthContext'; // Assuming you need auth context to get the user

const MonthlyActivity = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [workoutLog, setWorkoutLog] = React.useState([]);

  React.useEffect(() => {
    const fetchWorkoutLog = async () => {
      if (!currentUser?._id || !isAuthenticated) return;

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/workouts/${currentUser._id}`, {
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
      <MonthlyCaloriesChart workoutLog={workoutLog} />
    </div>
  );
};

export default MonthlyActivity;
