import React, { FC } from 'react';
import Card from '../Card/Card';
import { Transaction } from '../../types/transaction';
import Button from '../Button/Button';
import { FaRegTrashAlt } from 'react-icons/fa';
import { formatNumberAsCurrency } from '../../utils/formatNumberAsCurrency';
import { formatDate } from '../../utils/date';
import { renderTransactionTypeIcons } from '../../utils/transactionTypeIcons';

interface TransactionCardProps {
  transaction: Transaction;
  handleDelete: (id: string) => Promise<void>;
}

const TransactionCard: FC<TransactionCardProps> = ({
  transaction,
  handleDelete,
}) => {
  return (
    <Card>
      <div className={'flex flex-row items-center gap-20'}>
        <div
          className={
            'flex justify-center items-center bg-white shadow-md w-8 h-8 rounded-lg '
          }
        >
          {renderTransactionTypeIcons(transaction.category)}
        </div>
        <h1 className={'text-2xl font-bold'}>{transaction.displayName}</h1>
        <div className={'font-semibold'}>
          {formatDate(transaction.createdAt)}
        </div>
        <div className={'font-semibold'}>
          {formatNumberAsCurrency(transaction.amount)}
        </div>
        <Button
          label={<FaRegTrashAlt />}
          classNames={'ml-auto'}
          onClick={() => handleDelete(transaction.id)}
        />
      </div>
    </Card>
  );
};

export default TransactionCard;
