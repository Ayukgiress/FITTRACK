import React, { useEffect, useState } from "react";
import { TEChart } from "tw-elements-react";
import { useFitness } from '../Pages/PlanContext';

export default function MonthlyStepChart() {
  const { dailyStepCount, loading } = useFitness();
  const [data, setData] = useState({
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    datasets: [
      {
        label: "Monthly Steps",
        data: Array(12).fill(0), 
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (!loading && dailyStepCount.length) {
      const monthlySteps = Array(12).fill(0);

      dailyStepCount.forEach(entry => {
        const date = new Date(entry.date);
        const month = date.getMonth();
        monthlySteps[month] += entry.steps;
      });

      // Update chart data
      setData(prevData => ({
        ...prevData,
        datasets: [{
          ...prevData.datasets[0],
          data: monthlySteps,
        }],
      }));
    }
  }, [dailyStepCount, loading]);

  const options = {
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
      },
    },
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
      <div className="h-[100px] w-[500px]"> {/* Set height and width here */}
        <TEChart
          type="bar"
          data={data}
          options={options}
        />
    </div>
  );
}
