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
          calories > 0 ? 'rgba(255, 99, 132, 0.7)' : 'rgba(192, 192, 192, 0.7)'
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
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          lineWidth: 1, 
        },
        ticks: {
          color: 'white',
          font: {
            size: 12, 
          },
          callback: (value) => `${value} cal`, 
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          lineWidth: 1, 
        },
        ticks: {
          color: 'white',
          font: {
            size: 12, 
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'white',
          font: {
            size: 12, 
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw} cal`; 
          },
        },
      },
    },
    
    interaction: {
      mode: 'nearest',
      axis: 'xy',
      intersect: false,
    },
  };

 
  if (window.innerWidth >= 1536) { 
    options.scales.x.ticks.font.size = 16;  
    options.scales.y.ticks.font.size = 16;  
    options.scales.x.grid.lineWidth = 2;    
    options.scales.y.grid.lineWidth = 2;    
    options.plugins.legend.labels.font.size = 12;  
  }

  return (
    <div className="h-[400px] w-full ml-30 p-4 sm:w-[60rem] flex items-start justify-start 3xl:h-[50rem] 3xl:w-[90rem] xl:w-[50rem] 2xl:w-[78rem] 2xl:h-[26rem]">  
      <Bar data={data} options={options} />
    </div>
  );
};

export default MonthlyCaloriesChart;
