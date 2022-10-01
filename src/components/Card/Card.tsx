import React, { FC, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'white';
  classNames?: string;
}

const Card: FC<CardProps> = ({
  children,
  color = 'white',
  classNames = '',
}) => {
  return (
    <div
      style={{ minWidth: '250px', minHeight: '250px' }}
      className={`flex flex-col gap-5 shadow-lg bg-${color} 
      rounded-2xl py-5 px-5 sm:px-10 ${classNames}`}
    >
      {children}
    </div>
  );
};

export default Card;
