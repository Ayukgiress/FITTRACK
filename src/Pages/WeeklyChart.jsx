import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WeeklyChart = ({ weeklyWorkoutData }) => {
  const createGradient = (ctx, chartArea) => {
    if (!chartArea) return null; 

    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, 'rgba(255, 0, 0, 0.8)'); 
    gradient.addColorStop(1, 'rgba(169, 169, 169, 0.8)');
    return gradient;
  };

  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Workout Duration (minutes)',
        data: weeklyWorkoutData,
        borderColor: 'rgba(255, 0, 0, 0.8))',
        borderWidth: 1,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          const gradient = createGradient(ctx, chartArea);
          return gradient || 'rgba(75, 192, 192, 0.6)'; 
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Workout Duration',
      },
    },
  };

  return (
    <div style={{ height: '350px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default WeeklyChart;
