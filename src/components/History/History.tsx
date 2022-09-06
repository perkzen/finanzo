import React, { FC } from 'react';
import Table, { TableHeader } from '../Table/Table';
import { TransactionTable } from '../../types/finances';
import { format } from 'date-fns';

const headers: TableHeader<TransactionTable>[] = [
  { label: 'Category', accessor: 'category' },
  { label: 'Date', accessor: 'createdAt' },
  { label: 'Amount', accessor: 'amount' },
];

const History: FC = () => {
  return (
    <div className={'flex flex-col py-5'}>
      <h1 className={'font-bold text-2xl'}>History</h1>
      <h2 className={'text-gray-500'}>Last 3 transactions</h2>
      <div className={'w-full'}>
        <Table
          data={[
            {
              category: 'Car insurance',
              createdAt: format(new Date(), 'dd.MM.yyyy'),
              amount: 100,
            },
            {
              category: 'Car',
              createdAt: format(new Date(), 'dd.MM.yyyy'),
              amount: 100,
            },
            {
              category: 'Memd dsadasd dadsada',
              createdAt: format(new Date(), 'dd.MM.yyyy'),
              amount: 100,
            },
          ]}
          headers={headers}
          showHeader={false}
          onRowClick={(item) => console.log(item)}
        />
      </div>
    </div>
  );
};

export default History;
