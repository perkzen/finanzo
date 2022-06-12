import React, { FC, ReactNode } from 'react';

interface LayoutProviderProps {
  children: ReactNode;
}

const LayoutProvider: FC<LayoutProviderProps> = ({ children }) => {
  return (
    <div className={'flex flex-col h-screen'}>
      <main>{children}</main>
    </div>
  );
};

export default LayoutProvider;
