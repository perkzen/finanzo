import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { YearlyReportTable } from '../../../types/transaction';
import Table, { TableHeader } from '../../../components/Table/Table';
import { formatNumberAsCurrency } from '../../../utils/formatNumberAsCurrency';
import Button from '../../../components/Button/Button';
import Title from '../../../components/Title/Title';
import { trpc } from '../../../utils/trpc';

const headers: TableHeader<YearlyReportTable>[] = [
  { label: 'Month', accessor: 'month' },
  { label: 'Income', accessor: 'income' },
  { label: 'Expenses', accessor: 'expenses' },
  { label: 'Differance', accessor: 'balance' },
  { label: 'Transactions', accessor: 'transactions' },
];

const YearlyReport: NextPage = () => {
  const router = useRouter();
  const query =
    typeof router.query.year === 'string' ? +router.query.year : undefined;
  const [year, setYear] = useState(query || new Date().getFullYear());
  const { data, isLoading } = trpc.useQuery([
    'reports.get-yearly-report',
    { year },
  ]);

  const months = data?.map((data) => {
    return {
      ...data,
      income: formatNumberAsCurrency(data.income),
      expenses: formatNumberAsCurrency(data.expenses),
      balance: formatNumberAsCurrency(data.balance),
    };
  });

  const handleRowClick = async (row: YearlyReportTable) => {
    await router.push(`/report/${year}/${row.month}`);
  };

  return (
    <div className={'py-5 mt-10 px-20 flex flex-col w-5/6 gap-8'}>
      <Title
        title={'YearlyReport'}
        subtitle={'All finances information for selected year'}
      />
      <div className={'flex flex-col w-full'}>
        <div className={'flex flex-row justify-between'}>
          <select className={'w-1/3 shadow-md p-2 mt-2 rounded-lg'}>
            <option value={2022}>2022</option>
          </select>
          <Button color={'blue'} label={'Add year'} />
        </div>

        <Table
          data={months || []}
          headers={headers}
          align={'center'}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
};
export default YearlyReport;
