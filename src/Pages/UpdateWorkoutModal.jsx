import React, { useState, useEffect } from 'react';

const calorieRates = {
  running: 10,
  cycling: 8,
  swimming: 7,
  yoga: 3,
  weightlifting: 6,
};

const UpdateWorkoutModal = ({ workout, onClose, onSubmit }) => {
  const [exercise, setExercise] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
  const [calories, setCalories] = useState(0);

  useEffect(() => {
    if (workout) {
      setExercise(workout.exercise);
      setStartTime(workout.startTime);
      setEndTime(workout.endTime);
      setDate(workout.date);
      setCalories(workout.calories);
    }
  }, [workout]);

  const calculateCalories = () => {
    if (!startTime || !endTime) return 0;
    const duration = (new Date(`1970-01-01T${endTime}:00`) - new Date(`1970-01-01T${startTime}:00`)) / 60000;
    return duration * (calorieRates[exercise] || 5);
  };

  const handleSubmit = () => {
    const updatedWorkout = {
      exercise,
      startTime,
      endTime,
      date,
      calories: calculateCalories(),
    };
    onSubmit(updatedWorkout);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Edit Workout</h2>
        <div className="form-group">
          <label>Exercise</label>
          <input
            type="text"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Calories</label>
          <input
            type="number"
            value={calories}
            readOnly
            className="form-input"
          />
        </div>
        <button onClick={handleSubmit} className="btn-submit">Save</button>
        <button onClick={onClose} className="btn-cancel">Cancel</button>
      </div>
    </div>
  );
};

export default UpdateWorkoutModal;
