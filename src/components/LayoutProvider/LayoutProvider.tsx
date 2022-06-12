import React, { FC, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

interface LayoutProviderProps {
  children: ReactNode;
}

const LayoutProvider: FC<LayoutProviderProps> = ({ children }) => {
  return (
    <div className={'flex flex-col h-screen'}>
      <main>{children}</main>
      <Toaster position={'top-right'} />
    </div>
  );
};

export default LayoutProvider;
