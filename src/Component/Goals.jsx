import React from 'react';

const Goal = ({ goal, removeGoal }) => {
  return (
    <div className="flex justify-between items-center p-2 border-b">
      <span>{goal.text}</span>
      <button onClick={() => removeGoal(goal.id)} className="text-red-500">Remove</button>
    </div>
  );
};

export default Goal;
