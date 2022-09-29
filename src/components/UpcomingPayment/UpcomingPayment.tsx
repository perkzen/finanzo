import React, { FC } from 'react';
import { Transaction } from '../../types/transaction';
import { formatNumberAsCurrency } from '../../utils/formatNumberAsCurrency';
import { renderTransactionTypeIcons } from '../../utils/transactionTypeIcons';
import {
  ModalActionType,
  useModalDispatch,
} from '../../context/Modal/ModalProvider';
import { ModalType } from '../../types/modal';
import { trpc } from '../../utils/trpc';
import { toast } from 'react-hot-toast';

interface UpcomingPaymentProps {
  payment: Transaction;
  callback: () => void;
}

const UpcomingPayment: FC<UpcomingPaymentProps> = ({ payment, callback }) => {
  const dispatch = useModalDispatch();
  const { mutateAsync } = trpc.useMutation('transactions.delete-transaction');

  const handleDelete = async () => {
    try {
      await toast.promise(mutateAsync({ transactionId: payment.id }), {
        loading: 'Deleting payment...',
        success: 'Payment deleted!',
        error: (err) => err.message,
      });
      await callback();
    } catch (e) {
      console.error(e);
    }
  };

  const handleClick = () => {
    dispatch({
      type: ModalActionType.ADD_MODAL,
      payload: {
        type: ModalType.DELETE,
        title: 'Delete upcoming payment',
        body: 'Are your sure you want to delete this upcoming payment?',
        action: handleDelete,
      },
    });
  };

  return (
    <div
      className={'flex flex-row items-center w-full hover:cursor-pointer'}
      onClick={handleClick}
    >
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
