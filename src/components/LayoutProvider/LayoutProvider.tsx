import React, { FC, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import LeftMenu from '../Menu/LeftMenu';
import RightMenu from '../Menu/RightMenu';

interface LayoutProviderProps {
  children: ReactNode;
}

const LayoutProvider: FC<LayoutProviderProps> = ({ children }) => {
  return (
    <div className={'flex flex-row w-full'}>
      <LeftMenu />
      <main className={'w-full'}>{children}</main>
      <RightMenu />
      <Toaster position={'top-right'} />
    </div>
  );
};

export default LayoutProvider;
