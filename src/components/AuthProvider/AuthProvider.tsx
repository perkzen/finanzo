import React, { FC, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import Home from '../../pages';
import Image from 'next/image';
import Loader from '../../assets/loader.gif';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { status } = useSession();

  if (status === 'loading') {
    return (
      <div
        className={'flex flex-col gap-4 justify-center items-center h-screen'}
      >
        <Image src={Loader} alt={'loader'} />
        <h1 className={'text-2xl font-bold'}>Loading...</h1>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return <Home />;
  }

  return <>{children}</>;
};

export default AuthProvider;
