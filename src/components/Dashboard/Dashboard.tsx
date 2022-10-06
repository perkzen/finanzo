import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { trpc } from '../../utils/trpc';
import { ChartData } from 'chart.js';
import { getPastMonthsAsArray, useMonths } from '../../utils/date';
import Title from '../Title/Title';
import Statistics from '../Statistics/Statistics';
import History from '../History/History';
import LineChart from '../LineChart/LineChart';

const Dashboard: FC = () => {
  const { t } = useTranslation();
  const months = useMonths();
  const { data } = trpc.useQuery([
    'analytics.get-account-balance-data-over-year',
    { year: new Date().getFullYear() },
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

  return (
    <>
      <Title
        title={t('dashboard')}
        subtitle={t('dashboard_subtitle')}
        className={'mb-5'}
      />
      <Statistics />
      <History />
      <div className={'flex flex-col gap-4'}>
        <Title
          title={t('account_balance')}
          subtitle={t('account_balance_subtitle')}
        />
        <LineChart data={chartData} height={'100px'} />
      </div>
    </>
  );
};

export default Dashboard;
