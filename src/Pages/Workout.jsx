import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { toast } from 'sonner'; // For notifications

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
    setDate('');
    setCalories(0);
  };

  const calculateCalories = () => {
    if (!startTime || !endTime) return 0;

    const duration = (new Date(`1970-01-01T${endTime}Z`) - new Date(`1970-01-01T${startTime}Z`)) / 60000; // Duration in minutes
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
    const calculatedCalories = calculateCalories();
    const workoutData = { exercise, startTime, endTime, date, calories: calculatedCalories };

    onSubmit(workoutData);
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
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          width: '400px', 
          backgroundColor: 'black',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          padding: '40px',
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="exerciseType" className="block text-sm font-medium">
            Exercise Type
          </label>
          <select
            id="exerciseType"
            value={exercise}
            onChange={handleExerciseChange}
            className="w-full border rounded p-3 text-black" // Increased padding
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

        <div className="mb-4 text-black">
          <label htmlFor="startTime" className="block text-sm font-medium text-white">
            Start Time
          </label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full border rounded p-3" // Increased padding
            required
          />
        </div>

        <div className="mb-4 text-black">
          <label htmlFor="endTime" className="block text-sm font-medium text-white">
            End Time
          </label>
          <input
            type="time"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full border rounded p-3" // Increased padding
            required
          />
        </div>

        <div className="mb-4 text-black">
          <label htmlFor="date" className="block text-sm font-medium text-white">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded p-3" // Increased padding
            required
          />
        </div>

        <div className="mb-4 text-black">
          <label htmlFor="calories" className="block text-sm font-medium text-white">
            Calories Burned
          </label>
          <input
            type="number"
            id="calories"
            value={calories}
            readOnly
            className="w-full border rounded p-3"
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-black border-2 border-red-700 text-white font-semibold rounded py-2 px-4"
          >
            Submit
          </button>
          <button onClick={onClose} className="text-red-500 font-semibold">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Workout;
