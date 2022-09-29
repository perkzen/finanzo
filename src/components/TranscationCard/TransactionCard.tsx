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
      <div
        className={'flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-20'}
      >
        <div className={'gap-3 flex flex-row'}>
          <div
            className={
              'flex justify-center items-center bg-white shadow-md  w-8 h-8 rounded-lg '
            }
          >
            {renderTransactionTypeIcons(transaction.category)}
          </div>
          <h1 className={'text-2xl font-bold'}>{transaction.displayName}</h1>
        </div>
        <div className={'flex flex-col sm:flex-row ml-3 sm:ml-0'}>
          <div className={'flex font-semibold'}>
            <p className={'sm:invisible'}>Created at:&nbsp; </p>
            {formatDate(transaction.createdAt)}
          </div>
          <div className={'flex font-semibold'}>
            <p className={'sm:invisible'}>Amount:&nbsp; </p>
            {formatNumberAsCurrency(transaction.amount)}
          </div>
        </div>

        <Button
          label={<FaRegTrashAlt />}
          classNames={'inline-flex justify-center w-full sm:ml-auto sm:w-fit'}
          onClick={() => handleDelete(transaction.id)}
        />
      </div>
    </Card>
  );
};

export default TransactionCard;
