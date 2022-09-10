import React, { FC } from 'react';
import { format } from 'date-fns';
import Title from '../Title/Title';
import { HiOutlineHome } from 'react-icons/hi';
import { RiCarLine } from 'react-icons/ri';
import { BsPlusLg } from 'react-icons/bs';
import UpcomingPayment from './UpcomingPayment';
import {
  ModalActionType,
  useModalDispatch,
} from '../../context/Modal/ModalProvider';
import { ModalType } from '../../types/modal';

const UpcomingPaymentsList: FC = () => {
  const dispatch = useModalDispatch();

  const openModal = () => {
    dispatch({
      type: ModalActionType.ADD_MODAL,
      payload: {
        type: ModalType.ADD_PAYMENT,
      },
    });
  };

  const payments = [
    { icon: <RiCarLine />, description: 'car insurance', amount: 1500 },
    { icon: <HiOutlineHome />, description: 'rent', amount: 500 },
  ];

  return (
    <div className={'mt-20'}>
      <Title
        title={'Upcoming Payments'}
        titleSize={'text-lg'}
        subtitleSize={'text-sm'}
        subtitle={format(new Date(), 'dd MMM yyyy')}
        className={'mb-5'}
      />
      <div className={'flex flex-col gap-5'}>
        {payments.map((item, index) => (
          <UpcomingPayment key={index} payment={item} />
        ))}
      </div>
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
