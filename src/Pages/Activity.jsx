
import React from 'react';

const Activity = ({ data }) => (
  <section className="mb-6">
    <h2 className="text-xl font-semibold mb-2">Daily Activity</h2>
    <div className="grid grid-cols-2 gap-4">
      <div className="card bg-white p-4 shadow">{`Steps: ${data.steps}`}</div>
      <div className="card bg-white p-4 shadow">{`Calories Burned: ${data.caloriesBurned}`}</div>
      <div className="card bg-white p-4 shadow">{`Floors Climbed: ${data.floorsClimbed}`}</div>
      <div className="card bg-white p-4 shadow">{`Active Minutes: ${data.activeMinutes}`}</div>
    </div>
  </section>
);

export default Activity ;
