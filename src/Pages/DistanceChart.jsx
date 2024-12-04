import React, { useState, useEffect } from 'react'; 
import { Doughnut } from 'react-chartjs-2'; 
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'; 
import { useFitness } from './PlanContext';  

ChartJS.register(ArcElement, Tooltip, Legend, Title);  

const DistanceChart = () => {   
  const { weeklyRunningDistance, loading } = useFitness();     
  const [selectedMonth, setSelectedMonth] = useState('January');   
  const [trafficData, setTrafficData] = useState({     
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  });    

  useEffect(() => {
    if (!loading && weeklyRunningDistance.length > 0) {
      const aggregatedData = {
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0,
      };

      weeklyRunningDistance.forEach((entry) => {
        if (entry.date && entry.distance) {
          const entryDate = new Date(entry.date);
          const month = entryDate.toLocaleString('default', { month: 'long' });
          
          if (aggregatedData.hasOwnProperty(month)) {
            const distance = parseFloat(entry.distance);
            if (!isNaN(distance)) {
              aggregatedData[month] += distance;
            }
          }
        }
      });

      Object.keys(aggregatedData).forEach(month => {
        aggregatedData[month] = parseFloat(aggregatedData[month].toFixed(2));
      });

      setTrafficData(aggregatedData);
    }
  }, [weeklyRunningDistance, loading]);

  const data = {
    labels: ['Running Distance', 'Remaining Distance'],
    datasets: [
      {
        label: `Running Distance for ${selectedMonth}`,
        data: [
          trafficData[selectedMonth], 
          Math.max(0, 100 - trafficData[selectedMonth]) // Ensure non-negative value
        ],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Monthly Running Distance - ${selectedMonth}`,
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.raw} km`;
          },
        },
      },
    },
  };

  // Responsive adjustments for larger screens
  if (typeof window !== "undefined" && window.innerWidth >= 1536) {
    options.plugins.title.font.size = 20;
    options.plugins.tooltip.callbacks.label = (context) => {
      return `${context.dataset.label}: ${context.raw} km`;
    };
  }

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center">
      <div className="flex justify-between items-center mb-6 w-full">
        <h1 className="text-2xl font-semibold text-gray-900">Monthly Running Distance</h1>
        <div className="flex space-x-4">
          <select
            value={selectedMonth}
            onChange={(e) => handleMonthChange(e.target.value)}
            className="bg-gray-100 text-gray-900 py-2 px-4 rounded-lg"
          >
            {Object.keys(trafficData).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mb-6 w-full sm:w-[450px] md:w-[300px] lg:w-[300px] xl:w-[300px] 3xl:w-[800px] 3xl:h-[700px]">
        {loading ? (
          <div className="text-center text-gray-900">Loading...</div>
        ) : (
          <Doughnut data={data} options={options} />
        )}
      </div>
    </div>
  );
};

export default DistanceChart;