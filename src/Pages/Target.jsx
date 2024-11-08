import React, { useState } from 'react';
import { useFitness } from './PlanContext';

const Target = () => {
  const { setTargets } = useFitness();
  const [stepsTarget, setStepsTarget] = useState(0);
  const [distanceTarget, setDistanceTarget] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTargets(stepsTarget, distanceTarget);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div>
        <label className="block text-sm font-medium">Weekly Steps Target</label>
        <input
          type="number"
          value={stepsTarget}
          onChange={(e) => setStepsTarget(e.target.value)}
          className="w-full border rounded p-2 bg-gray-800 text-white"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Weekly Distance Target (km)</label>
        <input
          type="number"
          value={distanceTarget}
          onChange={(e) => setDistanceTarget(e.target.value)}
          className="w-full border rounded p-2 bg-gray-800 text-white"
          required
        />
      </div>
      <button type="submit" className="bg-black border-2 border-red-700 text-white rounded py-2 px-4 hover:bg-red-600">
        Set Targets
      </button>
    </form>
  );
};

export default Target;
