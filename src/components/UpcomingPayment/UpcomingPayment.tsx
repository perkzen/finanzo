import React, { FC } from 'react';
import { Transaction } from '../../types/transaction';
import { formatNumberAsCurrency } from '../../utils/formatNumberAsCurrency';
import { renderTransactionTypeIcons } from '../../utils/transactionTypeIcons';

interface UpcomingPaymentProps {
  payment: Transaction;
}

const UpcomingPayment: FC<UpcomingPaymentProps> = ({ payment }) => {
  return (
    <div className={'flex flex-row items-center w-full'}>
      <div
        className={
          'flex justify-center items-center bg-primary shadow-md w-8 h-8 rounded-lg'
        }
      >
        {renderTransactionTypeIcons(payment.category)}
      </div>

      <h1 className={'mx-3'}>{payment.displayName}</h1>
      <p className={'font-bold ml-auto'}>
        {formatNumberAsCurrency(payment.amount)}
      </p>
    </div>
  );
};

export default UpcomingPayment;
