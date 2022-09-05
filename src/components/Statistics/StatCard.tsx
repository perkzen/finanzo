import React, { FC, ReactNode } from 'react';
import Card from '../Card/Card';
import { Statistic } from '../../types/statistics';

const StatCard: FC<Statistic> = ({ icon, title, value }) => {
  return (
    <Card>
      <div className={'text-3xl'}>{icon}</div>
      <h1 className={'text-gray-500'}>{title}</h1>
      <p>{value.toFixed(2)} €</p>
    </Card>
  );
};

export default StatCard;
