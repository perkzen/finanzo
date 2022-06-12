import React, { FC, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import Home from '../../pages';
import Image from 'next/image';
import loader from '../../assets/loader.gif';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { status } = useSession();

  if (status === 'loading') {
    return (
      <div className={'flex flex-row justify-center items-center h-screen'}>
        <Image src={loader} alt={'Loading'} />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return <Home />;
  }

  return <>{children}</>;
};

export default AuthProvider;
