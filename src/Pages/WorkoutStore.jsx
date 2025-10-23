import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useFitness } from './PlanContext';
import { FaTrophy, FaCalendarAlt, FaChartLine, FaPlus, FaBullseye, FaFire, FaWalking, FaRoute, FaCheckCircle, FaClock, FaDumbbell, FaCrosshairs, FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import Modal from 'react-modal';
import { API_URL } from '../../constants';
import { getIsoWeekNumber } from '../utils/utils';

const WorkoutStore = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const { dailyStepCount, weeklyRunningDistance, loading } = useFitness();
  const [goals, setGoals] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({ type: 'Daily Steps', target: '', unit: 'steps' });
  const [editingGoal, setEditingGoal] = useState(null);

  useEffect(() => {
    if (isAuthenticated && currentUser?._id) {
      fetchGoals();
      fetchWorkouts();
    }
  }, [isAuthenticated, currentUser]);

  const fetchGoals = async () => {
    try {
      const token = localStorage.getItem('token');

      // Fetch regular goals
      const goalsResponse = await fetch(`${API_URL}/goals/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      let allGoals = [];
      if (goalsResponse.ok) {
        const goalsData = await goalsResponse.json();
        // Map backend types to frontend types
        const mappedGoals = goalsData.map(goal => ({
          ...goal,
          type: goal.type === 'dailySteps' ? 'Daily Steps' : goal.type === 'weeklyDistance' ? 'Weekly Distance' : goal.type,
          target: goal.value,
          unit: goal.type === 'dailySteps' ? 'steps' : 'km'
        }));
        allGoals = [...mappedGoals];
      }

      // Fetch daily distance goals
      const dailyDistanceResponse = await fetch(`${API_URL}/plan/daily-distance`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (dailyDistanceResponse.ok) {
        const dailyDistanceData = await dailyDistanceResponse.json();
        const dailyDistanceGoals = dailyDistanceData.map(d => ({
          type: 'Daily Distance',
          target: d.distance,
          unit: 'km',
          _id: d._id,
          date: d.date
        }));
        allGoals = [...allGoals, ...dailyDistanceGoals];
      }

      setGoals(allGoals);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const fetchWorkouts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/workouts/${currentUser._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setWorkouts(data);
      }
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  const calculateProgress = (goal) => {
    let current = 0;
    let target = parseFloat(goal.target) || 0;

    switch (goal.type) {
      case 'Daily Steps':
        current = dailyStepCount.reduce((acc, item) => acc + item.steps, 0);
        break;
      case 'Daily Distance':
        // For daily distance goals, check if the goal's date has been achieved
        const goalDate = goal.date;
        const todaysDistanceEntry = weeklyRunningDistance.find(item => item.date === goalDate);
        current = todaysDistanceEntry ? todaysDistanceEntry.distance : 0;
        break;
      case 'Weekly Distance':
        // For weekly distance goals, sum up all distances for the current week
        current = weeklyRunningDistance.reduce((acc, item) => acc + item.distance, 0);
        break;
      case 'Calories Burned':
        current = workouts.reduce((acc, workout) => acc + (parseFloat(workout.calories) || 0), 0);
        break;
      default:
        current = 0;
    }

    const progress = target > 0 ? Math.min((current / target) * 100, 100) : 0;
    return { current, progress: Math.round(progress) };
  };

  const handleAddGoal = async () => {
    if (!newGoal.target || !newGoal.type) return;

    try {
      const token = localStorage.getItem('token');
      let url, body;

      if (newGoal.type === 'Daily Distance') {
        const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

        url = `${API_URL}/plan/daily-distance`;
        body = JSON.stringify({
          date,
          distance: parseFloat(newGoal.target),
          userId: currentUser._id,
        });
      } else {
        url = `${API_URL}/goals/`;
        // Map frontend types to backend types
        const backendType = newGoal.type === 'Daily Steps' ? 'dailySteps' : newGoal.type === 'Weekly Distance' ? 'weeklyDistance' : newGoal.type;
        body = JSON.stringify({
          type: backendType,
          value: parseFloat(newGoal.target),
        });
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body,
      });

      if (response.ok) {
        fetchGoals();
        setShowAddGoal(false);
        setNewGoal({ type: 'Daily Steps', target: '', unit: 'steps' });
      }
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  const handleEditGoal = async () => {
    if (!editingGoal || !editingGoal.target) return;

    try {
      const token = localStorage.getItem('token');
      // Map frontend types to backend types
      const backendType = editingGoal.type === 'Daily Steps' ? 'dailySteps' : editingGoal.type === 'Weekly Distance' ? 'weeklyDistance' : editingGoal.type;
      const response = await fetch(`${API_URL}/goals/${editingGoal._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: backendType,
          value: parseFloat(editingGoal.target),
        }),
      });

      if (response.ok) {
        fetchGoals();
        setEditingGoal(null);
      }
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const handleDeleteGoal = async (goalId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/goals/${goalId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        fetchGoals();
      }
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const handleGoalTypeChange = (type, isEditing = false) => {
    const units = {
      'Daily Steps': 'steps',
      'Daily Distance': 'km',
      'Weekly Distance': 'km',
      'Calories Burned': 'kcal'
    };

    if (isEditing) {
      setEditingGoal({ ...editingGoal, type, unit: units[type] });
    } else {
      setNewGoal({ ...newGoal, type, unit: units[type] });
    }
  };

  const totalSteps = dailyStepCount.reduce((acc, item) => acc + item.steps, 0);
  const totalDistance = weeklyRunningDistance.reduce((acc, item) => acc + item.distance, 0);
  const totalCalories = workouts.reduce((acc, workout) => acc + (parseFloat(workout.calories) || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading your fitness data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 pb-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-blue-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full mb-6">
              <FaBullseye className="text-white text-3xl" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">Goals & Achievements</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Set ambitious goals, track your progress, and celebrate your fitness victories
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto px-4 pb-16">

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-blue-600 via-cyan-700 to-blue-800 rounded-2xl p-8 shadow-2xl border border-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <FaWalking className="text-blue-200 text-2xl" />
              </div>
              <FaChartLine className="text-blue-200 text-xl" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">Total Steps</h3>
            <p className="text-white text-4xl font-bold mb-1">{totalSteps.toLocaleString()}</p>
            <p className="text-blue-100 text-sm">steps this week</p>
            <div className="mt-4 bg-blue-500/20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full w-4/5"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 via-green-700 to-emerald-800 rounded-2xl p-8 shadow-2xl border border-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-emerald-500/20 rounded-xl">
                <FaRoute className="text-emerald-200 text-2xl" />
              </div>
              <FaTrophy className="text-emerald-200 text-xl" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">Total Distance</h3>
            <p className="text-white text-4xl font-bold mb-1">{totalDistance.toFixed(1)}</p>
            <p className="text-emerald-100 text-sm">km this week</p>
            <div className="mt-4 bg-emerald-500/20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full w-3/5"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-600 via-red-700 to-orange-800 rounded-2xl p-8 shadow-2xl border border-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-orange-500/20 rounded-xl">
                <FaFire className="text-orange-200 text-2xl" />
              </div>
              <FaCalendarAlt className="text-orange-200 text-xl" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">Total Calories</h3>
            <p className="text-white text-4xl font-bold mb-1">{totalCalories.toFixed(0)}</p>
            <p className="text-orange-100 text-sm">kcal burned</p>
            <div className="mt-4 bg-orange-500/20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full w-2/3"></div>
            </div>
          </div>
        </div>

        {/* Goals Section */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700 mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="p-3 bg-emerald-500/20 rounded-xl mr-4">
              <FaCrosshairs className="text-emerald-400 text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">Your Goals</h2>
                <p className="text-gray-400">Track your fitness objectives and milestones</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddGoal(true)}
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center transition-all duration-200 transform hover:scale-105"
            >
              <FaPlus className="mr-2" />
              Add Goal
            </button>
          </div>

          {goals.length === 0 ? (
            <div className="text-center py-12 bg-gray-700/30 rounded-xl">
              <FaCrosshairs className="text-gray-400 text-4xl mx-auto mb-4" />
              <p className="text-gray-400 mb-4 text-lg">No goals set yet</p>
              <p className="text-gray-500 text-sm">Start by adding your first fitness goal to begin your journey!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((goal, index) => {
                const { current, progress } = calculateProgress(goal);
                return (
                  <div key={index} className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-6 border border-gray-600 hover:border-emerald-500/50 transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold text-lg">{goal.type}</h3>
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => setEditingGoal(goal)}
                          className="text-gray-400 hover:text-emerald-400 transition-colors"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteGoal(goal._id)}
                          className="text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Target:</span>
                        <span className="text-white font-medium">{goal.target} {goal.unit}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Current:</span>
                        <span className="text-emerald-400 font-medium">{current.toFixed(0)} {goal.unit}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Progress:</span>
                        <span className={`font-medium ${progress >= 100 ? 'text-green-400' : 'text-emerald-400'}`}>
                          {progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                            progress >= 100 ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-emerald-500 to-green-500'
                          }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      {progress >= 100 && (
                        <div className="flex items-center justify-center mt-2">
                          <FaCheckCircle className="text-green-400 text-xl mr-2" />
                          <span className="text-green-400 font-medium">Goal Achieved!</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Workouts */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700">
          <div className="flex items-center mb-8">
            <div className="p-3 bg-orange-500/20 rounded-xl mr-4">
              <FaDumbbell className="text-orange-400 text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Recent Workouts</h2>
              <p className="text-gray-400">Your latest fitness activities and achievements</p>
            </div>
          </div>

          {workouts.length === 0 ? (
            <div className="text-center py-12 bg-gray-700/30 rounded-xl">
              <FaDumbbell className="text-gray-400 text-4xl mx-auto mb-4" />
              <p className="text-gray-400 mb-4 text-lg">No workouts logged yet</p>
              <p className="text-gray-500 text-sm">Start tracking your fitness journey by logging your first workout!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {workouts.slice(0, 5).map((workout, index) => (
                <div key={index} className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl p-6 border border-gray-600 hover:border-orange-500/50 transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-orange-500/20 rounded-xl">
                        <FaFire className="text-orange-400 text-lg" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">{workout.exercise || 'Workout'}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-300">
                          <span className="flex items-center">
                            <FaCalendarAlt className="mr-1" />
                            {new Date(workout.date).toLocaleDateString()}
                          </span>
                          {workout.duration && (
                            <span className="flex items-center">
                              <FaClock className="mr-1" />
                              {workout.duration} min
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold text-2xl">{workout.calories || 0}</p>
                      <p className="text-orange-300 text-sm">kcal</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Motivational Footer */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 rounded-full px-6 py-3">
            <span className="text-gray-300">💪</span>
            <span className="text-gray-300 font-medium">Stay consistent, stay strong!</span>
            <span className="text-gray-300">🚀</span>
          </div>
        </div>
      </div>

      {/* Add Goal Modal */}
      <Modal
        isOpen={showAddGoal}
        onRequestClose={() => setShowAddGoal(false)}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 1)',
            backdropFilter: 'blur(16px)',
            zIndex: 9999,
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            width: '420px',
            maxWidth: '90vw',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '0',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mb-4">
              <FaBullseye className="text-white text-2xl" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-2">
              Create New Goal
            </h2>
            <p className="text-gray-300 text-lg">
              Set a new fitness target to achieve
            </p>
          </div>

          <div className="space-y-6">
            {/* Goal Type Section */}
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <FaBullseye className="text-emerald-400 mr-3 text-xl" />
                <label htmlFor="goalType" className="text-lg font-semibold text-white">
                  Goal Type
                </label>
              </div>
              <div className="relative">
                <select
                  id="goalType"
                  value={newGoal.type}
                  onChange={(e) => handleGoalTypeChange(e.target.value)}
                  className="w-full bg-gray-900/80 border-2 border-gray-600 rounded-xl p-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 appearance-none"
                >
                  <option value="Daily Steps">🏃 Daily Steps</option>
                  <option value="Daily Distance">🏃‍♂️ Daily Distance</option>
                  <option value="Weekly Distance">🏃‍♂️ Weekly Distance</option>
                  <option value="Calories Burned">🔥 Calories Burned</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                  ▼
                </div>
              </div>
            </div>

            {/* Target Input Section */}
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <FaTrophy className="text-green-400 mr-3 text-xl" />
                <label htmlFor="target" className="text-lg font-semibold text-white">
                  Target ({newGoal.unit})
                </label>
              </div>
              <input
                id="target"
                type="number"
                value={newGoal.target}
                onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                placeholder={`Enter target ${newGoal.unit}`}
                className="w-full bg-gray-900/80 border-2 border-gray-600 rounded-xl p-4 text-white text-center text-2xl font-mono focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                min="1"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowAddGoal(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleAddGoal}
                disabled={!newGoal.target || !newGoal.type}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                <FaCheck className="text-sm" />
                🚀 Create Goal
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 pt-4 border-t border-gray-700">
            <p className="text-sm text-gray-400">
              Set ambitious goals and achieve your fitness dreams!
            </p>
          </div>
        </div>
      </Modal>

      {/* Edit Goal Modal */}
      <Modal
        isOpen={!!editingGoal}
        onRequestClose={() => setEditingGoal(null)}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(8px)",
            zIndex: 1000,
          },
          content: {
            background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
            color: "white",
            padding: "0",
            borderRadius: "20px",
            width: "90vw",
            maxWidth: "480px",
            height: "auto",
            margin: "auto",
            border: "none",
            boxShadow: "0 32px 64px -12px rgba(0, 0, 0, 0.9)",
            overflow: "hidden",
          },
        }}
      >
        <div className="relative p-8">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-4 right-4 w-20 h-20 bg-blue-500 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-emerald-500 rounded-full blur-xl"></div>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4">
                <FaEdit className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Edit Goal</h2>
              <p className="text-gray-300">Update your fitness target</p>
            </div>

            <div className="space-y-5">
              <div className="group">
                <label className="block text-sm font-semibold text-gray-200 mb-3">Goal Type</label>
                <div className="relative">
                  <select
                    value={editingGoal?.type || ''}
                    onChange={(e) => handleGoalTypeChange(e.target.value, true)}
                    className="w-full appearance-none border-2 border-gray-600 rounded-xl p-4 bg-gray-800/50 backdrop-blur-sm text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-500"
                  >
                    <option value="Daily Steps">🏃 Daily Steps</option>
                    <option value="Daily Distance">🏃‍♂️ Daily Distance</option>
                    <option value="Weekly Distance">🏃‍♂️ Weekly Distance</option>
                    <option value="Calories Burned">🔥 Calories Burned</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                    ▼
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-200 mb-3">
                  Target ({editingGoal?.unit || ''})
                </label>
                <input
                  type="number"
                  value={editingGoal?.target || ''}
                  onChange={(e) => setEditingGoal({ ...editingGoal, target: e.target.value })}
                  placeholder={`Enter target ${editingGoal?.unit || ''}`}
                  className="w-full border-2 border-gray-600 rounded-xl p-4 bg-gray-800/50 backdrop-blur-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-500"
                  min="1"
                />
              </div>
            </div>

            <div className="flex space-x-4 pt-6">
              <button
                onClick={handleEditGoal}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-blue-500/25"
              >
                ✏️ Update Goal
              </button>
              <button
                onClick={() => setEditingGoal(null)}
                className="flex-1 bg-gray-700/50 backdrop-blur-sm hover:bg-gray-600/50 text-white font-semibold py-4 px-6 rounded-xl border-2 border-gray-600 hover:border-gray-500 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WorkoutStore;
