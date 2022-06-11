import React, { FC, ReactNode } from 'react';
import classes from './Card.module.scss';
import { classNames } from '../../utils/classNames';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={classNames(className, classes.Container as string)}>
      {children}
    </div>
  );
};

export default Card;
