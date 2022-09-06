import React, { ReactNode } from 'react';
import { NextPage } from 'next';
import classes from '../styles/Finances.module.scss';
import Statistics from '../components/Statistics/Statistics';
import { trpc } from '../utils/trpc';

import { GiMoneyStack, GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import History from '../components/History/History';
import BarChart from '../components/BarChart/BarChart';
import Title from '../components/Title/Title';

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
    <div className={'py-5 mt-10 px-20 flex flex-col w-5/6 gap-8 '}>
      <div>
        <Title
          title={'Dashboard'}
          subtitle={'Newest information about transactions'}
          className={'mb-5'}
        />
        <Statistics stats={stats} />
      </div>
      <History />
      <BarChart />
    </div>
  );
};

export default Finances;
