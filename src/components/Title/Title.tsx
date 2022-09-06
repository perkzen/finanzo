import React, { FC } from 'react';

interface TitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const Title: FC<TitleProps> = ({ title, subtitle, className }) => {
  return (
    <div className={className}>
      <h1 className={'font-bold text-2xl'}>{title}</h1>
      {subtitle && <h2 className={'text-gray-500'}>{subtitle}</h2>}
    </div>
  );
};

export default Title;
