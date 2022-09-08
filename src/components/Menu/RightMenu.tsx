import React, { FC } from 'react';
import Image from 'next/image';
import { trpc } from '../../utils/trpc';
import UpcomingPaymentsList from '../UpcomingPayment/UpcomingPaymentsList';
import { BiLogOut } from 'react-icons/bi';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const RightMenu: FC = () => {
  const { data, isLoading } = trpc.useQuery(['account.get-user']);

  return (
    <div className={'w-1/5 bg-secondary h-screen sticky top-0 px-4'}>
      <div className={'flex flex-col justify-center items-center mt-20'}>
        {typeof data?.image === 'string' && (
          <>
            {isLoading ? (
              <LoadingSpinner width={'8'} height={'8'} />
            ) : (
              <Image
                src={data.image}
                width={72}
                height={72}
                alt={'User'}
                className={'rounded-full'}
              />
            )}
          </>
        )}
        <h1 className={'font-bold text-lg mt-5'}>{data?.name}</h1>
        <button
          className={
            'flex justify-center items-center bg-primary shadow-md w-8 h-8 rounded-lg mt-5'
          }
        >
          <BiLogOut />
        </button>
        <UpcomingPaymentsList />
      </div>
    </div>
  );
};

export default RightMenu;
