import React, { FC, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import Menu from '../Menu/Menu';

interface LayoutProviderProps {
  children: ReactNode;
}

const LayoutProvider: FC<LayoutProviderProps> = ({ children }) => {
  return (
    <div className={'flex flex-row w-full'}>
      <Menu />
      <main className={'w-full'}>{children}</main>
      <Toaster position={'top-right'} />
    </div>
  );
};

export default LayoutProvider;
