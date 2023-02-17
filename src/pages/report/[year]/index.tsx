import React, { ChangeEvent, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { YearlyReportTable } from '../../../types/transaction';
import Table, { TableHeader } from '../../../components/Table/Table';
import { formatNumberAsCurrency } from '../../../utils/formatNumberAsCurrency';
import Button from '../../../components/Button/Button';
import Title from '../../../components/Title/Title';
import {
  ModalActionType,
  useModalDispatch,
} from '../../../context/Modal/ModalProvider';
import { ModalType } from '../../../types/modal';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import {
  useDeleteYearlyReport,
  useYearlyReport,
  useYears,
} from '../../../utils/useApi';

const YearlyReport: NextPage = () => {
  const { t } = useTranslation();
  const dispatch = useModalDispatch();
  const router = useRouter();

  const headers: TableHeader<YearlyReportTable>[] = [
    { label: t('month'), accessor: 'month' },
    { label: t('income'), accessor: 'income' },
    { label: t('expenses'), accessor: 'expenses' },
    { label: t('balance'), accessor: 'balance' },
    { label: t('transactions'), accessor: 'transactions' },
  ];

  const query =
    typeof router.query.year === 'string' ? +router.query.year : undefined;
  const [year, setYear] = useState(query || new Date().getFullYear());

  const { data, isLoading, refetch: fetchReports } = useYearlyReport(year);

  const months = data?.months.map((data) => {
    return {
      ...data,
      month: t(`${data.month}`),
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
  } = useYears();

  const { mutateAsync } = useDeleteYearlyReport(fetchReports);

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
      await toast.promise(mutateAsync({ id: data.id }), {
        loading: t('deleting'),
        success: t('deleted'),
        error: (err) => err.message,
      });
      await refetchOptions();
      await router.push(`/report/${years[0].year}`);
      setYear(years[0].year);
    } catch (e) {
      console.error(e);
    }
  };

  const openDeleteModal = () => {
    dispatch({
      type: ModalActionType.ADD_MODAL,
      payload: {
        type: ModalType.DELETE,
        title: t('delete_report'),
        body: t('delete_report_warning'),
        action: handleDeleteYearlyReport,
      },
    });
  };

  return (
    <>
      <Title
        title={t('yearly_report')}
        subtitle={t('yearly_report_subtitle')}
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
              label={t('delete_report')}
              classNames={'w-full sm:w-fit sm:ml-4 mt-2'}
              onClick={openDeleteModal}
            />
          </div>
          <Button
            onClick={handleButtonClick}
            classNames={'mt-2'}
            label={t('create_report')}
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
