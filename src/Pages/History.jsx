import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { API_URL } from '../../constants';
import { toast } from 'sonner';
import { Calendar, Search, Filter, Download, TrendingUp } from 'lucide-react';

const History = () => {
  const [workouts, setWorkouts] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('workouts');
  const [dateFilter, setDateFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [monthlyMeals, setMonthlyMeals] = useState({});
  const { currentUser, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && currentUser?._id) {
      fetchHistoryData();
    } else {
      setLoading(false);
    }
  }, [currentUser, isAuthenticated]);

  const fetchHistoryData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      // Fetch workouts
      const workoutsResponse = await fetch(`${API_URL}/workouts/${currentUser._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (workoutsResponse.ok) {
        const workoutsData = await workoutsResponse.json();
        setWorkouts(workoutsData);
      }

      // Fetch meals from API
      const mealsResponse = await fetch(`${API_URL}/api/meals/${currentUser._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (mealsResponse.ok) {
        const mealsData = await mealsResponse.json();
        setMeals(mealsData);
        processMonthlyMeals(mealsData);
      }

    } catch (error) {
      console.error('Error fetching history data:', error);
      toast.error('Failed to load history data');
    } finally {
      setLoading(false);
    }
  };

  const processMonthlyMeals = (mealsData) => {
    const monthlyData = {};
    mealsData.forEach(meal => {
      const date = new Date(meal.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          meals: [],
          totalCalories: 0,
          mealCount: 0
        };
      }
      monthlyData[monthKey].meals.push(meal);
      monthlyData[monthKey].totalCalories += meal.totalCalories;
      monthlyData[monthKey].mealCount += 1;
    });
    setMonthlyMeals(monthlyData);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filterDataByDate = (data, dateFilter) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    return data.filter(item => {
      const itemDate = new Date(item.date);
      switch (dateFilter) {
        case 'today':
          return itemDate >= today;
        case 'week':
          return itemDate >= weekAgo;
        case 'month':
          return itemDate >= monthAgo;
        default:
          return true;
      }
    });
  };

  const filterAndSortData = (data) => {
    let filtered = filterDataByDate(data, dateFilter);

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.exercise?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt);
        case 'calories':
          return (b.calories || b.totalCalories || 0) - (a.calories || a.totalCalories || 0);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const exportData = () => {
    const data = activeTab === 'workouts' ? workouts : meals;
    const csvContent = "data:text/csv;charset=utf-8," +
      Object.keys(data[0] || {}).join(",") + "\n" +
      data.map(row => Object.values(row).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${activeTab}_history.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading your history...</p>
          <p className="text-gray-400 text-sm mt-2">Fetching workouts and meals data</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white text-xl">Please log in to view your history</p>
      </div>
    );
  }

  const filteredWorkouts = filterAndSortData(workouts);
  const filteredMeals = filterAndSortData(meals);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-white mb-4">Your History</h1>
        <p className="text-xl text-blue-100">
          Review your past workouts and meals to track your progress over time.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Workouts</p>
              <p className="text-white text-2xl font-bold">{filteredWorkouts.length}</p>
            </div>
            <TrendingUp className="text-blue-400" size={24} />
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Meals</p>
              <p className="text-white text-2xl font-bold">{filteredMeals.length}</p>
            </div>
            <Calendar className="text-green-400" size={24} />
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avg Daily Calories</p>
              <p className="text-white text-2xl font-bold">
                {filteredMeals.length > 0 ? Math.round(filteredMeals.reduce((sum, meal) => sum + meal.totalCalories, 0) / filteredMeals.length) : 0}
              </p>
            </div>
            <Filter className="text-yellow-400" size={24} />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search workouts or meals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date Filter */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Sort by Date</option>
            <option value="calories">Sort by Calories</option>
          </select>

          {/* Export */}
          <button
            onClick={exportData}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <Download size={20} />
            Export
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('workouts')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
              activeTab === 'workouts'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Workouts ({filteredWorkouts.length})
          </button>
          <button
            onClick={() => setActiveTab('meals')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
              activeTab === 'meals'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Meals ({filteredMeals.length})
          </button>
          <button
            onClick={() => setActiveTab('monthly')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
              activeTab === 'monthly'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Monthly Overview
          </button>
        </div>

        {/* Workouts Tab */}
        {activeTab === 'workouts' && (
          <div className="space-y-4">
            <h2 className="text-white text-2xl font-bold mb-4">Workout History</h2>
            {filteredWorkouts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">No workout history found</p>
                <p className="text-gray-500">Start logging workouts to see your history here!</p>
              </div>
            ) : (
              filteredWorkouts.map((workout, index) => (
                <div key={workout._id || index} className="bg-gray-700 rounded-xl p-6 hover:bg-gray-650 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        {workout.exercise || 'Workout'}
                      </h3>
                      <p className="text-gray-300">
                        {formatDate(workout.date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-yellow-400 font-bold text-xl">
                        {workout.calories || 0} kcal
                      </p>
                      <p className="text-gray-400 text-sm">
                        {workout.duration || 'N/A'} min
                      </p>
                    </div>
                  </div>
                  {workout.notes && (
                    <p className="text-gray-300 text-sm">{workout.notes}</p>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Meals Tab */}
        {activeTab === 'meals' && (
          <div className="space-y-4">
            <h2 className="text-white text-2xl font-bold mb-4">Meal History</h2>
            {filteredMeals.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">No meal history found</p>
                <p className="text-gray-500">Start using the meals calculator to track your nutrition!</p>
              </div>
            ) : (
              filteredMeals.map((meal) => (
                <div key={meal._id || meal.id} className="bg-gray-700 rounded-xl p-6 hover:bg-gray-650 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        {meal.name}
                      </h3>
                      <p className="text-gray-300">
                        {formatDate(meal.date)} • {meal.type}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-yellow-400 font-bold text-xl">
                        {meal.totalCalories} kcal
                      </p>
                      <p className="text-gray-400 text-sm">
                        {meal.items?.length || 0} items
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {meal.items?.map((item, index) => (
                      <span
                        key={index}
                        className="bg-gray-600 text-gray-300 px-3 py-1 rounded-full text-sm"
                      >
                        {item.name || item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 text-sm text-gray-400">
                    P: {meal.items?.reduce((sum, item) => sum + (item.protein || 0), 0)}g |
                    C: {meal.items?.reduce((sum, item) => sum + (item.carbs || 0), 0)}g |
                    F: {meal.items?.reduce((sum, item) => sum + (item.fats || 0), 0)}g
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Monthly Overview Tab */}
        {activeTab === 'monthly' && (
          <div className="space-y-6">
            <h2 className="text-white text-2xl font-bold mb-4">Monthly Meals Overview</h2>
            {Object.keys(monthlyMeals).length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">No monthly data available</p>
                <p className="text-gray-500">Start logging meals to see monthly summaries!</p>
              </div>
            ) : (
              Object.entries(monthlyMeals)
                .sort(([a], [b]) => b.localeCompare(a))
                .map(([monthKey, data]) => (
                  <div key={monthKey} className="bg-gray-700 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-white font-semibold text-xl">
                        {new Date(monthKey + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                      </h3>
                      <div className="text-right">
                        <p className="text-yellow-400 font-bold text-lg">
                          {data.totalCalories} kcal total
                        </p>
                        <p className="text-gray-400 text-sm">
                          {data.mealCount} meals
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {data.meals.slice(0, 6).map((meal, index) => (
                        <div key={meal._id || index} className="bg-gray-600 rounded-lg p-4">
                          <h4 className="text-white font-medium">{meal.name}</h4>
                          <p className="text-gray-300 text-sm">{formatDate(meal.date)}</p>
                          <p className="text-yellow-400 font-semibold">{meal.totalCalories} kcal</p>
                        </div>
                      ))}
                      {data.meals.length > 6 && (
                        <div className="bg-gray-600 rounded-lg p-4 flex items-center justify-center">
                          <p className="text-gray-400">+{data.meals.length - 6} more meals</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
