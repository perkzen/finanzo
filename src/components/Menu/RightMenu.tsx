import React, { FC, useState } from 'react';
import Image, { ImageLoader } from 'next/image';
import { trpc } from '../../utils/trpc';
import UpcomingPaymentsList from '../UpcomingPayment/UpcomingPaymentsList';
import { BiLogOut } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { signOut } from 'next-auth/react';
import {
  ModalActionType,
  useModalDispatch,
} from '../../context/Modal/ModalProvider';
import { ModalType } from '../../types/modal';

const RightMenu: FC = () => {
  const { data } = trpc.useQuery(['account.get-user']);
  const dispatch = useModalDispatch();
  const [isImageLoading, setIsImageLoading] = useState(true);

  const stopLoadingImage = () => {
    setIsImageLoading((prev) => !prev);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const openSettings = () => {
    dispatch({
      type: ModalActionType.ADD_MODAL,
      payload: { type: ModalType.SETTINGS },
    });
  };

  return (
    <div className={'w-1/4 bg-secondary h-screen sticky top-0'}>
      <div className={'flex flex-col justify-center items-center mt-20 px-6'}>
        {isImageLoading && <LoadingSpinner width={'8'} height={'8'} />}
        {typeof data?.image === 'string' && (
          <Image
            src={data.image}
            width={72}
            height={72}
            alt={'User'}
            className={'rounded-full'}
            onLoadingComplete={stopLoadingImage}
          />
        )}
        <h1 className={'font-bold text-lg my-3'}>{data?.name}</h1>
        <div className={'flex flex-row gap-5'}>
          <button
            onClick={openSettings}
            className={
              'flex justify-center items-center bg-primary shadow-md w-8 h-8 rounded-lg '
            }
          >
            <FiSettings />
          </button>
          <button
            onClick={handleSignOut}
            className={
              'flex justify-center items-center bg-primary shadow-md w-8 h-8 rounded-lg'
            }
          >
            <BiLogOut />
          </button>
        </div>
        <UpcomingPaymentsList />
      </div>
    </div>
  );
};

export default RightMenu;
