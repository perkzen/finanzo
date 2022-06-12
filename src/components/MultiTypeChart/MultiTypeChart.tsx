import React, { FC } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

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

interface Props {
  lineData: number[];
  bar1Data: number[];
  bar2Data: number[];
}

const MultiTypeChart: FC<Props> = ({ lineData, bar1Data, bar2Data }) => {
  const data = {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: 'Difference',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 2,
        fill: false,
        data: lineData,
      },
      {
        type: 'bar' as const,
        label: 'Expenses',
        backgroundColor: 'rgb(255, 99, 132)',
        data: bar1Data,
        borderColor: 'white',
        borderWidth: 2,
      },
      {
        type: 'bar' as const,
        label: 'Income',
        backgroundColor: 'rgb(75, 192, 192)',
        data: bar2Data,
      },
    ],
  };

  return <Chart type="bar" data={data} width={500} height={500} />;
};

export default MultiTypeChart;
