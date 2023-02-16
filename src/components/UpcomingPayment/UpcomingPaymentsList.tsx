import React, { FC } from 'react';
import Title from '../Title/Title';
import { BsPlusLg } from 'react-icons/bs';
import UpcomingPayment from './UpcomingPayment';
import {
  ModalActionType,
  useModalDispatch,
} from '../../context/Modal/ModalProvider';
import { ModalType } from '../../types/modal';
import { formatDate } from '../../utils/date';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import { useUpcomingTransactions } from '../../utils/useApi';

const UpcomingPaymentsList: FC = () => {
  const { t } = useTranslation();
  const dispatch = useModalDispatch();
  const { data, isLoading, refetch } = useUpcomingTransactions();

  const openModal = () => {
    dispatch({
      type: ModalActionType.ADD_MODAL,
      payload: {
        type: ModalType.ADD_TRANSACTION,
        title: t('add_upcoming_payments'),
        callback: refetch,
      },
    });
  };

  return (
    <div className={'mt-20 px-4 w-full'}>
      <Title
        title={t('upcoming_payments')}
        titleSize={'text-lg'}
        subtitleSize={'text-sm'}
        subtitle={t('upcoming_payments_subtitle')}
        className={'mb-5'}
      />
      {isLoading ? (
        <Skeleton count={3} className={'mt-4'} />
      ) : (
        <>
          {data ? (
            <>
              {data.dates.map((date, index) => (
                <div className={'w-full flex flex-col gap-5 mt-8'} key={index}>
                  <h2 className={'text-gray-500 text-base'}>
                    {formatDate(date)}
                  </h2>
                  {data.payments[`${formatDate(date)}`]?.map(
                    (payment, index) => (
                      <UpcomingPayment
                        key={index}
                        payment={payment}
                        callback={refetch}
                      />
                    )
                  )}
                </div>
              ))}
            </>
          ) : null}
        </>
      )}

      <button
        onClick={openModal}
        className={
          'flex justify-center items-center bg-primary shadow-md w-8 h-8 rounded-lg mt-5'
        }
      >
        <BsPlusLg />
      </button>
    </div>
  );
};

export default UpcomingPaymentsList;
