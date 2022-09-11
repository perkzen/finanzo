import React, { FC } from 'react';

interface TitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleSize?: 'text-lg' | 'text-2xl' | 'text-3xl' | 'text-4xl' | 'text-5xl';
  subtitleSize?: 'text-sm' | 'text-base' | 'text-lg' | 'text-xl' | 'text-2xl';
}

const Title: FC<TitleProps> = ({
  title,
  subtitle,
  className,
  titleSize = 'text-2xl',
  subtitleSize = 'text-base',
}) => {
  return (
    <div className={className}>
      <h1 className={`font-bold ${titleSize}`}>{title}</h1>
      {subtitle && (
        <h2 className={`text-gray-500 ${subtitleSize}`}>{subtitle}</h2>
      )}
    </div>
  );
};

export default Title;
