// WeeklyActivityChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const WeeklyChart = ({ chartData }) => (
  <section>
    <h2 className="text-xl font-semibold mb-2">Weekly Activity</h2>
    <Line data={chartData} />
  </section>
);

export default WeeklyChart;
