// WorkoutLog.js
import React, { useState } from 'react';

const WorkoutLog = ({ workouts, setWorkouts }) => {
  const [workout, setWorkout] = useState('');

  const handleWorkoutSubmit = (e) => {
    e.preventDefault();
    setWorkouts([...workouts, workout]);
    setWorkout('');
  };

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Log Workouts</h2>
      <form onSubmit={handleWorkoutSubmit} className="flex space-x-2 mb-2">
        <input
          type="text"
          value={workout}
          onChange={(e) => setWorkout(e.target.value)}
          placeholder="Enter Workout"
          className="border p-2 flex-1"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add</button>
      </form>
      <ul className="list-disc pl-5">
        {workouts.map((workout, index) => (
          <li key={index}>{workout}</li>
        ))}
      </ul>
    </section>
  );
};

export default WorkoutLog;
