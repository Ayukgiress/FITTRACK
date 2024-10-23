import React, { useState, useEffect } from "react";
import Workout from "./Workout";
import WeeklyChart from "./WeeklyChart";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useFitness } from './PlanContext';
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FaWalking } from "react-icons/fa";
import { RiMapPinLine } from "react-icons/ri";

ChartJS.register(ArcElement, Tooltip, Legend);

const Activity = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workoutLog, setWorkoutLog] = useState([]);
  const [weeklyCaloriesBurned, setWeeklyCaloriesBurned] = useState(Array(7).fill(0));
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [dailyStepGoal, setDailyStepGoal] = useState(10000); // Default goal
  const [weeklyDistanceGoal, setWeeklyDistanceGoal] = useState(20); // Default goal
  const [isLoading, setIsLoading] = useState(true);

  const { currentUser } = useAuth();
  const { dailyStepCount, weeklyRunningDistance, loading } = useFitness();

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!currentUser) return;
      setIsLoading(true);
      try {
        await Promise.all([fetchWorkoutLog(), fetchGoals()]);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        toast.error("Error loading dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [currentUser]);

  const fetchWorkoutLog = async () => {
    if (!currentUser) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const response = await fetch(`http://localhost:5000/workouts/${currentUser._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setWorkoutLog(data);
        calculateWeeklyCalories(data);
      } else {
        throw new Error("Invalid data format received");
      }
    } catch (error) {
      console.error("Error fetching workout log:", error);
      toast.error("Failed to load workout data");
      setWorkoutLog([]);
      setWeeklyCaloriesBurned(Array(7).fill(0));
    }
  };

  const fetchGoals = async () => {
    try {
      const dailySteps = await getDailyStepGoal();
      const weeklyDistance = await getWeeklyDistanceGoal();
      setDailyStepGoal(dailySteps);
      setWeeklyDistanceGoal(weeklyDistance);
    } catch (error) {
      console.error("Error fetching goals:", error);
      toast.error("Failed to load goals");
    }
  };

  const handleLogSubmit = async (workoutData) => {
    if (!currentUser) {
      toast.error("Please log in to track workouts");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const response = await fetch(`http://localhost:5000/workouts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...workoutData,
          userId: currentUser._id,
          date: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Failed to log workout");

      const newWorkout = await response.json();
      setWorkoutLog(prevLog => {
        const updatedLog = [...prevLog, newWorkout];
        calculateWeeklyCalories(updatedLog);
        return updatedLog;
      });

      toast.success("Workout added successfully!");
    } catch (error) {
      console.error("Error logging workout:", error);
      toast.error("Failed to log workout");
    } finally {
      setIsModalOpen(false);
    }
  };

  const calculateWeeklyCalories = (data) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const calories = Array(7).fill(0);
    data.forEach(entry => {
      const entryDate = new Date(entry.date);
      if (entryDate >= startOfWeek && entryDate <= today) {
        const dayIndex = entryDate.getDay();
        const caloriesNum = parseFloat(entry.calories);
        if (!isNaN(caloriesNum)) {
          calories[dayIndex] += caloriesNum;
        }
      }
    });
    setWeeklyCaloriesBurned(calories);
  };

  const prepareChartData = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysWorkouts = workoutLog.filter(workout => {
      const workoutDate = new Date(workout.date);
      workoutDate.setHours(0, 0, 0, 0);
      return workoutDate.getTime() === today.getTime();
    });

    const workoutTypes = {};
    todaysWorkouts.forEach(workout => {
      const type = workout.type || 'Other';
      const duration = parseFloat(workout.duration) || 0;
      workoutTypes[type] = (workoutTypes[type] || 0) + duration;
    });

    return {
      labels: Object.keys(workoutTypes),
      datasets: [{
        data: Object.values(workoutTypes),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      }],
    };
  };

  const todaySteps = dailyStepCount.reduce((acc, item) => {
    const date = new Date(item.date).toDateString();
    if (date === new Date().toDateString()) {
      return acc + item.steps;
    }
    return acc;
  }, 0);

  const totalWeeklyDistance = weeklyRunningDistance.reduce((acc, item) => acc + item.distance, 0);
  
  const dailyStepsProgress = (todaySteps / dailyStepGoal) * 100;
  const weeklyDistanceProgress = (totalWeeklyDistance / weeklyDistanceGoal) * 100;

  if (isLoading || loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col p-4">
      <div className="flex justify-end mb-4">
        <button
          className="bg-black border-2 border-red-700 text-white rounded p-2"
          onClick={() => {
            setIsModalOpen(true);
            setEditingWorkout(null);
          }}
        >
          Add Workout
        </button>
        <Workout
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingWorkout(null);
          }}
          onSubmit={handleLogSubmit}
          workoutToEdit={editingWorkout}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div className="bg-neutral-800 rounded-md flex items-center justify-center flex-col h-72">
          <h3 className='text-white text-2xl'>Weekly Kcal Burned</h3>
          <p className='text-white flex flex-col text-center gap-4 font-bold text-xl border-t-4 border-l-4 border-yellow-500 w-44 h-44 justify-center items-center rounded-full'>
            <AiOutlineThunderbolt className="text-yellow-500 w-7 h-10" />
            {weeklyCaloriesBurned.reduce((a, b) => a + b, 0).toFixed(2)} <br />
            kcal
          </p>
        </div>
        <div className="bg-neutral-800 rounded-md flex items-center justify-center flex-col h-72">
          <h3 className='text-white text-2xl'>Daily Steps Count</h3>
          <p className='text-white flex flex-col gap-4 text-center font-bold text-xl border-t-4 border-l-4 border-green-500 w-44 h-44 justify-center items-center rounded-full'>
            <FaWalking className="text-green-500 w-8 h-10"/>
            {todaySteps} <br />steps
          </p>
        </div>
        <div className="bg-neutral-800 rounded-md flex items-center justify-center flex-col h-72">
          <h3 className='text-white text-2xl'>Weekly Running Distance</h3>
          <p className='text-white flex flex-col text-center gap-4 font-bold text-xl border-t-4 border-l-4 border-blue-500 w-44 h-44 justify-center items-center rounded-full'>
            <RiMapPinLine className="text-blue-500 w-7 h-10"/>
            {totalWeeklyDistance} <br /> km
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="bg-neutral-900 flex-1 w-full md:w-[60%] h-[450px] rounded-md mt-4">
          <WeeklyChart weeklyWorkoutData={weeklyCaloriesBurned} />
        </div>

        <div className="bg-neutral-900 flex-1 w-full md:w-[35%] rounded-md p-4 mt-4 flex flex-col items-center justify-center" style={{ height: '450px' }}>
          <h2 className="text-white text-xl mb-2 text-center">Today's Workout</h2>
          <div className="relative w-full item-center justify-center flex" style={{ height: '100%' }}>
            <Pie
              data={prepareChartData()}
              options={{
                maintainAspectRatio: true,
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                    position: 'top',
                  },
                },
              }}
            />
            {workoutLog.length === 0 && (
              <p className="text-white text-sm mt-4">No workouts logged for today.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
