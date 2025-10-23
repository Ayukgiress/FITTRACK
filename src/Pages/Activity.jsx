import React, { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FaWalking } from "react-icons/fa";
import { RiMapPinLine } from "react-icons/ri";
import { MdOutlineFastfood, MdOutlineFlag } from "react-icons/md";
import { BsFire } from "react-icons/bs";
import MealsCalculatorModal from "../Component/MealsCalculatorModal";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
} from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';
import { useAuth } from "./AuthContext";
import { useFitness } from './PlanContext';
import Workout from "./Workout";
import StepsModal from "../Component/StepsModal";
import DistanceModal from "../Component/DistanceModal";
import { API_URL } from "../../constants";
import { getDurationFromEndTimeAndStartTime } from "../utils/utils";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Colors,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title
);

const NUTRITION_TARGETS = {
  calories: 2200,
  protein: 150,
  carbs: 260,
  fats: 70,
};

const MEAL_LOG_PLACEHOLDER = [
  {
    name: "Power Breakfast",
    time: "7:30 AM",
    calories: 420,
    macros: { protein: 32, carbs: 48, fats: 12 },
  },
  {
    name: "Post-Workout Shake",
    time: "10:30 AM",
    calories: 280,
    macros: { protein: 30, carbs: 24, fats: 6 },
  },
  {
    name: "Refuel Lunch",
    time: "1:00 PM",
    calories: 610,
    macros: { protein: 38, carbs: 68, fats: 20 },
  },
  {
    name: "Recovery Dinner",
    time: "7:15 PM",
    calories: 520,
    macros: { protein: 36, carbs: 46, fats: 18 },
  },
  {
    name: "Evening Snack",
    time: "9:30 PM",
    calories: 190,
    macros: { protein: 18, carbs: 22, fats: 8 },
  },
];



const WEEKLY_STEP_TARGET = 70000;

const WEEKLY_CALORIES_TARGET = 3500;
const WEEKLY_ACTIVE_DAYS_TARGET = 5;
const DAILY_STEP_TARGET = Math.round(WEEKLY_STEP_TARGET / 7);

const GOAL_INSIGHTS_PLACEHOLDER = [
  {
    title: "Consistency is paying off",
    insight: "You have stayed active for four consecutive days — keep the streak alive!",
  },
  {
    title: "Hydration hero",
    insight: "Hydration levels are above 75% of your goal. Top up once more to hit 100%!",
  },
  {
    title: "Protein on point",
    insight: "You’re just a shake away from your protein target for the day.",
  },
];

const UPCOMING_GOALS_PLACEHOLDER = [
  {
    title: "Beat 10k steps",
    date: "Tomorrow",
    description: "Aim for a brisk 45-minute walk to push past your daily step record.",
  },
  {
    title: "Long run Saturday",
    date: "Saturday",
    description: "Plan for a 7 km endurance run with a negative split finish.",
  },
  {
    title: "Active recovery day",
    date: "Sunday",
    description: "Stretch session plus light yoga to reset before the new week.",
  },
];

const calculateProgressPercentage = (current = 0, target = 0) => {
  if (!target || target <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round((current / target) * 100)));
};

