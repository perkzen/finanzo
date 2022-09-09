import React, { FC, ReactNode } from 'react';
import { UpcomingPayment } from '../../types/transaction';

interface UpcomingPaymentProps {
  payment: UpcomingPayment;
}

const UpcomingPayment: FC<UpcomingPaymentProps> = ({ payment }) => {
  return (
    <div className={'flex flex-row items-center'}>
      <div
        className={
          'flex justify-center items-center bg-primary shadow-md w-8 h-8 rounded-lg'
        }
      >
        {payment.icon}
      </div>

      <h1 className={'mx-3'}>{payment.description}</h1>
      <p className={'ml-3 font-bold ml-auto'}>{payment.amount.toFixed(2)} €</p>
    </div>
  );
};

export default UpcomingPayment;
