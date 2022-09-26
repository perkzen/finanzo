import React, { FC, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import Home from '../../pages';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

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
        <LoadingSpinner width={'8'} height={'8'} />
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
