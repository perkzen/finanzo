import React, { FC } from 'react';
import Card from '../Card/Card';
import { Statistic } from '../../types/statistics';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

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
        <LoadingSpinner height={'8'} width={'8'} />
      ) : (
        <p className={'font-bold'}>{stat.value?.toFixed(2)} €</p>
      )}
    </Card>
  );
};

export default StatCard;
