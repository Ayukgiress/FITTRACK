import React from 'react';
import { Bar } from 'react-chartjs-2';

const MonthlyCaloriesChart = ({ workoutLog }) => {
  const calculateMonthlyCalories = (log) => {
    const monthlyCalories = Array(12).fill(0); 

    log.forEach(entry => {
      const entryDate = new Date(entry.date); // Ensure entry.date is a valid date
      const caloriesNum = parseFloat(entry.calories); // Ensure calories is a number
      if (!isNaN(caloriesNum)) {
        const month = entryDate.getMonth(); // Get the month from the date (0-11)
        monthlyCalories[month] += caloriesNum; // Add calories to the correct month
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
          calories > 0 ? 'rgba(255, 99, 132, 0.7)' : 'rgba(192, 192, 192, 0.7)' // Red for calories > 0, gray for 0
        ),
        borderColor: 'black',
        borderWidth: 1,
        barThickness: 20, 
      },
    ],
  };

  // Update chart options for different screen sizes
  const options = {
    indexAxis: 'y',  // Horizontal bar chart
    responsive: true,  // Make the chart responsive
    maintainAspectRatio: false, // Allow the chart to resize dynamically
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          lineWidth: 1, // Default grid line width
        },
        ticks: {
          color: 'white',
          font: {
            size: 14, // Default font size for x-axis labels
          },
          callback: (value) => `${value} cal`, 
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          lineWidth: 1, // Default grid line width
        },
        ticks: {
          color: 'white',
          font: {
            size: 14, // Default font size for y-axis labels
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'white',
          font: {
            size: 14, // Default font size for legend
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
    // Customizing for larger screen sizes (3xl)
    interaction: {
      mode: 'nearest',
      axis: 'xy',
      intersect: false,
    },
  };

 
  if (window.innerWidth >= 1536) { 
    options.scales.x.ticks.font.size = 19;  
    options.scales.y.ticks.font.size = 19;  
    options.scales.x.grid.lineWidth = 3;    
    options.scales.y.grid.lineWidth = 3;    
    options.plugins.legend.labels.font.size = 19;  
  }

  return (
    <div className="h-[400px] w-full ml-30 p-4 sm:w-[60rem] flex items-center justify-center 3xl:h-[50rem] 3xl:w-[90rem]">  
      <Bar data={data} options={options} />
    </div>
  );
};

export default MonthlyCaloriesChart;
