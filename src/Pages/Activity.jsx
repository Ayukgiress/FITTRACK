import React, { useState } from "react";
import Workout from "./Workout";
import WeeklyChart from "./WeeklyChart";
import { FaTrash, FaEdit } from 'react-icons/fa';
import { API_URL } from "../../constants";

function Activity() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workoutLog, setWorkoutLog] = useState([]);
  const [weeklyWorkoutDurations, setWeeklyWorkoutDurations] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); 
  const entriesPerPage = 5;

  const calculateWeeklyCalories = () => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - 6);

    return workoutLog.reduce((total, entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= weekStart && entryDate <= today
        ? total + entry.calories
        : total;
    }, 0);
  };

  const totalCaloriesThisWeek = calculateWeeklyCalories();

  const handleLogSubmit = async (workout) => {
    if (editingWorkout) {
      try {
        const response = await fetch(`${API_URL}/workouts/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(workout),
        });

        if (!response.ok) {
          throw new Error('Failed to update workout');
        }

        setWorkoutLog((prevLog) =>
          prevLog.map((entry) => (entry.id === editingWorkout.id ? { ...workout, completed: entry.completed, id: editingWorkout.id } : entry))
        );
      } catch (error) {
        console.error('Error updating workout:', error);
      }
      setEditingWorkout(null);
    } else {
      try {
        const response = await fetch(`${API_URL}/workouts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(workout),
        });

        if (!response.ok) {
          throw new Error('Failed to log workout');
        }

        const data = await response.json();
        setWorkoutLog((prevLog) => [...prevLog, { ...data, completed: false }]);
        const dayIndex = new Date(data.date).getDay();
        const updatedDurations = [...weeklyWorkoutDurations];
        updatedDurations[dayIndex] += data.duration;
        setWeeklyWorkoutDurations(updatedDurations);
      } catch (error) {
        console.error('Error logging workout:', error);
      }
    }
  };

  const deleteWorkout = async (index) => {
    const workoutToDelete = workoutLog[index];
    try {
      const response = await fetch(`${API_URL}/workouts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete workout');
      }

      setWorkoutLog((prevLog) => prevLog.filter((_, i) => i !== index));
      const dayIndex = new Date(workoutToDelete.date).getDay();
      const updatedDurations = [...weeklyWorkoutDurations];
      updatedDurations[dayIndex] -= workoutToDelete.duration;
      setWeeklyWorkoutDurations(updatedDurations);
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

  const startEditing = (workout) => {
    setEditingWorkout(workout);
    setIsModalOpen(true);
  };

  const completeWorkout = (index) => {
    const updatedLog = workoutLog.map((entry, i) =>
      i === index ? { ...entry, completed: true } : entry
    );
    setWorkoutLog(updatedLog);
  };

  // Pagination logic
  const totalEntries = workoutLog.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = workoutLog.slice(indexOfFirstEntry, indexOfLastEntry);

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

      <div className="bg-neutral-700 rounded-md p-4 mt-4 text-center">
        <h2 className="text-white text-xl">Total Calories Burned This Week</h2>
        <p className="text-white font-bold text-2xl">
          {totalCaloriesThisWeek.toFixed(2)} kcal
        </p>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="bg-dashboard-gradient flex-1 w-[60%] h-[400px] rounded-md mt-4">
          <WeeklyChart weeklyWorkoutData={weeklyWorkoutDurations} />
        </div>

        <div className="bg-red-600 flex-1 w-[35%] h-[400px] rounded-md p-4 overflow-y-auto mt-4">
          <h2 className="text-white text-xl mb-2 text-center">Workout Log</h2>
          <div className="bg-black text-white p-2 rounded-md">
            <div className="grid grid-cols-5 gap-2 text-xs font-bold mb-2">
              <div>Completed</div>
              <div>Exercise</div>
              <div>Duration</div>
              <div>Date</div>
              <div>Calories</div>
            </div>
          </div>
          <ul className="list-disc pl-5 flex flex-col items-center m-2 w-11/12">
            {currentEntries.length === 0 ? (
              <li className="text-center">No workouts logged yet.</li>
            ) : (
              currentEntries.map((entry, index) => (
                <li
                  key={entry.id}
                  className={`mb-2 gap-4 flex items-center justify-between bg-black w-full p-2 rounded-md text-white ${entry.completed ? 'opacity-50' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={entry.completed}
                    onChange={() => completeWorkout(index)}
                    disabled={entry.completed}
                  />
                  <div className="text-xs font-light">{entry.exercise}</div>
                  <div className="text-xs font-light">{entry.duration}</div>
                  <div className="text-xs font-light">{entry.date}</div>
                  <div className="text-xs font-light">{entry.calories.toFixed(2)}</div>
                  <div className="flex gap-2">
                    <FaEdit
                      onClick={() => startEditing(entry)}
                      className="text-white cursor-pointer"
                    />
                    <FaTrash
                      onClick={() => deleteWorkout(index)}
                      className="text-white cursor-pointer"
                    />
                  </div>
                </li>
              ))
            )}
          </ul>
          <div className="flex justify-between mt-4">
            <button 
              className="text-white" 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              &#8592; 
            </button>
            <span className="text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              className="text-white" 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              &#8594; 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activity;
