import React from 'react';
import { Bar } from 'react-chartjs-2';

const MonthlyCaloriesChart = ({ workoutLog }) => {
  const calculateMonthlyCalories = (log) => {
    const monthlyCalories = Array(12).fill(0); 

    log.forEach(entry => {
      const entryDate = new Date(entry.date);
      const caloriesNum = parseFloat(entry.calories);
      if (!isNaN(caloriesNum)) {
        const month = entryDate.getMonth();
        monthlyCalories[month] += caloriesNum;
      }
    });

    return monthlyCalories;
  };

  const monthlyCaloriesBurned = calculateMonthlyCalories(workoutLog);

  const data = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Calories Burned',
        data: monthlyCaloriesBurned,
        backgroundColor: monthlyCaloriesBurned.map((calories) => 
          calories > 0 ? 'red' : 'red'
        ),
        borderColor: 'black',
        borderWidth: 1,
        barThickness: 20, 
      },
    ],
  };

  const options = {
    indexAxis: 'y', 
    responsive: true,
    maintainAspectRatio: true, 
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
          callback: (value) => `${value} cal`, 
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw} cal`; // Show label in tooltip
          },
        },
      },
    },
  };

  return (
    <div className="h-[700px] w-[750px] p-4"> 
      <Bar data={data} options={options} />
    </div>
  );
};

export default MonthlyCaloriesChart;
