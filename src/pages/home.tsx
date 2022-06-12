import React, { useState } from 'react';
import { NextPage } from 'next';
import classes from '../styles/Home.module.scss';
import Card from '../components/Card/Card';
import Table, { TableHeader } from '../components/Table/Table';
import Stats from '../components/Stats/Stats';
import PieChart from '../components/PieChart/PieChart';
import { useRouter } from 'next/router';
import { classNames } from '../utils/classNames';
import { signOut } from 'next-auth/react';

const headers: TableHeader<any>[] = [
  { label: 'Month', accessor: 'month' },
  {
    label: 'Income',
    accessor: 'income',
  },
  { label: 'Expense', accessor: 'expense' },
  { label: 'Balance', accessor: 'balance' },
];

const data = [
  { month: 'January', income: '$100', expense: '$50', balance: '$50' },
  { month: 'February', income: '$200', expense: '$100', balance: '$100' },
  { month: 'March', income: '$300', expense: '$150', balance: '$50' },
  { month: 'April', income: '$400', expense: '$200', balance: '$100' },
  { month: 'May', income: '$500', expense: '$250', balance: '$150' },
  { month: 'June', income: '$600', expense: '$300', balance: '$200' },
  { month: 'July', income: '$700', expense: '$350', balance: '$250' },
  { month: 'August', income: '$800', expense: '$400', balance: '$300' },
  { month: 'September', income: '$900', expense: '$450', balance: '$350' },
  { month: 'October', income: '$1000', expense: '$500', balance: '$400' },
  { month: 'November', income: '$1100', expense: '$550', balance: '$450' },
  { month: 'December', income: '$1200', expense: '$600', balance: '$500' },
];

const Home: NextPage = () => {
  const [selected, setSelected] = useState('Income Analysis');
  const router = useRouter();

  const handleRowClick = async (item: any) => {
    await router.push(`/[month]`, `/${item.month}`);
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
            data={data}
            onRowClick={handleRowClick}
            title={''}
          />
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
            </div>
            <PieChart title={'Income Analysis'} />
          </Card>
          <Stats income={400} expense={600} />
        </div>
      </div>
    </>
  );
};

export default Home;