const prepareChartData = (workoutLog) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todaysWorkouts = workoutLog.filter(workout => {
    const workoutDate = new Date(workout.date);
    workoutDate.setHours(0, 0, 0, 0);
    return workoutDate.getTime() === today.getTime();
  });

  const workoutTypes = todaysWorkouts.reduce((acc, workout) => {
    const type = workout.exercise || 'Other';
    const duration = getDurationFromEndTimeAndStartTime(workout.endTime, workout.startTime);
    acc[type] = (acc[type] || 0) + duration;
    return acc;
  }, {});

  return {
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
          font: { size: 12 },
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
    <div className="h-full flex items-center justify-center">
      {chartData.labels.length === 0 ? (
        <p className="text-white text-sm">No workouts logged for today.</p>
      ) : (
        <Pie data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

const WeeklyChart = ({ weeklyWorkoutData }) => {
  const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const data = {
    labels,
    datasets: [{
      label: 'Calories Burned',
      data: weeklyWorkoutData,
      fill: true,
      backgroundColor: 'rgb(42,106,151)',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 5,
      tension: 0.4,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: 'white' },
      },
      x: {
        grid: { color: 'rgb(174,168,255)', lineWidth: 3 },
        ticks: { color: 'white' },
      },
    },
    plugins: {
      legend: { labels: { color: 'white' } },
    },
  };

  return (
    <div className="h-full p-4">
      <Line data={data} options={options} />
    </div>
  );
};

const Activity = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStepsModalOpen, setIsStepsModalOpen] = useState(false);
  const [isDistanceModalOpen, setIsDistanceModalOpen] = useState(false);
  const [isMealsCalculatorOpen, setIsMealsCalculatorOpen] = useState(false);
  const [todaysMeals, setTodaysMeals] = useState([]);
  const [workoutLog, setWorkoutLog] = useState([]);
  const [weeklyCaloriesBurned, setWeeklyCaloriesBurned] = useState(Array(7).fill(0));
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [weeklyDistanceGoals, setWeeklyDistanceGoals] = useState([]);

  const { currentUser, currentUserLoading, isAuthenticated } = useAuth();
  const { dailyStepCount, weeklyRunningDistance, loading, weeklyDistanceTarget } = useFitness();

  const todaysSteps = useMemo(() => {
    return dailyStepCount.reduce((acc, item) => {
      const date = new Date(item.date).toDateString();
      if (date === new Date().toDateString()) {
        return acc + item.steps;
      }
      return acc;
    }, 0);
  }, [dailyStepCount]);

  const totalWeeklyDistance = useMemo(() => {
    return weeklyRunningDistance.reduce((acc, item) => acc + (item.distance || 0), 0);
  }, [weeklyRunningDistance]);

  const todaysDistance = useMemo(() => {
    const today = new Date().toDateString();
    return weeklyRunningDistance.find(item => new Date(item.date).toDateString() === today)?.distance || 0;
  }, [weeklyRunningDistance]);



  const totalWeeklyCalories = useMemo(() => {
    return weeklyCaloriesBurned.reduce((acc, item) => acc + item, 0);
  }, [weeklyCaloriesBurned]);

  const nutritionTotals = useMemo(() => {
    // Only use actual today's meals, not placeholder data
    const todaysMealsTotal = todaysMeals.reduce(
      (acc, meal) => {
        acc.calories += meal.totalCalories;
        meal.items.forEach(item => {
          acc.protein += item.protein || 0;
          acc.carbs += item.carbs || 0;
          acc.fats += item.fats || 0;
        });
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );

    return todaysMealsTotal;
  }, [todaysMeals]);

  const nutritionProgress = useMemo(() => {
    return {
      calories: calculateProgressPercentage(nutritionTotals.calories, NUTRITION_TARGETS.calories),
      protein: calculateProgressPercentage(nutritionTotals.protein, NUTRITION_TARGETS.protein),
      carbs: calculateProgressPercentage(nutritionTotals.carbs, NUTRITION_TARGETS.carbs),
      fats: calculateProgressPercentage(nutritionTotals.fats, NUTRITION_TARGETS.fats),
    };
  }, [nutritionTotals]);

  const activeDaysThisWeek = useMemo(() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const activeDates = new Set();

    workoutLog.forEach((workout) => {
      const workoutDate = new Date(workout.date);
      if (workoutDate >= startOfWeek && workoutDate <= today) {
        const dateString = workoutDate.toDateString();
        activeDates.add(dateString);
      }
    });

    return activeDates.size;
  }, [workoutLog]);

  const weeklyGoalProgress = useMemo(() => {
    return {
      steps: calculateProgressPercentage(todaysSteps, WEEKLY_STEP_TARGET / 7),
      distance: calculateProgressPercentage(totalWeeklyDistance, weeklyDistanceTarget || 0),
      calories: calculateProgressPercentage(totalWeeklyCalories, WEEKLY_CALORIES_TARGET),
      activeDays: calculateProgressPercentage(activeDaysThisWeek, WEEKLY_ACTIVE_DAYS_TARGET),
    };
  }, [todaysSteps, totalWeeklyDistance, totalWeeklyCalories, activeDaysThisWeek, todaysDistance, weeklyDistanceTarget]);

  const {
    steps: stepsProgress,
    distance: distanceProgress,
    calories: caloriesGoalProgress,
    activeDays: activeDaysProgress,
  } = weeklyGoalProgress;

  const caloriesRemaining = Math.max(0, NUTRITION_TARGETS.calories - nutritionTotals.calories);

  const macroBreakdown = useMemo(() => (
    [
      {
        label: "Protein",
        consumed: nutritionTotals.protein,
        target: NUTRITION_TARGETS.protein,
        progress: nutritionProgress.protein,
        unit: "g",
      },
      {
        label: "Carbs",
        consumed: nutritionTotals.carbs,
        target: NUTRITION_TARGETS.carbs,
        progress: nutritionProgress.carbs,
        unit: "g",
      },
      {
        label: "Fats",
        consumed: nutritionTotals.fats,
        target: NUTRITION_TARGETS.fats,
        progress: nutritionProgress.fats,
        unit: "g",
      },
    ]
  ), [nutritionTotals, nutritionProgress]);

  const weeklyGoalDetails = useMemo(() => (
    [
      {
        title: "Daily Step Pace",
        description: `${todaysSteps.toLocaleString()} / ${DAILY_STEP_TARGET.toLocaleString()} steps`,
        progress: stepsProgress,
      },
      {
        title: "Distance Covered",
        description: `${totalWeeklyDistance.toFixed(1)} km / ${weeklyDistanceTarget || 0} km`,
        progress: distanceProgress,
      },
      {
        title: "Calories Burned",
        description: `${totalWeeklyCalories.toFixed(0)} kcal / ${WEEKLY_CALORIES_TARGET.toLocaleString()} kcal`,
        progress: caloriesGoalProgress,
      },
      {
        title: "Active Day Streak",
        description: `${activeDaysThisWeek} / ${WEEKLY_ACTIVE_DAYS_TARGET} days active`,
        progress: activeDaysProgress,
      },
    ]
  ), [todaysSteps, stepsProgress, totalWeeklyDistance, distanceProgress, totalWeeklyCalories, caloriesGoalProgress, activeDaysThisWeek, activeDaysProgress, todaysDistance, weeklyDistanceTarget]);

  useEffect(() => {
    if (currentUserLoading) return;

    if (isAuthenticated && currentUser?._id) {
      const fetchInitialData = async () => {
        setIsLoading(true);
        try {
          await fetchWorkoutLog();
          await fetchTodaysMeals();
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
    if (!currentUser?._id || !isAuthenticated) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const response = await fetch(`${API_URL}/workouts/${currentUser._id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
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

  const fetchTodaysMeals = async () => {
    if (!currentUser?._id || !isAuthenticated) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      let today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

      // Validate date - if it's in the future, use current date
      const todayDate = new Date(today);
      const now = new Date();
      if (todayDate > now) {
        console.warn("Calculated date is in the future, using current date:", today);
        today = now.toISOString().split('T')[0];
      }

      console.log("Fetching meals for date:", today);
      const response = await fetch(`${API_URL}/api/meals/${currentUser._id}/${today}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setTodaysMeals(data);
        }
      } else if (response.status === 404) {
        // No meals for today, set empty array
        setTodaysMeals([]);
      }
    } catch (error) {
      console.error("Error fetching today's meals:", error);
      setTodaysMeals([]);
    }
  };

  const handleMealSaved = (mealData) => {
    setTodaysMeals(prevMeals => [...prevMeals, mealData]);
    console.log('Meal saved and added to todays meals:', mealData);
  };

  const handleLogSubmit = async (workoutData) => {
    if (!currentUser) {
      toast.error("Please log in to track workouts");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const response = await fetch(`${API_URL}/workouts`, {
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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your activity data...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <p>Please log in to view your workouts</p>;
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome back, {currentUser?.username || 'Fitness Enthusiast'}! 💪
          </h1>
          <p className="text-xl text-blue-100 mb-6">
            Ready to crush your fitness goals today? Let's track your progress and stay motivated!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              onClick={() => {
                setIsModalOpen(true);
                setEditingWorkout(null);
              }}
            >
              <AiOutlineThunderbolt className="w-5 h-5 mr-2" />
              Start New Workout
            </button>
            <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300">
              View Progress
            </button>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white bg-opacity-10 rounded-full"></div>
      </div>

      {/* Quick Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white text-lg font-bold">Weekly Calories</h3>
              <p className="text-yellow-100 text-sm">Target: {WEEKLY_CALORIES_TARGET.toLocaleString()} kcal</p>
            </div>
            <BsFire className="text-white w-10 h-10 opacity-80" />
          </div>
          <p className="text-white text-4xl font-black">{totalWeeklyCalories.toFixed(0)} kcal</p>
          <div className="mt-3 bg-white bg-opacity-20 rounded-full h-2">
            <div className="bg-white h-2 rounded-full" style={{ width: `${caloriesGoalProgress}%` }}></div>
          </div>
          <p className="text-white text-xs mt-2 opacity-80">{caloriesGoalProgress}% of weekly goal</p>
        </div>

        <div className="bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white text-lg font-bold">Today's Steps</h3>
              <p className="text-green-100 text-sm">Target: {DAILY_STEP_TARGET.toLocaleString()} steps</p>
            </div>
            <FaWalking className="text-white w-10 h-10 opacity-80" />
          </div>
          <p className="text-white text-4xl font-black">{todaysSteps.toLocaleString()}</p>
          <div className="mt-3 bg-white bg-opacity-20 rounded-full h-2">
            <div className="bg-white h-2 rounded-full" style={{ width: `${stepsProgress}%` }}></div>
          </div>
          <p className="text-white text-xs mt-2 opacity-80">{stepsProgress}% of daily goal</p>
        </div>

        <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white text-lg font-bold">Weekly Distance Goal</h3>
              <p className="text-blue-100 text-sm">Achieved: {totalWeeklyDistance.toFixed(1)} km</p>
            </div>
            <RiMapPinLine className="text-white w-10 h-10 opacity-80" />
          </div>
          <p className="text-white text-4xl font-black">{weeklyDistanceTarget || 0} km</p>
          <div className="mt-3 bg-white bg-opacity-20 rounded-full h-2">
            <div className="bg-white h-2 rounded-full" style={{ width: `${distanceProgress}%` }}></div>
          </div>
          <p className="text-white text-xs mt-2 opacity-80">{distanceProgress}% of weekly goal</p>
          <p className="text-white text-xs mt-2 opacity-80">Today's: {todaysDistance.toFixed(1)} km</p>
        </div>

        <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white text-lg font-bold">Active Days</h3>
              <p className="text-purple-100 text-sm">Target: {WEEKLY_ACTIVE_DAYS_TARGET} days</p>
            </div>
            <MdOutlineFlag className="text-white w-10 h-10 opacity-80" />
          </div>
          <p className="text-white text-4xl font-black">{activeDaysThisWeek}</p>
          <div className="mt-3 bg-white bg-opacity-20 rounded-full h-2">
            <div className="bg-white h-2 rounded-full" style={{ width: `${activeDaysProgress}%` }}></div>
          </div>
          <p className="text-white text-xs mt-2 opacity-80">{activeDaysProgress}% of weekly streak goal</p>
        </div>

        <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white text-lg font-bold">Today's Meals</h3>
              <p className="text-green-100 text-sm">Calories consumed</p>
            </div>
            <MdOutlineFastfood className="text-white w-10 h-10 opacity-80" />
          </div>
          <p className="text-white text-4xl font-black">{nutritionTotals.calories}</p>
          <div className="mt-3 bg-white bg-opacity-20 rounded-full h-2">
            <div className="bg-white h-2 rounded-full" style={{ width: `${nutritionProgress.calories}%` }}></div>
          </div>
          <p className="text-white text-xs mt-2 opacity-80">{nutritionProgress.calories}% of daily nutrition goal</p>
        </div>

      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Weekly Progress Chart */}
        <div className="xl:col-span-2 bg-gray-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-2xl font-bold">Weekly Progress</h2>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-300 text-sm">Calories Burned</span>
            </div>
          </div>
          <div className="h-80">
            <WeeklyChart weeklyWorkoutData={weeklyCaloriesBurned} />
          </div>
        </div>

        {/* Today's Workouts */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-white text-2xl font-bold mb-6">Today's Workouts</h2>
          <div className="h-80 flex items-center justify-center">
            <TodaysWorkoutChart workoutLog={workoutLog} />
          </div>
        </div>
      </div>

      {/* Recent Activities & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Workouts */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-white text-2xl font-bold mb-6">Recent Activities</h2>
          <div className="space-y-4">
            {workoutLog.slice(0, 3).map((workout, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-700 rounded-xl p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">🏃</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{workout.exercise || 'Workout'}</h3>
                    <p className="text-gray-300 text-sm">
                      {new Date(workout.date).toLocaleDateString()} • {workout.duration || 'N/A'} min
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-lg">{workout.calories || 0} kcal</p>
                </div>
              </div>
            ))}
            {workoutLog.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">No recent workouts</p>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                  onClick={() => {
                    setIsModalOpen(true);
                    setEditingWorkout(null);
                  }}
                >
                  Start Your First Workout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-white text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-4 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center"
              onClick={() => {
                setIsModalOpen(true);
                setEditingWorkout(null);
              }}
            >
              <AiOutlineThunderbolt className="w-8 h-8 mb-2" />
              <span>Log Workout</span>
            </button>
            <button
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-4 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center"
              onClick={() => setIsStepsModalOpen(true)}
            >
              <FaWalking className="w-8 h-8 mb-2" />
              <span>Add Steps</span>
            </button>
            <button
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-4 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center"
              onClick={() => setIsDistanceModalOpen(true)}
            >
              <RiMapPinLine className="w-8 h-8 mb-2" />
              <span>Set Distance Goal</span>
            </button>
            <button
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center"
              onClick={() => setIsMealsCalculatorOpen(true)}
            >
              <MdOutlineFastfood className="w-8 h-8 mb-2" />
              <span>Meals Calculator</span>
            </button>
            <button
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-4 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center"
              onClick={() => window.location.href = '/dashboard/workoutstore'}
            >
              <span className="text-2xl mb-2">🎯</span>
              <span>Set Goal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Workout Modal */}
      <Workout
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingWorkout(null);
        }}
        onSubmit={handleLogSubmit}
        workoutToEdit={editingWorkout}
      />

      {/* Steps Modal */}
      <StepsModal
        isOpen={isStepsModalOpen}
        onClose={() => setIsStepsModalOpen(false)}
      />

      {/* Distance Modal */}
      <DistanceModal
        isOpen={isDistanceModalOpen}
        onClose={() => setIsDistanceModalOpen(false)}
      />

      {/* Meals Calculator Modal */}
      <MealsCalculatorModal
        isOpen={isMealsCalculatorOpen}
        onClose={() => setIsMealsCalculatorOpen(false)}
        onMealSaved={handleMealSaved}
      />
    </div>
  );
};

export default Activity;
