import React, { useState } from 'react';
import { NextPage } from 'next';
import Title from '../components/Title/Title';
import Table, { TableHeader } from '../components/Table/Table';
import { YearlyReportTable } from '../types/transaction';
import { formatNumberAsCurrency } from '../utils/formatNumberAsCurrency';
import Button from '../components/Button/Button';

const headers: TableHeader<YearlyReportTable>[] = [
  { label: 'Month', accessor: 'month' },
  { label: 'Income', accessor: 'income' },
  { label: 'Expenses', accessor: 'expense' },
  { label: 'Differance', accessor: 'balance' },
  { label: 'Transactions', accessor: 'numberOfTransactions' },
];
const tdata = [
  {
    month: 'January',
    income: 100,
    expense: 50,
    balance: 50,
    numberOfTransactions: 10,
  },
  {
    month: 'February',
    income: 100,
    expense: 50,
    balance: 50,
    numberOfTransactions: 10,
  },
  {
    month: 'March',
    income: 100,
    expense: 50,
    balance: 50,
    numberOfTransactions: 10,
  },
  {
    month: 'April',
    income: 100,
    expense: 50,
    balance: 50,
    numberOfTransactions: 10,
  },
];

const YearlyReport: NextPage = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const tableData = tdata.map((data) => {
    return {
      ...data,
      income: formatNumberAsCurrency(data.income),
      expense: formatNumberAsCurrency(data.expense),
      balance: formatNumberAsCurrency(data.balance),
    };
  });

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
          data={tableData}
          headers={headers}
          align={'center'}
          onRowClick={() => 1}
        />
      </div>
    </div>
  );
};
export default YearlyReport;
