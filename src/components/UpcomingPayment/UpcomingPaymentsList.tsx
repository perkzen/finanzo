import React, { FC } from 'react';
import { format } from 'date-fns';
import Title from '../Title/Title';
import { BsPlusLg } from 'react-icons/bs';
import UpcomingPayment from './UpcomingPayment';
import {
  ModalActionType,
  useModalDispatch,
} from '../../context/Modal/ModalProvider';
import { ModalType } from '../../types/modal';
import { trpc } from '../../utils/trpc';

const UpcomingPaymentsList: FC = () => {
  const dispatch = useModalDispatch();
  const { data, refetch } = trpc.useQuery([
    'transactions.get-upcoming-transactions',
  ]);

  const openModal = () => {
    dispatch({
      type: ModalActionType.ADD_MODAL,
      payload: {
        type: ModalType.ADD_TRANSACTION,
        title: 'Add upcoming payment',
        callback: refetch,
      },
    });
  };
  console.log(data);
  return (
    <div className={'mt-20 px-4 w-full'}>
      <Title
        title={'Upcoming Payments'}
        titleSize={'text-lg'}
        subtitleSize={'text-sm'}
        subtitle={'Add future payment that will happen'}
        className={'mb-5'}
      />

      {data ? (
        <>
          {data.dates.map((date, index) => (
            <div className={'w-full flex flex-col gap-5 mt-8'} key={index}>
              <h2 className={'text-gray-500 text-base'}>
                {format(date, 'dd MMM yyyy')}
              </h2>
              {JSON.stringify(data.payments)}
              {data.payments[`${date}`]?.map((payment, index) => (
                <UpcomingPayment
                  key={index}
                  payment={payment}
                  callback={refetch}
                />
              ))}
            </div>
          ))}
        </>
      ) : (
        'no data'
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
