import React, { FC, ReactNode } from 'react';

interface LayoutProviderProps {
  children: ReactNode;
}

const LayoutProvider: FC<LayoutProviderProps> = ({ children }) => {
  return (
    <div className={'flex flex-col h-screen px-10 py-5'}>
      <main>{children}</main>
    </div>
  );
};

export default LayoutProvider;
