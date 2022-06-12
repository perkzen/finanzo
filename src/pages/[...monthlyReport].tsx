import React from 'react';
import { useRouter } from 'next/router';
import Table, { TableHeader } from '../components/Table/Table';
import Card from '../components/Card/Card';
import classes from '../styles/Month.module.scss';
import { trpc } from '../utils/trpc';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { CreateExpenseInputType } from '../shared/create-expense-validator';

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
  const { data, refetch } = trpc.useQuery([
    'finances.get-monthly-report-by-id',
    { id: router.query.monthlyReport?.[1] as string },
  ]);

  const tableData = data?.Expense.map((item) => ({
    ...item,
    amount: `${item.amount} €`,
    createdAt: format(item.createdAt, 'dd.MM.yyyy'),
  }));

  const { register, handleSubmit, reset } = useForm<CreateExpenseInputType>({
    defaultValues: {
      amount: undefined,
      description: '',
      type: 'Expense',
      monthlyReportId: router.query.monthlyReport?.[1] as string,
      createdAt: undefined,
    },
  });

  const { mutate } = trpc.useMutation('expenses.create-expense', {
    onSuccess: async () => {
      await refetch();
      reset();
    },
  });

  const onSubmit = async (data: CreateExpenseInputType) => {
    mutate(data);
  };

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
        <form
          className={'flex flex-col gap-4 w-full justify-center'}
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register('amount', {
              required: true,
              valueAsNumber: true,
              min: 0,
            })}
            type="number"
            placeholder="Amount"
            className="input input-bordered input-accent w-full "
          />
          <input
            {...register('description', { required: true })}
            type="text"
            placeholder="Description"
            className="input input-bordered input-accent w-full "
          />

          <select
            {...register('type', { required: true })}
            className="select select-accent w-full"
            defaultValue={'Expense'}
          >
            <option>Expense</option>
            <option>Income</option>
          </select>

          <input
            {...register('createdAt', { required: false, valueAsDate: true })}
            type={'date'}
            className="input input-bordered input-accent w-full "
          />

          <button className={'btn btn-accent'} type={'submit'}>
            SAVE
          </button>
        </form>
      </Card>
    </div>
  );
};

export default MonthlyReport;
