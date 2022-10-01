import React, { ChangeEvent, useState } from 'react';
import { NextPage } from 'next';
import Title from '../components/Title/Title';
import BarChart from '../components/BarChart/BarChart';
import { monthsArray } from '../utils/date';
import { ChartData } from 'chart.js';
import { trpc } from '../utils/trpc';

const Analytics: NextPage = () => {
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
        label: 'Expenses',
        data: data ? data.expenses : [],
        backgroundColor: '#da2653',
      },
      {
        label: 'Incomes',
        data: data ? data.incomes : [],
        backgroundColor: '#35e178',
      },
    ],
  };

  const transactionData: ChartData<'bar', number[], string> = {
    labels: monthsArray,
    datasets: [
      {
        label: 'Transactions',
        data: data ? data.transactions : [],
        backgroundColor: '#313030',
      },
    ],
  };

  return (
    <>
      <div>
        <Title
          title={'Finance analytics'}
          subtitle={'Data about your finance through time'}
        />
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

      <div className={'flex flex-col gap-4'}>
        <Title
          title={'Incomes and expenses'}
          titleSize={'text-lg'}
          subtitle={'Your incomes and expenses over the year'}
        />
        <BarChart
          data={chartData}
          title={'Income and expense graph'}
          height={'100px'}
        />
      </div>
      <div className={'flex flex-col gap-4'}>
        <Title
          title={'Transactions graph'}
          titleSize={'text-lg'}
          subtitle={'Your transactions over the year'}
        />
        <BarChart
          data={transactionData}
          title={'Transaction graph'}
          height={'100px'}
        />
      </div>
    </>
  );
};

export default Analytics;
