import React from 'react';
import { useRouter } from 'next/router';
import Table, { TableHeader } from '../components/Table/Table';
import Card from '../components/Card/Card';
import classes from '../styles/Month.module.scss';

const headers: TableHeader<any>[] = [
  { label: 'Date', accessor: 'date' },
  {
    label: 'Amount',
    accessor: 'amount',
  },
  { label: 'Description', accessor: 'description' },
  { label: 'Type', accessor: 'type' },
];

const data = [
  { date: '2020-01-01', amount: '$100', description: 'Salary', type: 'Income' },
  { date: '2020-01-02', amount: '$200', description: 'Rent', type: 'Expense' },
  { date: '2020-01-03', amount: '$300', description: 'Food', type: 'Expense' },
  {
    date: '2020-01-04',
    amount: '$400',
    description: 'Grocery',
    type: 'Expense',
  },
  {
    date: '2020-01-05',
    amount: '$500',
    description: 'Clothes',
    type: 'Expense',
  },
  {
    date: '2020-01-06',
    amount: '$600',
    description: 'Entertainment',
    type: 'Expense',
  },
  {
    date: '2020-01-07',
    amount: '$700',
    description: 'Transport',
    type: 'Expense',
  },
];

const Month = () => {
  const router = useRouter();
  return (
    <div className={classes.Container}>
      <div className={classes.Table}>
        <Table
          data={data}
          headers={headers}
          title={(router.query.month as string) + ' report'}
        />
      </div>
      <Card className={classes.Form}>
        <h1 className={'text-2xl text-center font-bold my-2'}>Add Item</h1>
        <form className={'flex flex-col gap-4 w-full justify-center'}>
          <input
            type="text"
            placeholder="Amount"
            className="input input-bordered input-accent w-full "
          />
          <input
            type="text"
            placeholder="Description"
            className="input input-bordered input-accent w-full "
          />

          <select className="select select-accent w-full ">
            <option disabled selected>
              Item type
            </option>
            <option>Expense</option>
            <option>Income</option>
          </select>

          <button className={'btn btn-accent'}>SAVE</button>
        </form>
      </Card>
    </div>
  );
};

export default Month;
