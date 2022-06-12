import React, { useState } from 'react';
import { NextPage } from 'next';
import classes from '../styles/Finances.module.scss';
import Card from '../components/Card/Card';
import Table, { TableHeader } from '../components/Table/Table';
import Stats from '../components/Stats/Stats';
import PieChart from '../components/PieChart/PieChart';
import { useRouter } from 'next/router';
import { classNames } from '../utils/classNames';
import { signOut } from 'next-auth/react';
import { trpc } from '../utils/trpc';
import { MonthlyReportTable } from '../types/finances';
import MultiTypeChart from '../components/MultiTypeChart/MultiTypeChart';

const headers: TableHeader<MonthlyReportTable>[] = [
  { label: 'Month', accessor: 'month' },
  {
    label: 'Income',
    accessor: 'income',
  },
  { label: 'Expense', accessor: 'expense' },
  { label: 'Balance', accessor: 'balance' },
];

const Finances: NextPage = () => {
  const { data } = trpc.useQuery([
    'finances.get-yearly-report',
    { year: 2022 },
  ]);
  const [selected, setSelected] = useState<
    'Income Analysis' | 'Expenses Analysis' | 'Balance Analysis'
  >('Income Analysis');
  const router = useRouter();

  const handleRowClick = async (item: any) => {
    await router.push(`/[...monthlyReport]`, `/${item.month}/${item.id}`);
  };

  const tableData = data?.map((item) => {
    return {
      ...item,
      income: `${item.income} €`,
      expense: `${item.expense} €`,
      balance: `${item.income - item.expense} €`,
    };
  });

  const incomeGraph = trpc.useQuery([
    'analytics.get-income-report',
    { year: 2022 },
  ]);

  const expenseGraph = trpc.useQuery([
    'analytics.get-expense-report',
    { year: 2022 },
  ]);

  const income = data?.reduce((acc, item) => acc + item.income, 0) || 0;
  const expense = data?.reduce((acc, item) => acc + item.expense, 0) || 0;

  const incomeLabels = incomeGraph?.data?.map((item) => item[0]) || [];
  const incomeData = incomeGraph?.data?.map((item) => item[1]) || [];
  const expenseLabels = expenseGraph?.data?.map((item) => item[0]) || [];
  const expenseData = expenseGraph?.data?.map((item) => item[1]) || [];

  const bar1data = data?.map((item) => item.expense) || [];
  const bar2data = data?.map((item) => item.income) || [];
  const lineData = data?.map((item) => item.income - item.expense) || [];

  const renderGraph = () => {
    switch (selected) {
      case 'Income Analysis':
        return <PieChart numbers={incomeData} labels={incomeLabels} />;
      case 'Expenses Analysis':
        return <PieChart numbers={expenseData} labels={expenseLabels} />;
      case 'Balance Analysis':
        return (
          <MultiTypeChart
            lineData={lineData}
            bar2Data={bar2data}
            bar1Data={bar1data}
          />
        );
    }
  };

  return (
    <>
      <div className={classes.Container}>
        <div className={classes.TableContainer}>
          <select className="select select-accent w-full" defaultValue={'2022'}>
            <option>2022</option>
          </select>
          <Table
            headers={headers}
            data={tableData ? tableData : []}
            onRowClick={handleRowClick}
            title={''}
          />
          <Stats income={income} expense={expense} />
        </div>

        <div className={'flex flex-col justify-evenly gap-5 '}>
          <button
            className={'btn self-end'}
            onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
          >
            Logout
          </button>
          <Card className={'p-2'}>
            <div className="tabs">
              <a
                className={classNames(
                  'tab tab-bordered',
                  selected === 'Income Analysis' ? 'tab-active' : ''
                )}
                onClick={() => setSelected('Income Analysis')}
              >
                Income Analysis
              </a>
              <a
                className={classNames(
                  'tab tab-bordered',
                  selected === 'Expenses Analysis' ? 'tab-active' : ''
                )}
                onClick={() => setSelected('Expenses Analysis')}
              >
                Expenses Analysis
              </a>
              <a
                className={classNames(
                  'tab tab-bordered',
                  selected === 'Balance Analysis' ? 'tab-active' : ''
                )}
                onClick={() => setSelected('Balance Analysis')}
              >
                Balance Analysis
              </a>
            </div>
            <MultiTypeChart
              lineData={lineData}
              bar2Data={bar2data}
              bar1Data={bar1data}
            />
          </Card>
        </div>
      </div>
    </>
  );
};

export default Finances;
