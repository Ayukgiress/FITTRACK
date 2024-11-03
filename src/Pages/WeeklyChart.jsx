import { Line } from 'react-chartjs-2'; // Update the import

const WeeklyChart = ({ weeklyWorkoutData }) => {
  const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Calories Burned',
        data: weeklyWorkoutData,
        fill: true, // Optional: to fill under the line
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Light background color
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        tension: 0.4, // Makes the line smooth
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        },
      },
      x: {
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
    },
  };

  return (
    <div className="h-full p-4">
      <Line data={data} options={options} /> {/* Change to Line */}
    </div>
  );
};
