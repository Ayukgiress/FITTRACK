import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useFitness } from './PlanContext';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WorkoutStore = () => {
  const { dailyStepCount, weeklyRunningDistance, loading } = useFitness();

  if (loading) return <p>Loading...</p>;

  const stepsData = dailyStepCount.map(item => item.steps);
  const totalSteps = stepsData.reduce((acc, steps) => acc + steps, 0);
  const totalDistance = weeklyRunningDistance.reduce((acc, distance) => acc + distance.distance, 0);

  const stepLabels = dailyStepCount.map(item => new Date(item.date).toLocaleDateString('en-US', { weekday: 'long' }));

  const stepData = {
    labels: stepLabels,
    datasets: [{
      label: 'Daily Step Count',
      data: stepsData,
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }],
  };

  const distanceData = {
    labels: weeklyRunningDistance.map((_, i) => `Week ${i + 1}`),
    datasets: [{
      label: 'Weekly Running Distance (km)',
      data: weeklyRunningDistance.map(item => item.distance),
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
    }],
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 m-8">
      <div className="flex flex-wrap justify-around gap-10 w-full mb-10">
        <div className="mb-6 w-full md:w-auto">
          <h3 className='text-white text-xl mb-2'>Total Steps Count</h3>
          <ul className='bg-gray-700 rounded p-4 max-h-52 overflow-auto w-full md:w-60'>
            <li className='text-gray-300 mb-1'>Total: {totalSteps} steps</li>
          </ul>
        </div>
        <div className="mb-6 w-full md:w-auto">
          <h3 className='text-white text-xl mb-2'>Total Running Distance</h3>
          <ul className='bg-gray-700 rounded p-4 max-h-52 overflow-auto w-full md:w-60'>
            <li className='text-gray-300 mb-1'>Total: {totalDistance} km</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-around w-full gap-10">
        <div className="mb-6 w-full md:w-auto h-80">
          <h3 className='text-white text-xl mb-2'>Daily Step Count Chart</h3>
          <div className="w-full h-full">
            <Bar data={stepData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="w-full md:w-auto h-80">
          <h3 className='text-white text-xl mb-2'>Weekly Running Distance Chart</h3>
          <div className="w-full h-full">
            <Bar data={distanceData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutStore;
