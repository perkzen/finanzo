import React, { FC } from 'react';
import Table, { TableHeader } from '../Table/Table';
import { TransactionTable } from '../../types/finances';
import { format } from 'date-fns';
import { trpc } from '../../utils/trpc';

const headers: TableHeader<TransactionTable>[] = [
  { label: 'Description', accessor: 'description' },
  { label: 'Date', accessor: 'createdAt' },
  { label: 'Amount', accessor: 'amount' },
];

const History: FC = () => {
  const { data, isLoading } = trpc.useQuery([
    'transactions.get-transaction-history',
    { limit: 3 },
  ]);

  const transactions = data?.map((item) => {
    return {
      ...item,
      createdAt: format(new Date(item.createdAt), 'dd.MM.yyyy'),
    };
  });

  return (
    <div className={'flex flex-col py-5'}>
      <h1 className={'font-bold text-2xl'}>History</h1>
      <h2 className={'text-gray-500'}>Last 3 transactions</h2>
      <div className={'w-full'}>
        <Table
          data={transactions || []}
          isLoading={isLoading}
          headers={headers}
          showHeader={false}
          onRowClick={(item) => console.log(item)}
        />
      </div>
    </div>
  );
};

export default History;
