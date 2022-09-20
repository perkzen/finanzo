import React, { FC } from 'react';
import Card from '../Card/Card';
import { Transaction } from '../../types/transaction';
import Button from '../Button/Button';
import { FaRegTrashAlt } from 'react-icons/fa';
import { formatNumberAsCurrency } from '../../utils/formatNumberAsCurrency';
import { FiSettings } from 'react-icons/fi';
import { formatDate } from '../../utils/date';

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard: FC<TransactionCardProps> = ({ transaction }) => {
  return (
    <Card>
      <div className={'flex flex-row items-center gap-20'}>
        <div
          className={
            'flex justify-center items-center bg-white shadow-md w-8 h-8 rounded-lg '
          }
        >
          <FiSettings />
        </div>
        <h1 className={'text-2xl font-bold'}>{transaction.description}</h1>
        <div className={'font-semibold'}>
          {formatDate(transaction.createdAt)}
        </div>
        <div className={'font-semibold'}>
          {formatNumberAsCurrency(transaction.amount)}
        </div>
        <Button label={<FaRegTrashAlt />} classNames={'ml-auto'} />
      </div>
    </Card>
  );
};

export default TransactionCard;
