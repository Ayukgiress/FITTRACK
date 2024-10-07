import React, { useContext } from 'react';
import { GoalsContext } from '../Context/GoalsContext';
import Goal from './Goals'

const GoalsList = () => {
  const { goals, removeGoal } = useContext(GoalsContext);

  if (!goals) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      {goals.length > 0 ? (
        goals.map((goal) => (
          <Goal key={goal.id} goal={goal} removeGoal={removeGoal} />
        ))
      ) : (
        <p>No goals set yet!</p>
      )}
    </div>
  );
};

export default GoalsList;
