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
import { toast } from 'react-hot-toast';

const headers: TableHeader<YearlyReportTable>[] = [
  { label: 'Month', accessor: 'month' },
  { label: 'Income', accessor: 'income' },
  { label: 'Expenses', accessor: 'expenses' },
  { label: 'Balance', accessor: 'balance' },
  { label: 'Transactions', accessor: 'transactions' },
];

const YearlyReport: NextPage = () => {
  const dispatch = useModalDispatch();
  const router = useRouter();

  const query =
    typeof router.query.year === 'string' ? +router.query.year : undefined;
  const [year, setYear] = useState(query || new Date().getFullYear());

  const {
    data,
    isLoading,
    refetch: fetchReports,
  } = trpc.useQuery(['reports.get-yearly-report-by-id', { year }]);

  const months = data?.months.map((data) => {
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

  const handleYearChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    setYear(+e.target.value);
    await router.push(`/report/${e.target.value}`);
  };

  const {
    data: years,
    isLoading: isLoadingOptions,
    refetch: refetchOptions,
  } = trpc.useQuery(['reports.get-years']);

  const { mutateAsync } = trpc.useMutation('reports.delete-yearly-report', {
    onSuccess: async () => {
      await fetchReports();
    },
  });

  const handleButtonClick = () => {
    dispatch({
      type: ModalActionType.ADD_MODAL,
      payload: {
        type: ModalType.CREATE_YEARLY_REPORT,
        callback: refetchOptions,
      },
    });
  };

  const handleDeleteYearlyReport = async () => {
    if (!query || !data || !years) return;
    try {
      await toast.promise(mutateAsync({ reportId: data.id }), {
        loading: 'Deleting...',
        success: 'Deleted',
        error: (err) => err.message,
      });
      await refetchOptions();
      await router.push(`/report/${years[0].year}`);
      setYear(years[0].year);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Title
        title={'Yearly report'}
        subtitle={'All finances information for selected year'}
      />
      <div className={'flex flex-col w-full'}>
        <div className={'flex flex-col sm:flex-row justify-between'}>
          <div className={'sm:w-1/2'}>
            <select
              onChange={handleYearChange}
              disabled={isLoadingOptions && !years}
              className={'w-full sm:w-1/2 shadow-md p-2 mt-2 rounded-lg'}
              value={year}
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
              label={'Delete report'}
              classNames={'w-full sm:w-fit sm:ml-4 mt-2'}
              onClick={handleDeleteYearlyReport}
            />
          </div>
          <Button
            onClick={handleButtonClick}
            classNames={'mt-2'}
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
    </>
  );
};
export default YearlyReport;
