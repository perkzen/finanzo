import React from 'react';
import { useRouter } from 'next/router';
import Table, { TableHeader } from '../components/Table/Table';
import Card from '../components/Card/Card';
import classes from '../styles/Month.module.scss';
import { trpc } from '../utils/trpc';
import { format } from 'date-fns';

const headers: TableHeader<{
  createdAt: string;
  amount: string;
  description: string | null;
  type: string;
}>[] = [
  { label: 'Date', accessor: 'createdAt' },
  {
    label: 'Amount',
    accessor: 'amount',
  },
  { label: 'Description', accessor: 'description' },
  { label: 'Type', accessor: 'type' },
];

const MonthlyReport = () => {
  const router = useRouter();
  const { data } = trpc.useQuery([
    'finances.get-monthly-report-by-id',
    { id: router.query.monthlyReport?.[1] as string },
  ]);

  const tableData = data?.Expense.map((item) => ({
    ...item,
    amount: `${item.amount} €`,
    createdAt: format(item.createdAt, 'dd.MM.yyyy'),
  }));

  return (
    <div className={classes.Container}>
      <div className={classes.Table}>
        <Table
          data={tableData ? tableData : []}
          headers={headers}
          title={router.query.monthlyReport?.[0] + ' report'}
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

          <select
            className="select select-accent w-full"
            defaultValue={'Expense'}
          >
            <option>Expense</option>
            <option>Income</option>
          </select>

          <button className={'btn btn-accent'}>SAVE</button>
        </form>
      </Card>
    </div>
  );
};

export default MonthlyReport;
