import React, { FC } from 'react';
import Card from '../Card/Card';
import Skeleton from 'react-loading-skeleton';

const TransactionSkeleton: FC = () => {
  return (
    <>
      <Card>
        <Skeleton count={1} />
      </Card>
      <Card>
        <Skeleton count={1} />
      </Card>
      <Card>
        <Skeleton count={1} />
      </Card>
    </>
  );
};

export default TransactionSkeleton;
