import React, { useState, useEffect } from 'react';

const calorieRates = {
    running: 10,
    cycling: 8,
    swimming: 7,
    yoga: 3,
    weightlifting: 6,
};

const Workout = ({ isOpen, onClose, onSubmit, workoutToEdit }) => {
    const [exercise, setExercise] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState('');
    const [calories, setCalories] = useState(0);

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (workoutToEdit) {
            setExercise(workoutToEdit.exercise);
            setDuration(workoutToEdit.duration);
            setDate(workoutToEdit.date);
            setCalories(workoutToEdit.calories);
        } else {
            setExercise('');
            setDuration(0);
            setDate('');
            setCalories(0);
        }
    }, [workoutToEdit]);

    const handleDurationChange = (e) => {
        const newDuration = e.target.value;
        setDuration(newDuration);
        const calculatedCalories = (calorieRates[exercise.toLowerCase()] || 0) * newDuration;
        setCalories(calculatedCalories);
    };

    const handleExerciseChange = (e) => {
        const selectedExercise = e.target.value;
        setExercise(selectedExercise);
        const calculatedCalories = (calorieRates[selectedExercise.toLowerCase()] || 0) * duration;
        setCalories(calculatedCalories);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const workoutData = { exercise, duration, date, calories };

        onSubmit(workoutData); // Pass the workout data back to the Activity component
        setExercise('');
        setDuration(0);
        setDate('');
        setCalories(0);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-80">
                <span className="cursor-pointer text-gray-400 float-right" onClick={onClose}>&times;</span>
                <h2 className="text-lg font-semibold mb-4">Log Your Workout</h2>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2">
                        Exercise:
                        <select
                            className="border border-gray-300 rounded w-full p-2"
                            value={exercise}
                            onChange={handleExerciseChange}
                            required
                        >
                            <option value="">Select an exercise</option>
                            {Object.keys(calorieRates).map((type) => (
                                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                            ))}
                        </select>
                    </label>
                    <label className="block mb-2">
                        Duration (minutes):
                        <input
                            className="border border-gray-300 rounded w-full p-2"
                            type="number"
                            value={duration}
                            onChange={handleDurationChange}
                            required
                        />
                    </label>
                    <label className="block mb-4">
                        Date:
                        <input
                            className="border border-gray-300 rounded w-full p-2"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </label>
                    <div className="mb-4">
                        <strong>Calories Burned:</strong> {calories.toFixed(2)} calories
                    </div>
                    <button className="bg-blue-500 text-white rounded p-2 w-full" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Workout;
