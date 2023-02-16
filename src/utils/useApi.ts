import { trpc } from './trpc';
import { ChartData } from 'chart.js';
import { getPastMonthsAsArray, useMonths } from './date';
import { useTranslation } from 'react-i18next';

export const useAccountBalanceDataOverYear = (year?: number) => {
  const { t } = useTranslation();
  const months = useMonths();
  const { data } = trpc.useQuery([
    'analytics.get-account-balance-data-over-year',
    { year: year || new Date().getFullYear() },
  ]);

  const chartData: ChartData<'line', number[], string> = {
    labels: getPastMonthsAsArray(months, new Date().getMonth() + 1),
    datasets: [
      {
        label: t('account_balance'),
        data: data ? data : [],
        borderColor: '#171617',
        backgroundColor: '#171617',
      },
    ],
  };

  return chartData;
};

export const useYears = () => {
  return trpc.useQuery(['reports.get-years']);
};

export const useYearlyReportData = (year: number) => {
  const { t } = useTranslation();
  const monthsArray = useMonths();

  const { data } = trpc.useQuery(['analytics.get-data-by-year', { year }]);

  const balanceData: ChartData<'bar', number[], string> = {
    labels: monthsArray,
    datasets: [
      {
        label: t('expenses'),
        data: data ? data.expenses : [],
        backgroundColor: '#da2653',
      },
      {
        label: t('incomes'),
        data: data ? data.incomes : [],
        backgroundColor: '#35e178',
      },
    ],
  };

  const transactionData: ChartData<'bar', number[], string> = {
    labels: monthsArray,
    datasets: [
      {
        label: t('transactions'),
        data: data ? data.transactions : [],
        backgroundColor: '#313030',
      },
    ],
  };

  return { balanceData, transactionData };
};

export const useTransactionsByMonth = (year: number, month: string) => {
  return trpc.useQuery([
    'transactions.get-transactions-by-month',
    { month, year },
  ]);
};

export const useDeleteTransaction = () => {
  return trpc.useMutation(['transactions.delete-transaction']);
};

export const useCreateTransaction = () => {
  return trpc.useMutation(['transactions.create-transaction']);
};

export const useCreateYearlyReport = () => {
  return trpc.useMutation('reports.create-yearly-report');
};
