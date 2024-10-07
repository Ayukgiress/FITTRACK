import React, { createContext, useState } from 'react';

export const GoalsContext = createContext();

export const GoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);

  const addGoal = (goal) => setGoals((prev) => [...prev, goal]);
  const removeGoal = (id) => setGoals((prev) => prev.filter((goal) => goal.id !== id));

  return (
    <GoalsContext.Provider value={{ goals, addGoal, removeGoal }}>
      {children}
    </GoalsContext.Provider>
  );
};
