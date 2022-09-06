import React, { FC } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Bar chart',
    },
  },
};

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const data = {
  labels,
  datasets: [
    {
      label: 'Expenses',
      data: [65, 59, 80, 81, 56, 55, 40, 100, 89, 29, 20, 23],
      backgroundColor: '#1c1b1b',
    },
  ],
};

const BarChart: FC = () => {
  return <Bar options={options} data={data} height={'70px'} />;
};

export default BarChart;
