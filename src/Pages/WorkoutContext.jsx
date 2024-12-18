import React, { createContext, useState, useContext, useEffect } from 'react';
import { API_URL } from '../../constants';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';
import { getDurationFromEndTimeAndStartTime } from '../utils/utils';

const calorieRates = {
  running: 10,
  cycling: 8,
  swimming: 7,
  yoga: 3,
  weightlifting: 6,
};

const WorkoutContext = createContext();

export const useWorkout = () => {
  return useContext(WorkoutContext);
};

export const WorkoutProvider = ({ children }) => {
  const [workoutLog, setWorkoutLog] = useState([]);
  const { currentUser, currentUserLoading, isAuthenticated } = useAuth();

  // Fetch workouts on component mount
  useEffect(() => {
    const fetchWorkoutLog = async () => {
      if (currentUserLoading || !isAuthenticated) {
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(`${API_URL}/workouts/${currentUser._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setWorkoutLog(data);
        } else {
          console.error('Error fetching workout log');
        }
      } catch (error) {
        console.error('Error fetching workout log:', error);
      }
    };

    fetchWorkoutLog();
  }, [currentUser, currentUserLoading, isAuthenticated]); // Re-run effect when the dependencies change

  // Function to calculate calories based on exercise type and duration
  const calculateCalories = (exercise, startTime, endTime) => {
    if (!startTime || !endTime || !exercise) return 0;
    const duration = getDurationFromEndTimeAndStartTime(endTime, startTime);
    return (calorieRates[exercise.toLowerCase()] || 0) * duration;
  };

  // Add a new workout to the log
  const addWorkout = async (newWorkout) => {
    try {
      console.log('newWorkout:', newWorkout); // Log the newWorkout object to inspect its structure
  
      // Check if the required fields are present
      if (!newWorkout.startTime || !newWorkout.endTime || !newWorkout.exercise || !newWorkout.date) {
        throw new Error("Missing required fields: startTime, endTime, exercise, or date.");
      }
  
      const token = localStorage.getItem("token");
      const calculatedCalories = calculateCalories(newWorkout.exercise, newWorkout.startTime, newWorkout.endTime);
  
      // Include all the required fields
      const workoutData = {
        ...newWorkout,
        calories: calculatedCalories,
      };
  
      const response = await fetch(`${API_URL}/workouts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workoutData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add workout');
      }
  
      const addedWorkout = await response.json();
      setWorkoutLog((prevLog) => [...prevLog, addedWorkout]);
      return addedWorkout;
    } catch (error) {
      console.error('Error adding workout:', error);
      toast.error(error.message || 'Failed to add workout');
      throw error;
    }
  };
  

  // Update an existing workout
  const updateWorkout = async (workoutId, updatedWorkout) => {
    try {
      const token = localStorage.getItem("token");
      const calculatedCalories = calculateCalories(updatedWorkout.exercise, updatedWorkout.startTime, updatedWorkout.endTime);
      const workoutData = { ...updatedWorkout, calories: calculatedCalories };

      const response = await fetch(`${API_URL}/workouts/${workoutId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workoutData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update workout');
      }

      const returnedWorkout = await response.json();

      setWorkoutLog((prevLog) =>
        prevLog.map((workout) =>
          workout._id === workoutId ? returnedWorkout : workout
        )
      );
        toast.success('WORKOUT UPDATED SUCCESSFULLY')
      return returnedWorkout;
    } catch (error) {
      console.error('Error updating workout:', error);
      toast.error(error.message || 'Failed to update workout');
      throw error;
    }
  };

  // Delete a workout
  const deleteWorkout = async (workoutId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/workouts/${workoutId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete workout');
      }
    toast.success("workout deleted")
      setWorkoutLog((prevLog) =>
        prevLog.filter((workout) => workout._id !== workoutId)
      );
    } catch (error) {
      console.error('Error deleting workout:', error);
      toast.error(error.message || 'Failed to delete workout');
      throw error;
    }
  };

  return (
    <WorkoutContext.Provider
      value={{
        workoutLog,
        addWorkout,
        updateWorkout,
        deleteWorkout,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
