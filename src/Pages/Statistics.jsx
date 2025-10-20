import React, { useState, useEffect } from 'react';
import { FaFire, FaWalking, FaRoute, FaChartLine, FaTrophy, FaCalendarAlt, FaArrowUp, FaArrowDown, FaEquals, FaFilter, FaDownload } from 'react-icons/fa';
import MonthlyActivity from "./Homes";
import MonthlyStepChart from '../Component/GoalsList';
import { useAuth } from './AuthContext';
import { useFitness } from './PlanContext';

const Statistics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const { currentUser, isAuthenticated } = useAuth();
  const { dailyStepCount, loading } = useFitness();
  const [workoutLog, setWorkoutLog] = useState([]);
  const [statsData, setStatsData] = useState({
    totalWorkouts: { value: 0, change: 0, trend: 'neutral' },
    avgSteps: { value: 0, change: 0, trend: 'neutral' },
    monthlyDistance: { value: 0, change: 0, trend: 'neutral' },
    totalCalories: { value: 0, change: 0, trend: 'neutral' }
  });

  // Fetch workout data
  useEffect(() => {
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

  // Calculate real statistics
  useEffect(() => {
    if (workoutLog.length > 0 || dailyStepCount.length > 0) {
      // Calculate total workouts this month
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const thisMonthWorkouts = workoutLog.filter(workout => {
        const workoutDate = new Date(workout.date);
        return workoutDate.getMonth() === currentMonth && workoutDate.getFullYear() === currentYear;
      });

      // Calculate previous month workouts for comparison
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      const prevMonthWorkouts = workoutLog.filter(workout => {
        const workoutDate = new Date(workout.date);
        return workoutDate.getMonth() === prevMonth && workoutDate.getFullYear() === prevYear;
      });

      const workoutChange = prevMonthWorkouts.length > 0 ?
        ((thisMonthWorkouts.length - prevMonthWorkouts.length) / prevMonthWorkouts.length) * 100 : 0;

      // Calculate total calories this month
      const totalCalories = thisMonthWorkouts.reduce((sum, workout) => sum + (parseFloat(workout.calories) || 0), 0);

      // Calculate average daily steps
      const avgSteps = dailyStepCount.length > 0 ?
        Math.round(dailyStepCount.reduce((sum, day) => sum + day.steps, 0) / dailyStepCount.length) : 0;

      // Calculate monthly distance (assuming some workouts have distance data)
      const monthlyDistance = thisMonthWorkouts.reduce((sum, workout) => sum + (parseFloat(workout.distance) || 0), 0);

      setStatsData({
        totalWorkouts: {
          value: thisMonthWorkouts.length,
          change: Math.round(workoutChange),
          trend: workoutChange > 0 ? 'up' : workoutChange < 0 ? 'down' : 'neutral'
        },
        avgSteps: {
          value: avgSteps,
          change: 0, // Would need historical data for accurate change
          trend: 'neutral'
        },
        monthlyDistance: {
          value: Math.round(monthlyDistance * 10) / 10,
          change: 0, // Would need historical data for accurate change
          trend: 'neutral'
        },
        totalCalories: {
          value: Math.round(totalCalories),
          change: 0, // Would need historical data for accurate change
          trend: 'neutral'
        }
      });
    }
  }, [workoutLog, dailyStepCount]);

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <FaArrowUp className="text-green-400" />;
      case 'down': return <FaArrowDown className="text-red-400" />;
      default: return <FaEquals className="text-gray-400" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
              <FaChartLine className="text-white text-3xl" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">Fitness Analytics</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Dive deep into your fitness journey with comprehensive statistics and insights
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto px-4 pb-16">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Metrics</option>
              <option value="workouts">Workouts</option>
              <option value="steps">Steps</option>
              <option value="calories">Calories</option>
            </select>
          </div>
          <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105">
            <FaDownload />
            <span>Export Data</span>
          </button>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 rounded-2xl p-6 shadow-2xl border border-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <FaTrophy className="text-purple-200 text-2xl" />
              <div className={`flex items-center space-x-1 ${getTrendColor(statsData.totalWorkouts.trend)}`}>
                {getTrendIcon(statsData.totalWorkouts.trend)}
                <span className="text-sm font-medium">{Math.abs(statsData.totalWorkouts.change)}%</span>
              </div>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Total Workouts</h3>
            <p className="text-white text-3xl font-bold mb-1">{statsData.totalWorkouts.value}</p>
            <p className="text-purple-100 text-sm">this month</p>
          </div>

          <div className="bg-gradient-to-br from-cyan-600 via-cyan-700 to-blue-600 rounded-2xl p-6 shadow-2xl border border-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <FaWalking className="text-cyan-200 text-2xl" />
              <div className={`flex items-center space-x-1 ${getTrendColor(statsData.avgSteps.trend)}`}>
                {getTrendIcon(statsData.avgSteps.trend)}
                <span className="text-sm font-medium">{Math.abs(statsData.avgSteps.change)}%</span>
              </div>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Avg Daily Steps</h3>
            <p className="text-white text-3xl font-bold mb-1">{statsData.avgSteps.value.toLocaleString()}</p>
            <p className="text-cyan-100 text-sm">steps/day</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-600 rounded-2xl p-6 shadow-2xl border border-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <FaRoute className="text-emerald-200 text-2xl" />
              <div className={`flex items-center space-x-1 ${getTrendColor(statsData.monthlyDistance.trend)}`}>
                {getTrendIcon(statsData.monthlyDistance.trend)}
                <span className="text-sm font-medium">{Math.abs(statsData.monthlyDistance.change)}%</span>
              </div>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Monthly Distance</h3>
            <p className="text-white text-3xl font-bold mb-1">{statsData.monthlyDistance.value}</p>
            <p className="text-emerald-100 text-sm">km total</p>
          </div>

          <div className="bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 rounded-2xl p-6 shadow-2xl border border-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <FaFire className="text-orange-200 text-2xl" />
              <div className={`flex items-center space-x-1 ${getTrendColor(statsData.totalCalories.trend)}`}>
                {getTrendIcon(statsData.totalCalories.trend)}
                <span className="text-sm font-medium">{Math.abs(statsData.totalCalories.change)}%</span>
              </div>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Total Calories</h3>
            <p className="text-white text-3xl font-bold mb-1">{statsData.totalCalories.value.toLocaleString()}</p>
            <p className="text-orange-100 text-sm">kcal burned</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
          {/* Monthly Calories Chart */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700 hover:shadow-orange-500/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <FaFire className="text-orange-400 text-2xl mr-3" />
                <h2 className="text-2xl font-semibold text-white">Monthly Calories Burned</h2>
              </div>
              <button className="text-gray-400 hover:text-white transition-colors">
                <FaFilter />
              </button>
            </div>
            <div className="h-96">
              <MonthlyActivity />
            </div>
          </div>

          {/* Monthly Steps Chart */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700 hover:shadow-green-500/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <FaWalking className="text-green-400 text-2xl mr-3" />
                <h2 className="text-2xl font-semibold text-white">Monthly Steps Count</h2>
              </div>
              <button className="text-gray-400 hover:text-white transition-colors">
                <FaFilter />
              </button>
            </div>
            <div className="h-96 flex items-center justify-center">
              <MonthlyStepChart />
            </div>
          </div>
        </div>

        {/* Insights Section */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <FaChartLine className="mr-3 text-blue-400" />
            Performance Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg p-4">
              <h3 className="text-green-400 font-semibold mb-2">Great Progress!</h3>
              <p className="text-gray-300 text-sm">You've increased your workout frequency by 12% this month. Keep up the excellent work!</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg p-4">
              <h3 className="text-blue-400 font-semibold mb-2">Step Goal Reminder</h3>
              <p className="text-gray-300 text-sm">You're averaging 8,420 steps/day. Try to reach 10,000 steps for optimal health benefits.</p>
            </div>
          </div>
        </div>

        {/* Motivational Footer */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full px-6 py-3">
            <span className="text-gray-300">💪</span>
            <span className="text-gray-300 font-medium">Every step counts towards your goals!</span>
            <span className="text-gray-300">🚀</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
