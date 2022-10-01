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
import Card from '../../../../components/Card/Card';
import { GrTransaction } from 'react-icons/gr';
import { useTranslation } from 'react-i18next';

const MonthlyReport = () => {
  const { t } = useTranslation();
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
        data: { year, month },
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
    <>
      <Title
        title={`${month} ${year}`}
        subtitle={t('monthly_report_subtitle')}
      />
      <Button
        label={t('add_transaction')}
        classNames={'ml-auto w-full sm:w-auto'}
        onClick={handleClick}
      />
      <>
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <TransactionCard
              key={index}
              transaction={transaction}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <Card>
            <h1
              className={'flex flex-row items-center gap-4 font-bold text-xl'}
            >
              <GrTransaction className={'text-2xl'} />
              {t('no_transactions')}
            </h1>
          </Card>
        )}
      </>
    </>
  );
};

export default MonthlyReport;
