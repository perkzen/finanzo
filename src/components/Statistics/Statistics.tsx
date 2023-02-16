import React, { FC } from 'react';
import StatCard from './StatCard';
import { Statistic } from '../../types/statistics';
import { GiMoneyStack, GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import { GrTransaction } from 'react-icons/gr';
import { useTranslation } from 'react-i18next';
import { useAccountBalance } from '../../utils/useApi';

const Statistics: FC = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useAccountBalance();

  const stats: Statistic[] = [
    {
      icon: <GiPayMoney />,
      title: t('expenses'),
      value: data?.expenses,
      type: 'currency',
    },
    {
      icon: <GiReceiveMoney />,
      title: t('income'),
      value: data?.income,
      type: 'currency',
    },
    {
      icon: <GiMoneyStack />,
      title: t('balance'),
      value: data?.balance,
      type: 'currency',
    },
    {
      icon: <GrTransaction />,
      title: t('transactions'),
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
