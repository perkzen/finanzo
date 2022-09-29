import React, { FC, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import MainNavigation from '../Menu/Main/MainNavigation';
import RightMenu from '../Menu/RightMenu';
import MobileMenu from '../Menu/Main/MobileMenu';

interface LayoutProviderProps {
  children: ReactNode;
}

const LayoutProvider: FC<LayoutProviderProps> = ({ children }) => {
  return (
    <div className={'flex flex-col sm:flex-row w-full'}>
      <MainNavigation />
      <main
        className={
          'px-5 py-10 sm:px-20 flex flex-col h-screen gap-8 w-full overflow-auto '
        }
      >
        {children}
      </main>
      <MobileMenu />
      <RightMenu />
      <Toaster position={'top-right'} />
    </div>
  );
};

export default LayoutProvider;
