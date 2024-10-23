// DonutChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const DonutChart = ({ data }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF5678'];

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="duration"
        nameKey="exercise"
        cx="50%"
        cy="50%"
        innerRadius={40}
        outerRadius={80}
        fill="#8884d8"
        label={(entry) => entry.exercise} // Adding label to the slices
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip
        formatter={(value, name) => [`${value} min`, name]} // Formatting tooltip
      />
      <Legend />
    </PieChart>
  );
};

export default DonutChart;
