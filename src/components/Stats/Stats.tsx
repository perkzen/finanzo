import React, { FC } from 'react';
import cash from '../../assets/cash.png';
import dollar from '../../assets/dollar.png';
import donate from '../../assets/donate.png';

import Image from 'next/image';

interface StatsProps {
  income: number;
  expense: number;
}

const Stats: FC<StatsProps> = ({ income, expense }) => {
  return (
    <div className="stats shadow flex flex-row justify-center items-center mt-5">
      <div className="stat">
        <div className="stat-figure">
          <Image src={dollar} width={50} height={50} alt={'Dollar'} />
        </div>
        <div className="stat-title">Income</div>
        <div className="stat-value">{income}</div>
        <div className="stat-desc">Jan 1st - Feb 1st</div>
      </div>

      <div className="stat">
        <div className="stat-figure ">
          <Image src={donate} width={50} height={50} alt={'Donate'} />
        </div>
        <div className="stat-title">Expenses</div>
        <div className="stat-value">{expense}</div>
        <div className="stat-desc">↗︎ 400 (22%)</div>
      </div>

      <div className="stat">
        <div className="stat-figure ">
          <Image src={cash} width={50} height={50} alt={'Cash'} />
        </div>
        <div className="stat-title">Difference</div>
        <div className="stat-value">{Math.abs(income - expense)}</div>
        <div className="stat-desc">↘︎ 90 (14%)</div>
      </div>
    </div>
  );
};
export default Stats;
