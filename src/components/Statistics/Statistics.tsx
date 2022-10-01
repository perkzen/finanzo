import React, { FC } from 'react';
import StatCard from './StatCard';
import { Statistic } from '../../types/statistics';
import { trpc } from '../../utils/trpc';
import { GiMoneyStack, GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import { GrTransaction } from 'react-icons/gr';

const Statistics: FC = () => {
  const { data, isLoading } = trpc.useQuery(['account.get-balance']);

  const stats: Statistic[] = [
    {
      icon: <GiPayMoney />,
      title: 'Expenses',
      value: data?.expenses,
      type: 'currency',
    },
    {
      icon: <GiReceiveMoney />,
      title: 'Income',
      value: data?.income,
      type: 'currency',
    },
    {
      icon: <GiMoneyStack />,
      title: 'Balance',
      value: data?.balance,
      type: 'currency',
    },
    {
      icon: <GrTransaction />,
      title: 'Transactions',
      value: data?.transactions,
      type: 'number',
    },
  ];

  return (
    <div
      className={
        'flex flex-col w-full sm:flex-row justify-evenly flex-wrap gap-5'
      }
    >
      {stats.map((item, index) => (
        <StatCard key={index} stat={item} isLoading={isLoading} />
      ))}
    </div>
  );
};
export default Statistics;
