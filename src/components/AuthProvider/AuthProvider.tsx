import React, { FC, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Loader from '../../assets/loader.gif';
import Login from '../Login/Login';

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
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return <Login />;
  }

  return <>{children}</>;
};

export default AuthProvider;
