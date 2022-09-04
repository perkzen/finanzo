import React, { ReactNode } from 'react';
import { HiOutlineCalendar, HiOutlineHome } from 'react-icons/hi';

const items: { icon: ReactNode }[] = [
  { icon: <HiOutlineHome /> },
  { icon: <HiOutlineCalendar /> },
];

const Menu = () => {
  return (
    <div className={'w-1/12 bg-secondary'}>
      <div
        className={
          'w-full flex flex-col justify-center items-center gap-6 mt-20'
        }
      >
        {items.map((item, index) => (
          <div className={'text-2xl'} key={index}>
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
