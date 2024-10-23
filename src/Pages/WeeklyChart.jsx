import React from 'react';  
import { Bar } from 'react-chartjs-2';  
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';  

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);  

const WeeklyChart = ({ weeklyWorkoutData }) => {  
  console.log("Weekly Workout Data:", weeklyWorkoutData);  

  const data = {  
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],  
    datasets: [  
      {  
        label: 'Calories Burned',  
        data: weeklyWorkoutData,  
        backgroundColor: 'rgba(75, 192, 192, 0.6)',  
        borderColor: 'rgba(75, 192, 192, 1)',  
        borderWidth: 1,  
      },  
    ],  
  };  

  const options = {  
    responsive: true,  
    plugins: {  
      legend: {  
        position: 'top',  
        labels: {  
          font: {  
            size: 14,  
            color: 'white',  
          },  
        },  
      },  
      title: {  
        display: true,  
        text: 'Weekly Calories Burned',   
        font: {  
          size: 18,  
          color: 'white',  
        },  
      },  
    },  
    scales: {  
      x: {  
        ticks: {  
          color: 'white',  
          font: {  
            size: 14,  
          },  
        },  
      },  
      y: {  
        ticks: {  
          color: 'white',  
          font: {  
            size: 14,  
          },  
        },  
      },  
    },  
  };  

  return (  
    <div style={{ height: '1000vh' }}> {/* Set the height of the container to a percentage */}  
      <Bar data={data} options={options} />  
    </div>  
  );  
};  

export default WeeklyChart;  
