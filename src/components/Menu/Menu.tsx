import React, { ReactNode } from 'react';
import { HiOutlineCalendar, HiOutlineHome } from 'react-icons/hi';
import Link from 'next/link';

const items: { icon: ReactNode; url: string }[] = [
  { icon: <HiOutlineHome />, url: '/dashboard' },
  { icon: <HiOutlineCalendar />, url: '/' },
];

const Menu = () => {
  return (
    <div className={'w-1/12 bg-secondary h-screen sticky top-0'}>
      <div
        className={
          'w-full flex flex-col justify-center items-center gap-6 mt-20'
        }
      >
        {items.map((item, index) => (
          <div className={'text-2xl hover:cursor-pointer'} key={index}>
            <Link href={item.url}>
              <a>{item.icon}</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
