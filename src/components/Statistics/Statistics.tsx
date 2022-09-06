import React, { FC } from 'react';
import StatCard from './StatCard';
import { Statistic } from '../../types/statistics';

interface StatisticsProps {
  stats: Statistic[];
}

const Statistics: FC<StatisticsProps> = ({ stats }) => {
  return (
    <div className={'flex flex-row gap-10'}>
      {stats.map((item, index) => (
        <StatCard
          key={index}
          icon={item.icon}
          title={item.title}
          value={item.value}
        />
      ))}
    </div>
  );
};
export default Statistics;
