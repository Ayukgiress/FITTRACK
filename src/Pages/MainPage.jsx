import React, { useEffect, useState } from 'react';  
import { Line } from 'react-chartjs-2';  
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';  

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

  const fetchData = async () => {  
    try {  
      // Replace with your backend API URL  
      const response = await fetch('https://your-backend-api.com/fitness-data');  
      if (!response.ok) throw new Error('Network response was not ok');  
      const result = await response.json();  
      setData(result);  
    } catch (error) {  
      console.error('Error fetching data:', error);  
    }  
  };  

  const handleWorkoutSubmit = (e) => {  
    e.preventDefault();  
    const workout = e.target.elements.workout.value;  
    setWorkouts([...workouts, workout]);  
    e.target.reset(); // Clear input  
  };  

  const handlePlanChange = (e) => {  
    setPlan(e.target.value);  
  };  

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
    <div className="container mx-auto p-4">  
      <h1 className="text-2xl font-bold mb-4">Fitness Tracker Dashboard</h1>  
      <main>  

        <section className="mb-6">  
          <h2 className="text-xl font-semibold mb-2">Daily Activity</h2>  
          <div className="grid grid-cols-2 gap-4">  
            <div className="card bg-white p-4 shadow">{`Steps: ${data.steps}`}</div>  
            <div className="card bg-white p-4 shadow">{`Calories Burned: ${data.caloriesBurned}`}</div>  
            <div className="card bg-white p-4 shadow">{`Floors Climbed: ${data.floorsClimbed}`}</div>  
            <div className="card bg-white p-4 shadow">{`Active Minutes: ${data.activeMinutes}`}</div>  
          </div>  
        </section>  

        <section className="mb-6">  
          <h2 className="text-xl font-semibold mb-2">Heart Rate</h2>  
          <div className="grid grid-cols-2 gap-4">  
            <div className="card bg-white p-4 shadow">{`Resting Heart Rate: ${data.restingHeartRate} bpm`}</div>  
            <div className="card bg-white p-4 shadow">{`Active Heart Rate: ${data.activeHeartRate} bpm`}</div>  
          </div>  
        </section>  

        <section className="mb-6">  
          <h2 className="text-xl font-semibold mb-2">Log Workouts</h2>  
          <form onSubmit={handleWorkoutSubmit} className="flex space-x-2 mb-2">  
            <input type="text" name="workout" placeholder="Enter Workout" className="border p-2 flex-1" required />  
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add</button>  
          </form>  
          <ul className="list-disc pl-5">  
            {workouts.map((workout, index) => (  
              <li key={index}>{workout}</li>  
            ))}  
          </ul>  
        </section>  

        <section className="mb-6">  
          <h2 className="text-xl font-semibold mb-2">Set Fitness Goals</h2>  
          <input type="text" value={plan} onChange={handlePlanChange} placeholder="Enter Your Plan" className="border p-2 w-full mb-2" />  
        </section>  

        <section>  
          <h2 className="text-xl font-semibold mb-2">Weekly Activity</h2>  
          <Line data={chartData} />  
        </section>  
      </main>  
    </div>  
  );  
};  

export default App;