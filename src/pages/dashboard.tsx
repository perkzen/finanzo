import React from 'react';
import { NextPage } from 'next';
import Statistics from '../components/Statistics/Statistics';
import History from '../components/History/History';
import Title from '../components/Title/Title';
import BarChart from '../components/BarChart/BarChart';

const Dashboard: NextPage = () => {
  return (
    <>
      <Title
        title={'Dashboard'}
        subtitle={'Payments updates'}
        className={'mb-5'}
      />
      <Statistics />
      <History />
      <BarChart />
    </>
  );
};

export default Dashboard;
