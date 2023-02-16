import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Title from '../Title/Title';
import Statistics from '../Statistics/Statistics';
import History from '../History/History';
import LineChart from '../LineChart/LineChart';
import { useAccountBalanceDataOverYear } from '../../utils/useApi';

const Dashboard: FC = () => {
  const { t } = useTranslation();
  const chartData = useAccountBalanceDataOverYear();

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
