import React, { FC } from 'react';
import cash from '../../assets/cash.png';
import dollar from '../../assets/dollar.png';
import donate from '../../assets/donate.png';
import Image from 'next/image';
import Card from '../Card/Card';
import classes from './Stats.module.scss';

interface StatsProps {
  income: number;
  expense: number;
}

const Stats: FC<StatsProps> = ({ income, expense }) => {
  return (
    <Card className={classes.Container}>
      <div className="stat">
        <div className="stat-figure">
          <Image src={dollar} width={50} height={50} alt={'Dollar'} />
        </div>
        <div className="stat-title">Income</div>
        <div className="stat-value">{income}€</div>
      </div>
      <div className="stat">
        <div className="stat-figure ">
          <Image src={donate} width={50} height={50} alt={'Donate'} />
        </div>
        <div className="stat-title">Expenses</div>
        <div className="stat-value">{expense}€</div>
      </div>

      <div className="stat">
        <div className="stat-figure ">
          <Image src={cash} width={50} height={50} alt={'Cash'} />
        </div>
        <div className="stat-title">Difference</div>
        <div className="stat-value">{Math.abs(income - expense)}€</div>
      </div>
    </Card>
  );
};
export default Stats;
