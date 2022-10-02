import React, { FC } from 'react';
import Card from '../Card/Card';
import { Statistic } from '../../types/statistics';
import { formatNumberAsCurrency } from '../../utils/formatNumberAsCurrency';
import Skeleton from 'react-loading-skeleton';

interface StatCardProps {
  stat: Statistic;
  isLoading: boolean;
}

const StatCard: FC<StatCardProps> = ({ stat, isLoading }) => {
  return (
    <Card>
      <div className={'text-3xl'}>{stat.icon}</div>
      <h1 className={'text-gray-500'}>{stat.title}</h1>
      {isLoading ? (
        <Skeleton />
      ) : (
        <p className={'font-bold'}>
          {stat.type === 'number'
            ? stat.value
            : formatNumberAsCurrency(stat.value)}
        </p>
      )}
    </Card>
  );
};

export default StatCard;
