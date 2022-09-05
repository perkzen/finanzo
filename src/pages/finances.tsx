import React, { ReactNode } from 'react';
import { NextPage } from 'next';
import classes from '../styles/Finances.module.scss';
import Statistics from '../components/Statistics/Statistics';
import { trpc } from '../utils/trpc';

import { GiMoneyStack, GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import History from '../components/History/History';

const Finances: NextPage = () => {
  const { data, isLoading } = trpc.useQuery([
    'finances.get-yearly-report',
    { year: 2022 },
  ]);

  // const router = useRouter();

  // const handleRowClick = async (item: any) => {
  //   await router.push(`/[...monthlyReport]`, `/${item.month}/${item.id}`);
  // };

  const income = data?.reduce((acc, item) => acc + item.income, 0) || 0;
  const expense = data?.reduce((acc, item) => acc + item.expense, 0) || 0;

  const stats: { icon: ReactNode; title: string; value: number }[] = [
    { icon: <GiPayMoney />, title: 'Expenses', value: expense },
    { icon: <GiReceiveMoney />, title: 'Income', value: income },
    { icon: <GiMoneyStack />, title: 'Balance', value: income - expense },
  ];

  return (
    <div className={classes.Container}>
      <Statistics stats={stats} />
      <History />
    </div>
  );
};

export default Finances;
