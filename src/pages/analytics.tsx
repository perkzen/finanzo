import React, { ChangeEvent, useState } from 'react';
import { NextPage } from 'next';
import Title from '../components/Title/Title';
import BarChart from '../components/BarChart/BarChart';
import { monthsArray } from '../utils/date';
import { ChartData } from 'chart.js';
import { trpc } from '../utils/trpc';
import { useTranslation } from 'react-i18next';

const Analytics: NextPage = () => {
  const { t } = useTranslation();
  const { data: years, isLoading: isLoadingOptions } = trpc.useQuery([
    'reports.get-years',
  ]);

  const [year, setYear] = useState(new Date().getFullYear());

  const handleYearChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    setYear(+e.target.value);
  };

  const { data } = trpc.useQuery(['analytics.get-data-by-year', { year }]);

  const chartData: ChartData<'bar', number[], string> = {
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

  return (
    <>
      <div>
        <Title title={t('analytics')} subtitle={t('analytics_subtitle')} />
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
      </div>
      {/*<div className={'grid grid-cols-2 gap-8'}>*/}
      {/*  <div>*/}
      {/*    <Title*/}
      {/*      title={'Income categories'}*/}
      {/*      titleSize={'text-lg'}*/}
      {/*      subtitle={'Where do you get most of your income from'}*/}
      {/*      className={'mb-4'}*/}
      {/*    />*/}
      {/*    <PieChart labels={['test']} numbers={[12]} />*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    <Title*/}
      {/*      title={'Expense categories'}*/}
      {/*      titleSize={'text-lg'}*/}
      {/*      subtitle={'Where do you spend your money on'}*/}
      {/*      className={'mb-4'}*/}
      {/*    />*/}
      {/*    <PieChart labels={['test', 'dsa']} numbers={[12, 23]} />*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className={'flex flex-col gap-4'}>
        <Title
          title={t('income_and_expenses')}
          titleSize={'text-lg'}
          subtitle={t('income_and_expenses_subtitle')}
        />
        <BarChart data={chartData} height={'100px'} />
      </div>

      <div className={'flex flex-col gap-4'}>
        <Title
          title={t('transactions')}
          titleSize={'text-lg'}
          subtitle={t('transactions_subtitle')}
        />
        <BarChart data={transactionData} height={'100px'} />
      </div>
    </>
  );
};

export default Analytics;
