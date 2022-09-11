import React from 'react';
import { NextPage } from 'next';
import Statistics from '../components/Statistics/Statistics';
import History from '../components/History/History';
import Title from '../components/Title/Title';

const Dashboard: NextPage = () => {
  return (
    <div className={'py-5 mt-10 px-20 flex flex-col w-5/6 gap-8'}>
      <Title
        title={'Dashboard'}
        subtitle={'Payments updates'}
        className={'mb-5'}
      />
      <Statistics />
      <History />
      {/*<BarChart />*/}
    </div>
  );
};

export default Dashboard;
