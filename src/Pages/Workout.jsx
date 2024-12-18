import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { toast } from 'sonner'; // For notifications
import { getDurationFromEndTimeAndStartTime } from '../utils/utils';

const calorieRates = {
  running: 10,
  cycling: 8,
  swimming: 7,
  yoga: 3,
  weightlifting: 6,
};

const Workout = ({ isOpen, onClose, onSubmit, workoutToEdit }) => {
  const [exercise, setExercise] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
  const [calories, setCalories] = useState(0);

  useEffect(() => {
    if (workoutToEdit) {
      setExercise(workoutToEdit.exercise);
      setStartTime(workoutToEdit.startTime);
      setEndTime(workoutToEdit.endTime);
      setDate(workoutToEdit.date);
      setCalories(workoutToEdit.calories);
    } else {
      resetForm();
    }
  }, [workoutToEdit]);

  const resetForm = () => {
    setExercise('');
    setStartTime('');
    setEndTime('');
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    setDate(today);
    setCalories(0);
  };

  const calculateCalories = () => {
    if (!startTime || !endTime) return 0;
    const duration = getDurationFromEndTimeAndStartTime(endTime, startTime);
    return (calorieRates[exercise.toLowerCase()] || 0) * duration;
  };

  const handleExerciseChange = (e) => {
    const selectedExercise = e.target.value;
    setExercise(selectedExercise);
    setCalories(calculateCalories());
  };

  useEffect(() => {
    setCalories(calculateCalories());
  }, [startTime, endTime]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Ensure startTime and endTime are not empty
    if (!startTime || !endTime) {
      toast.error("Please provide both start time and end time.");
      return;
    }
  
    const calculatedCalories = calculateCalories();
    const workoutData = { exercise, startTime, endTime, date, calories: calculatedCalories };
  
    onSubmit(workoutData); // This will trigger addWorkout or updateWorkout
    toast.success("Exercise logged successfully!");
    onClose();
    resetForm();
  };
  
  // Conditional rendering to avoid registering modal multiple times
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      shouldCloseOnOverlayClick
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        },
        content: {
          position: 'relative',
          top: 'auto',
          left: 'auto',
          right: 'auto',
          bottom: 'auto',
          width: '600px', // Increased width for 3XL screen
          maxWidth: '90%', // Ensure responsiveness
          maxHeight: '90vh', // Prevent overflow
          backgroundColor: 'black',
          color: 'white',
          border: 'none',
          borderRadius: '15px', // Slightly larger border radius
          padding: '50px', // More padding
          boxShadow: '0 10px 30px rgba(255, 255, 255, 0.1)', // Subtle white glow
          margin: 'auto',
          overflow: 'auto', // Scroll if content is too long
        },
      }}
    >
      <form onSubmit={handleSubmit} className='form space-y-6'>
        <div>
          <label htmlFor="exerciseType" className="block text-md font-medium mb-2">
            Exercise Type
          </label>
          <select
            id="exerciseType"
            value={exercise}
            onChange={handleExerciseChange}
            className="w-full border rounded-lg p-4 text-black text-lg"
            required
          >
            <option value="">Select an exercise</option>
            {Object.keys(calorieRates).map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="text-black">
          <label htmlFor="startTime" className="block text-md font-medium mb-2 text-white">
            Start Time
          </label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full border rounded-lg p-4 text-lg"
            required
          />
        </div>

        <div className="text-black">
          <label htmlFor="endTime" className="block text-md font-medium mb-2 text-white">
            End Time
          </label>
          <input
            type="time"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full border rounded-lg p-4 text-lg"
            required
          />
        </div>

        <div className="text-black">
          <label htmlFor="date" className="block text-md font-medium mb-2 text-white">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded-lg p-4 text-lg"
            max={new Date().toISOString().split('T')[0]} // Disable future dates
            required
          />
        </div>

        <div className="text-black">
          <label htmlFor="calories" className="block text-md font-medium mb-2 text-white">
            Calories Burned
          </label>
          <input
            type="number"
            id="calories"
            value={calories}
            readOnly
            className="w-full border rounded-lg p-4 text-lg"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button 
            onClick={onClose} 
            type="button"
            className="text-red-500 font-semibold text-lg hover:bg-red-100 px-4 py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-black border-2 border-red-700 text-white font-semibold rounded-lg py-3 px-6 text-lg hover:bg-red-700 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Workout;