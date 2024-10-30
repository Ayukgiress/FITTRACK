import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FaWalking } from "react-icons/fa";
import { RiMapPinLine } from "react-icons/ri";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { useAuth } from "./AuthContext";
import { useFitness } from './PlanContext';
import Workout from "./Workout";
import { getDurationFromEndTimeAndStartTime } from "../utils/utils";

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Colors,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const prepareChartData = (workoutLog) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  console.log("Workout Log:", workoutLog); 

  const todaysWorkouts = workoutLog.filter(workout => {
    const workoutDate = new Date(workout.date);
    workoutDate.setHours(0, 0, 0, 0);
    return workoutDate.getTime() === today.getTime();
  });

  console.log("Today's Workouts:", todaysWorkouts);

  const workoutTypes = todaysWorkouts.reduce((acc, workout) => {
    const type = workout.exercise || 'Other';
    const duration = getDurationFromEndTimeAndStartTime(workout.endTime, workout.startTime);
    acc[type] = (acc[type] || 0) + duration;
    return acc;
  }, {});

  console.log("Workout Types Data:", workoutTypes); 

  const chartData = {
    labels: Object.keys(workoutTypes),
    datasets: [{
      label: "Bar chart exercises",
      data: Object.values(workoutTypes),
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
      ].slice(0, Object.keys(workoutTypes).length),
      borderColor: 'rgba(255, 255, 255, 1)',
      borderWidth: 2,
    }]
  };

  console.log("Chart Data:", chartData);

  return chartData;
};

const TodaysWorkoutChart = ({ workoutLog }) => {  
  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
          font: {
            size: 12,
          },
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value} minutes`;
          },
        },
      },
    },
  };

  const chartData = prepareChartData(workoutLog);

  return (
    <div className="h-[370px]">
      {chartData.labels.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-white text-sm">No workouts logged for today.</p>
        </div>
      ) : (
        <Pie data={chartData} options={chartOptions} />
      )}
    </div>
  );
};
0
const WeeklyChart = ({ weeklyWorkoutData }) => {
  const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Calories Burned',
        data: weeklyWorkoutData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
  };

  return (
    <div className="h-full p-4">
      <Bar data={data} options={options} />
    </div>
  );
};

const Activity = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workoutLog, setWorkoutLog] = useState([]);
  const [weeklyCaloriesBurned, setWeeklyCaloriesBurned] = useState(Array(7).fill(0));
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { currentUser, currentUserLoading, isAuthenticated } = useAuth();
  const { dailyStepCount, weeklyRunningDistance, loading } = useFitness();

  useEffect(() => {
    if (currentUserLoading) {
      return;
    }

    if (isAuthenticated && currentUser?._id) {
      const fetchInitialData = async () => {
        setIsLoading(true);
        try {
          await fetchWorkoutLog();
        } catch (error) {
          console.error("Error fetching initial data:", error);
          toast.error("Error loading dashboard data");
        } finally {
          setIsLoading(false);
        }
      };

      fetchInitialData();
    } else {
      setIsLoading(false);
    }
  }, [currentUser, currentUserLoading, isAuthenticated]);

  const fetchWorkoutLog = async () => {
    if (!currentUser?._id || !isAuthenticated) {
      console.log("No authenticated user found");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`http://localhost:5000/workouts/${currentUser._id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

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

  if (currentUserLoading || isLoading || loading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <p>Please log in to view your workouts</p>;
  }

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
            <FaWalking className="text-green-500 w-8 h-10" />
            {dailyStepCount.reduce((acc, item) => {
              const date = new Date(item.date).toDateString();
              if (date === new Date().toDateString()) {
                return acc + item.steps;
              }
              return acc;
            }, 0)} <br />steps
          </p>
        </div>
        <div className="bg-neutral-800 rounded-md flex items-center justify-center flex-col h-72">
          <h3 className='text-white text-2xl'>Weekly Running Distance</h3>
          <p className='text-white flex flex-col text-center gap-4 font-bold text-xl border-t-4 border-l-4 border-blue-500 w-44 h-44 justify-center items-center rounded-full'>
            <RiMapPinLine className="text-blue-500 w-7 h-10" />
            {weeklyRunningDistance.reduce((acc, item) => acc + item.distance, 0)} <br /> km
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="bg-neutral-900 flex-1 w-full md:w-[60%] h-[450px] rounded-md">
          <WeeklyChart weeklyWorkoutData={weeklyCaloriesBurned} />
        </div>

        <div className="bg-neutral-900 flex-1 w-full md:w-[35%] h-[450px] rounded-md p-4">
          <h2 className="text-white text-xl mb-4 text-center">Today's Workouts</h2>
          <div className="h-[400px]">
            <TodaysWorkoutChart workoutLog={workoutLog} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;