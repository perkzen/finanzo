import React, { ChangeEvent, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { YearlyReportTable } from '../../../types/transaction';
import Table, { TableHeader } from '../../../components/Table/Table';
import { formatNumberAsCurrency } from '../../../utils/formatNumberAsCurrency';
import Button from '../../../components/Button/Button';
import Title from '../../../components/Title/Title';
import { trpc } from '../../../utils/trpc';
import {
  ModalActionType,
  useModalDispatch,
} from '../../../context/Modal/ModalProvider';
import { ModalType } from '../../../types/modal';

const headers: TableHeader<YearlyReportTable>[] = [
  { label: 'Month', accessor: 'month' },
  { label: 'Income', accessor: 'income' },
  { label: 'Expenses', accessor: 'expenses' },
  { label: 'Differance', accessor: 'balance' },
  { label: 'Transactions', accessor: 'transactions' },
];

const YearlyReport: NextPage = () => {
  const dispatch = useModalDispatch();
  const router = useRouter();

  const query =
    typeof router.query.year === 'string' ? +router.query.year : undefined;
  const [year, setYear] = useState(query || new Date().getFullYear());

  const { data, isLoading } = trpc.useQuery([
    'reports.get-yearly-report-by-id',
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

  const handleButtonClick = () => {
    dispatch({
      type: ModalActionType.ADD_MODAL,
      payload: { type: ModalType.CREATE_YEARLY_REPORT },
    });
  };

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setYear(+e.target.value);
  };

  const { data: years, isLoading: isLoadingOptions } = trpc.useQuery([
    'reports.get-years',
  ]);

  return (
    <div className={'py-5 mt-10 px-20 flex flex-col w-5/6 gap-8'}>
      <Title
        title={'Yearly report'}
        subtitle={'All finances information for selected year'}
      />
      <div className={'flex flex-col w-full'}>
        <div className={'flex flex-row justify-between'}>
          <select
            onChange={handleYearChange}
            disabled={isLoadingOptions && !years}
            className={'w-1/3 shadow-md p-2 mt-2 rounded-lg'}
          >
            {years && (
              <>
                {years.map(({ year }) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </>
            )}
          </select>
          <Button
            onClick={handleButtonClick}
            color={'blue'}
            label={'Create report'}
          />
        </div>
        <Table
          data={months || []}
          headers={headers}
          align={'center'}
          isLoading={isLoading}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
};
export default YearlyReport;
