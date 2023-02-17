import React from 'react';
import { useRouter } from 'next/router';
import Title from '../../../../components/Title/Title';
import TransactionCard from '../../../../components/TranscationCard/TransactionCard';
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
import Link from 'next/link';
import TransactionSkeleton from '../../../../components/TranscationCard/TransactionSkeleton';
import {
  useDeleteTransaction,
  useTransactionsByMonth,
} from '../../../../utils/useApi';

const MonthlyReport = () => {
  const { t } = useTranslation();
  const dispatch = useModalDispatch();
  const router = useRouter();
  const { year, month } = router.query;

  const { data, isLoading, refetch } = useTransactionsByMonth(
    Number(year),
    String(month)
  );

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

  const { mutateAsync } = useDeleteTransaction();

  const handleDelete = async (id: string) => {
    try {
      await toast.promise(mutateAsync({ id: id }), {
        loading: t('deleting'),
        success: t('deleted'),
        error: (err) => err.message,
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
      <div className={'flex flex-row items-center'}>
        <Link href={`/report/${year}`}>
          <Button label={t('back_to_yearly_report')} />
        </Link>
        <Button
          label={t('add_transaction')}
          classNames={'ml-auto sm:w-auto'}
          type={'button'}
          onClick={handleClick}
        />
      </div>
      <>
        {isLoading ? (
          <TransactionSkeleton />
        ) : (
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
                  className={
                    'flex flex-row items-center gap-4 font-bold text-xl'
                  }
                >
                  <GrTransaction className={'text-2xl'} />
                  {t('no_transactions')}
                </h1>
              </Card>
            )}
          </>
        )}
      </>
    </>
  );
};

export default MonthlyReport;
