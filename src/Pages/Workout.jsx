import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { toast } from 'sonner'; // For notifications
import { getDurationFromEndTimeAndStartTime } from '../utils/utils';
import { useAuth } from './AuthContext';

const NUTRITIONIX_APP_ID = '812ef2a4';
const NUTRITIONIX_APP_KEY = 'c3edfe63c89968c3a92493ac01c02f8b';
const NUTRITIONIX_EXERCISE_URL = 'https://trackapi.nutritionix.com/v2/natural/exercise';

const Workout = ({ isOpen, onClose, onSubmit, workoutToEdit }) => {
  const [exercise, setExercise] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
  const [calories, setCalories] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

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

  const calculateCalories = async ({
    overrideExercise,
    overrideStartTime,
    overrideEndTime,
  } = {}) => {
    const effectiveExercise = overrideExercise ?? exercise;
    const effectiveStartTime = overrideStartTime ?? startTime;
    const effectiveEndTime = overrideEndTime ?? endTime;

    if (!effectiveStartTime || !effectiveEndTime || !effectiveExercise) {
      console.log('Missing required fields for calculation:', {
        startTime: effectiveStartTime,
        endTime: effectiveEndTime,
        exercise: effectiveExercise,
      });
      return 0;
    }

    if (!currentUser?.weight) {
      console.log('User weight not available:', currentUser);
      toast.error('User weight not found. Please update your profile.');
      return 0;
    }

    setIsCalculating(true);
    try {
      const duration = getDurationFromEndTimeAndStartTime(effectiveEndTime, effectiveStartTime);
      if (Number.isNaN(duration) || duration <= 0) {
        console.warn('Invalid duration calculated. Skipping Nutritionix call.', {
          effectiveStartTime,
          effectiveEndTime,
          duration,
        });
        return 0;
      }
      console.log('Calculating calories for:', { exercise: effectiveExercise, duration, weight: currentUser.weight });

      const query = `${duration} minutes of ${effectiveExercise}`;
      console.log('Nutritionix query:', query);

      const response = await fetch(NUTRITIONIX_EXERCISE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': NUTRITIONIX_APP_ID,
          'x-app-key': NUTRITIONIX_APP_KEY,
        },
        body: JSON.stringify({
          query,
          weight_kg: currentUser.weight,
        }),
      });

      console.log('API response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error response:', errorText);
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      console.log('API response data:', data);

      if (data.exercises && data.exercises.length > 0) {
        const calculatedCalories = Math.round(data.exercises[0].nf_calories);
        console.log('Calculated calories:', calculatedCalories);
        return calculatedCalories;
      } else {
        console.warn('No exercises found in response');
        throw new Error('No exercise data found');
      }
    } catch (error) {
      console.error('Error calculating calories:', error);
      toast.error('Failed to calculate calories. Using default calculation.');
      // Fallback to basic calculation if API fails
      const duration = getDurationFromEndTimeAndStartTime(endTime, startTime);
      const basicRates = {
        running: 10,
        cycling: 8,
        swimming: 7,
        yoga: 3,
        weightlifting: 6,
      };
      const fallbackCalories = (basicRates[exercise.toLowerCase()] || 0) * duration;
      console.log('Fallback calories:', fallbackCalories);
      return fallbackCalories;
    } finally {
      setIsCalculating(false);
    }
  };

  const handleExerciseChange = async (e) => {
    const nextExercise = e.target.value;
    setExercise(nextExercise);

    if (!nextExercise || !startTime || !endTime || !currentUser?.weight) {
      setCalories(0);
      return;
    }

    const calculatedCalories = await calculateCalories({
      overrideExercise: nextExercise,
      overrideStartTime: startTime,
      overrideEndTime: endTime,
    });
    setCalories(calculatedCalories);
  };

  const handleStartTimeChange = async (e) => {
    const nextStartTime = e.target.value;
    setStartTime(nextStartTime);

    if (!exercise || !nextStartTime || !endTime || !currentUser?.weight) {
      setCalories(0);
      return;
    }

    if (endTime && nextStartTime > endTime) {
      setCalories(0);
      return;
    }

    const calculatedCalories = await calculateCalories({
      overrideStartTime: nextStartTime,
    });
    setCalories(calculatedCalories);
  };

  const handleEndTimeChange = async (e) => {
    const nextEndTime = e.target.value;
    setEndTime(nextEndTime);

    if (!exercise || !startTime || !nextEndTime || !currentUser?.weight) {
      setCalories(0);
      return;
    }

    if (startTime && nextEndTime < startTime) {
      setCalories(0);
      return;
    }

    const calculatedCalories = await calculateCalories({
      overrideEndTime: nextEndTime,
    });
    setCalories(calculatedCalories);
  };

  useEffect(() => {
    if (workoutToEdit) {
      setExercise(workoutToEdit.exercise);
      setStartTime(workoutToEdit.startTime);
      setEndTime(workoutToEdit.endTime);
      setDate(workoutToEdit.date || '');
      setCalories(workoutToEdit.calories || 0);
    }
  }, [workoutToEdit]);

  // Automatically calculate calories when exercise, startTime, endTime, or weight changes
  useEffect(() => {
    const calculateOnChange = async () => {
      if (exercise && startTime && endTime && currentUser?.weight) {
        const calculatedCalories = await calculateCalories();
        setCalories(calculatedCalories);
      } else {
        setCalories(0);
      }
    };
    calculateOnChange();
  }, [exercise, startTime, endTime, currentUser?.weight]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const calculatedCalories = await calculateCalories();
      const workoutData = { exercise, startTime, endTime, date, calories: calculatedCalories };

      onSubmit(workoutData);
      toast.success("Exercise logged successfully!");
      onClose();
      resetForm();
    } catch (error) {
      console.error('Error submitting workout:', error);
      toast.error('Failed to log workout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Conditional rendering to avoid registering modal multiple times
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      // className="content"
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
   <form onSubmit={handleSubmit} className='form'>
  <div className="mb-4">
    <label htmlFor="exerciseType" className="block text-sm font-medium">
      Exercise Type
    </label>
    <select
      id="exerciseType"
      value={exercise}
      onChange={handleExerciseChange}
      className="w-full border rounded p-3 text-black"
      required
    >
      <option value="">Select an exercise</option>
      {['running', 'cycling', 'swimming', 'yoga', 'weightlifting'].map((type) => (
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
      onChange={handleStartTimeChange}
      className="w-full border rounded p-3"
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
      onChange={handleEndTimeChange}
      className="w-full border rounded p-3"
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
      className="w-full border rounded p-3"
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
      placeholder={isCalculating ? "Calculating..." : "Calories will be calculated"}
    />
  </div>

  <div className="flex justify-between mt-4">
    <button onClick={onClose} className="text-red-500 font-semibold" disabled={loading}>
      Cancel
    </button>
    <button
      type="submit"
      className="bg-black border-2 border-red-700 text-white font-semibold rounded py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={loading || !exercise || !startTime || !endTime || !date}
    >
      {loading ? "Calculating..." : "Submit"}
    </button>
  </div>
</form>

    </Modal>
  );
};

export default Workout;
