import React, { FC } from 'react';
import Table, { TableHeader } from '../Table/Table';
import { TransactionTable } from '../../types/transaction';
import { trpc } from '../../utils/trpc';
import { formatNumberAsCurrency } from '../../utils/formatNumberAsCurrency';
import { formatDate, getMonthName } from '../../utils/date';
import { useRouter } from 'next/router';

const headers: TableHeader<TransactionTable>[] = [
  { label: 'Display name', accessor: 'displayName' },
  { label: 'Date', accessor: 'createdAt' },
  { label: 'Amount', accessor: 'amount' },
];

const History: FC = () => {
  const router = useRouter();
  const { data, isLoading } = trpc.useQuery([
    'transactions.get-transaction-history',
    { limit: 3 },
  ]);

  const transactions = data?.map((item) => {
    return {
      ...item,
      amount: formatNumberAsCurrency(item.amount),
      createdAt: formatDate(item.createdAt),
    };
  });

  const handleOnRowClick = async (item: { id: string }) => {
    if (!data) return;
    const found = data.find((i) => i.id === item.id);
    if (!found) return;
    const year = found?.createdAt.getFullYear();
    const month = getMonthName(found.createdAt.getMonth());
    await router.push(`/report/${year}/${month}`);
  };

  return (
    <div className={'flex flex-col py-5'}>
      <h1 className={'font-bold text-2xl'}>History</h1>
      <h2 className={'text-gray-500'}>Last 3 transactions</h2>
      <Table
        data={transactions || []}
        isLoading={isLoading}
        headers={headers}
        showHeader={false}
        onRowClick={(item) => handleOnRowClick(item)}
      />
    </div>
  );
};

export default History;
