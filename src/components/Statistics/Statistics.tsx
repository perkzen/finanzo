import React, { FC } from 'react';
import StatCard from './StatCard';
import { Statistic } from '../../types/statistics';
import { trpc } from '../../utils/trpc';
import { GiMoneyStack, GiPayMoney, GiReceiveMoney } from 'react-icons/gi';

const Statistics: FC = () => {
  const { data, isLoading } = trpc.useQuery(['account.get-balance']);

  const stats: Statistic[] = [
    { icon: <GiPayMoney />, title: 'Expenses', value: data?.expenses },
    { icon: <GiReceiveMoney />, title: 'Income', value: data?.income },
    { icon: <GiMoneyStack />, title: 'Balance', value: data?.balance },
  ];

  return (
    <div className={'flex flex-col sm:flex-row gap-5 sm:gap-10'}>
      {stats.map((item, index) => (
        <StatCard key={index} stat={item} isLoading={isLoading} />
      ))}
    </div>
  );
};
export default Statistics;
