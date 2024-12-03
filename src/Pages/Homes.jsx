import React from "react";
import MonthlyCaloriesChart from '../Component/Goals'; // Assuming this component is used to display the chart
import { useAuth } from './AuthContext';
import { API_URL } from "../../constants";

const MonthlyActivity = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [workoutLog, setWorkoutLog] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchWorkoutLog = async () => {
      if (!currentUser?._id || !isAuthenticated) return;

      try {
        setLoading(true);
        setError(null); // Reset error state on each fetch attempt

        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/workouts/${currentUser._id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
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
        setError("Failed to fetch workout data.");
      } finally {
        setLoading(false);
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

      // Ensure calories is a valid number before adding
      const calories = parseFloat(workout.calories);
      if (!isNaN(calories)) {
        aggregated[monthYear].totalCalories += calories;
      }
    });

    return Object.values(aggregated); // Return as an array
  };

  // If the user is not authenticated
  if (!isAuthenticated) {
    return (
      <div className="text-center text-white">
        <p>Please log in to view your monthly workouts.</p>
      </div>
    );
  }

  // Show loading spinner or error message if fetching data
  if (loading) {
    return (
      <div className="text-center text-white">
        <p>Loading your workout data...</p>
      </div>
    );
  }

  // Show error message if fetching fails
  if (error) {
    return (
      <div className="text-center text-white">
        <p>{error}</p>
      </div>
    );
  }

  if (workoutLog.length === 0) {
    return (
      <div className="text-center text-white">
        <p>No workouts recorded for this month.</p>
      </div>
    );
  }

  return (
    <div className="3xl:h-[45rem] 3xl:w-[110rem] flex flex-col sm:w-[20rem] p-6 bg-neutral-900 rounded-lg shadow-lg w-full h-[30rem] md:w-[80rem]">
      <h2 className="text-white text-xl text-center mb-4">Monthly Calories Burned</h2>
      <MonthlyCaloriesChart workoutLog={workoutLog} />
    </div>
  );
};

export default MonthlyActivity;
