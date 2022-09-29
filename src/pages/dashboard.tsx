import React from 'react';
import { NextPage } from 'next';
import Statistics from '../components/Statistics/Statistics';
import History from '../components/History/History';
import Title from '../components/Title/Title';

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
      {/*<BarChart />*/}
    </>
  );
};

export default Dashboard;
