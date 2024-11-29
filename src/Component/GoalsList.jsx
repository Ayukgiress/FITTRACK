import React, { useEffect, useState } from "react";
import { TEChart } from "tw-elements-react";
import { useFitness } from '../Pages/PlanContext';

const MonthlyStepChart = () => {
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
          "rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255,99,132,1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)",
          "rgba(255,99,132,1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const [chartOptions, setChartOptions] = useState({
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
          font: { size: 14 },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
          font: { size: 12 },
        },
      },
      y: {
        ticks: {
          color: "white",
          font: { size: 12 },
        },
      },
    },
  });

  const updateChartOptions = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 1536) {
      setChartOptions((prevOptions) => ({
        ...prevOptions,
        scales: {
          x: {
            ...prevOptions.scales.x,
            ticks: { font: { size: 19 } },
            grid: { lineWidth: 3 },
          },
          y: {
            ...prevOptions.scales.y,
            ticks: { font: { size: 19 } },
            grid: { lineWidth: 3 },
          },
        },
        plugins: {
          legend: {
            ...prevOptions.plugins.legend,
            labels: { font: { size: 19 } },
          },
        },
      }));
    } else {
      setChartOptions((prevOptions) => ({
        ...prevOptions,
        scales: {
          x: {
            ...prevOptions.scales.x,
            ticks: { font: { size: 12 } },
            grid: { lineWidth: 1 },
          },
          y: {
            ...prevOptions.scales.y,
            ticks: { font: { size: 12 } },
            grid: { lineWidth: 1 },
          },
        },
        plugins: {
          legend: {
            ...prevOptions.plugins.legend,
            labels: { font: { size: 14 } },
          },
        },
      }));
    }
  };

  useEffect(() => {
    if (!loading && dailyStepCount.length) {
      const monthlySteps = Array(12).fill(0);
      dailyStepCount.forEach(entry => {
        const date = new Date(entry.date);
        const month = date.getMonth();
        monthlySteps[month] += entry.steps;
      });

      setData((prevData) => ({
        ...prevData,
        datasets: [{
          ...prevData.datasets[0],
          data: monthlySteps,
        }],
      }));
    }
  }, [dailyStepCount, loading]);

  useEffect(() => {
    updateChartOptions();
    window.addEventListener("resize", updateChartOptions);

    return () => {
      window.removeEventListener("resize", updateChartOptions);
    };
  }, []);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center p-4 mx-auto w-full md:h-[27rem] 3xl:h-[53rem] 3xl:w-[55rem] md:w-[38rem] bg-neutral-900 rounded-lg">
      <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px]">
        <TEChart type="bar" data={data} options={chartOptions} />
      </div>
    </div>
  );
};

export default MonthlyStepChart;
