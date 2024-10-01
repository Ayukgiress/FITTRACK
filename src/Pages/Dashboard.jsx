import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Activity from './Activity';
import WorkoutLog from './Workout';
import Goals from './Goals';
import WeeklyChart from './WeeklyChart';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const App = () => {
  const [data, setData] = useState({
    steps: 0,
    caloriesBurned: 0,
    floorsClimbed: 0,
    activeMinutes: 0,
    restingHeartRate: 0,
    activeHeartRate: 0,
  });

  const [workouts, setWorkouts] = useState([]);
  const [plan, setPlan] = useState('');
  const [weeklyData, setWeeklyData] = useState([0, 0, 0, 0, 0, 0, 0]); // Sample weekly data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://your-backend-api.com/fitness-data');
      if (!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts')) || [];
    setWorkouts(savedWorkouts);
  }, []);

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }, [workouts]);

  useEffect(() => {
    fetchData();
  }, []);

  const chartData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Weekly Steps',
        data: weeklyData,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 overflow-y-hidden">
      <h1 className="text-2xl font-bold mb-4 text-white" >Fitness Tracker Dashboard</h1>
      <div className='flex items-center justify-between '>
        <div className='w-16 h-96 bg-neutral-800'></div>
        <div className='w-28 h-screen bg-neutral-800'></div>
      </div>
  
      {/* <main className="w-full max-w-4xl mx-auto">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <Activity data={data} />
            <WorkoutLog workouts={workouts} setWorkouts={setWorkouts} />
            <Goals plan={plan} setPlan={setPlan} />
            <WeeklyChart chartData={chartData} />
          </>
        )}
      </main> */}
    </div>
  );
  
};

export default App;
