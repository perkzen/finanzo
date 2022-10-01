import React from 'react';
import { NextPage } from 'next';
import Statistics from '../components/Statistics/Statistics';
import History from '../components/History/History';
import Title from '../components/Title/Title';
import { trpc } from '../utils/trpc';
import { ChartData } from 'chart.js';
import { getPastMonthsAsArray } from '../utils/date';
import LineChart from '../components/LineChart/LineChart';

const Dashboard: NextPage = () => {
  const { data } = trpc.useQuery([
    'analytics.get-account-balance-data-over-year',
    { year: new Date().getFullYear() },
  ]);
  const chartData: ChartData<'line', number[], string> = {
    labels: getPastMonthsAsArray(new Date().getMonth() + 1),
    datasets: [
      {
        label: 'Balance',
        data: data ? data : [],
        borderColor: '#171617',
        backgroundColor: '#171617',
      },
    ],
  };

  return (
    <>
      <Title
        title={'Dashboard'}
        subtitle={'Payments updates'}
        className={'mb-5'}
      />
      <Statistics />
      <History />
      <div className={'flex flex-col gap-4'}>
        <Title title={'Balance'} subtitle={'Your balance over the year'} />
        <LineChart data={chartData} title={'Balance graph'} height={'100px'} />
      </div>
    </>
  );
};

export default Dashboard;
