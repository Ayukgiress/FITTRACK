import React, { useContext, useState } from 'react';
import { GoalsContext } from '../context/GoalsContext';

const Plan = () => {
  const { addGoal } = useContext(GoalsContext);
  const [goal, setGoal] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (goal) {
      addGoal({ id: Date.now(), text: goal });
      setGoal('');
    }
  };

  return (
    <div>
      <h1>Your Goals</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input 
          type="text" 
          value={goal} 
          onChange={(e) => setGoal(e.target.value)} 
          placeholder="Add a new goal" 
          className="border rounded p-2"
        />
        <button type="submit" className="ml-2 bg-blue-500 text-white rounded px-4">Add Goal</button>
      </form>
    </div>
  );
};

export default Plan;
