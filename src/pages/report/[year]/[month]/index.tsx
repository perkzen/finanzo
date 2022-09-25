import React from 'react';
import { useRouter } from 'next/router';
import Title from '../../../../components/Title/Title';
import TransactionCard from '../../../../components/TranscationCard/TransactionCard';
import { trpc } from '../../../../utils/trpc';
import Button from '../../../../components/Button/Button';
import {
  ModalActionType,
  useModalDispatch,
} from '../../../../context/Modal/ModalProvider';
import { ModalType } from '../../../../types/modal';
import { toast } from 'react-hot-toast';

const MonthlyReport = () => {
  const dispatch = useModalDispatch();
  const router = useRouter();
  const { year, month } = router.query;

  const { data, refetch } = trpc.useQuery([
    'transactions.get-transactions-by-month',
    { month: String(month), year: Number(year) },
  ]);

  const transactions = data ? data : [];

  const handleClick = () => {
    dispatch({
      type: ModalActionType.ADD_MODAL,
      payload: {
        type: ModalType.ADD_TRANSACTION,
        title: 'Add transaction',
        callback: refetch,
      },
    });
  };

  const { mutateAsync } = trpc.useMutation(['transactions.delete-transaction']);

  const handleDelete = async (id: string) => {
    try {
      await toast.promise(mutateAsync({ transactionId: id }), {
        loading: 'Deleting transaction...',
        success: 'Transaction deleted',
        error: 'Failed to delete transaction',
      });
      await refetch();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={'py-5 mt-10 px-20 flex flex-col gap-8 w-full'}>
      <Title
        title={`${month} ${year}`}
        subtitle={'Transactions of selected month'}
      />
      <Button
        label={'Add transaction'}
        classNames={'ml-auto'}
        onClick={handleClick}
      />
      {transactions.map((transaction, index) => (
        <TransactionCard
          key={index}
          transaction={transaction}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default MonthlyReport;
