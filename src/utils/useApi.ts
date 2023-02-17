import { trpc } from './trpc';
import { ChartData } from 'chart.js';
import { getPastMonthsAsArray, useMonths } from './date';
import { useTranslation } from 'react-i18next';

// Accounts
export const useAccountBalance = () => {
  return trpc.accounts.getBalance.useQuery();
};

export const useUser = () => {
  return trpc.accounts.getUser.useQuery();
};

// Analytics

export const useAccountBalanceDataOverYear = (year?: number) => {
  const { t } = useTranslation();
  const months = useMonths();
  const { data } = trpc.analytics.getAccountBalanceDataOverYear.useQuery({
    year: year || new Date().getFullYear(),
  });

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

export const useYearlyReportData = (year: number) => {
  const { t } = useTranslation();
  const monthsArray = useMonths();
  const { data } = trpc.analytics.getDataByYear.useQuery({ year });

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

// Reports

export const useYearlyReport = (year: number) => {
  return trpc.reports.getYearlyReportById.useQuery({ year });
};

export const useDeleteYearlyReport = (cb: () => any) => {
  return trpc.reports.deleteYearlyReport.useMutation({
    onSuccess: async () => {
      await cb();
    },
  });
};

export const useYears = () => {
  return trpc.reports.getYears.useQuery();
};

export const useCreateYearlyReport = () => {
  return trpc.reports.createYearlyReport.useMutation();
};

// Transactions
export const useTransactionsByMonth = (year: number, month: string) => {
  return trpc.transactions.getTransactionsByMonth.useQuery({ month, year });
};

export const useDeleteTransaction = () => {
  return trpc.transactions.deleteTransaction.useMutation();
};

export const useCreateTransaction = () => {
  return trpc.transactions.createTransaction.useMutation();
};

export const useTransactionHistory = () => {
  return trpc.transactions.getTransactionHistory.useQuery({ limit: 3 });
};

export const useUpcomingTransactions = () => {
  return trpc.transactions.getUpcomingTransactions.useQuery();
};
