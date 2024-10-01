// FitnessGoals.js
import React from 'react';

const Goals = ({ plan, setPlan }) => (
  <section className="mb-6">
    <h2 className="text-xl font-semibold mb-2">Set Fitness Goals</h2>
    <input
      type="text"
      value={plan}
      onChange={(e) => setPlan(e.target.value)}
      placeholder="Enter Your Plan"
      className="border p-2 w-full mb-2"
    />
  </section>
);

export default Goals;
