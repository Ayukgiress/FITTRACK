import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { API_URL } from '../../constants';
import { toast } from 'sonner';

const History = () => {
  const [workouts, setWorkouts] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('workouts');
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

      // For now, meals are placeholder - in a real app, you'd fetch from backend
      setMeals([
        {
          id: 1,
          name: 'Breakfast',
          date: '2024-01-15',
          calories: 450,
          items: ['Oatmeal', 'Banana', 'Coffee']
        },
        {
          id: 2,
          name: 'Lunch',
          date: '2024-01-15',
          calories: 620,
          items: ['Grilled Chicken', 'Rice', 'Vegetables']
        }
      ]);

    } catch (error) {
      console.error('Error fetching history data:', error);
      toast.error('Failed to load history data');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white text-xl">Loading history...</p>
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-white mb-4">Your History</h1>
        <p className="text-xl text-blue-100">
          Review your past workouts and meals to track your progress over time.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('workouts')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
              activeTab === 'workouts'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Workouts
          </button>
          <button
            onClick={() => setActiveTab('meals')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
              activeTab === 'meals'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Meals
          </button>
        </div>

        {/* Workouts Tab */}
        {activeTab === 'workouts' && (
          <div className="space-y-4">
            <h2 className="text-white text-2xl font-bold mb-4">Workout History</h2>
            {workouts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">No workout history found</p>
                <p className="text-gray-500">Start logging workouts to see your history here!</p>
              </div>
            ) : (
              workouts.map((workout, index) => (
                <div key={index} className="bg-gray-700 rounded-xl p-6">
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
            {meals.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">No meal history found</p>
                <p className="text-gray-500">Start using the meals calculator to track your nutrition!</p>
              </div>
            ) : (
              meals.map((meal) => (
                <div key={meal.id} className="bg-gray-700 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        {meal.name}
                      </h3>
                      <p className="text-gray-300">
                        {formatDate(meal.date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-yellow-400 font-bold text-xl">
                        {meal.calories} kcal
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {meal.items.map((item, index) => (
                      <span
                        key={index}
                        className="bg-gray-600 text-gray-300 px-3 py-1 rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
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
