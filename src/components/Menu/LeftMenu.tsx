import React, { ReactNode } from 'react';
import { HiOutlineCalendar, HiOutlineHome } from 'react-icons/hi';
import { GoGraph } from 'react-icons/go';
import Link from 'next/link';

const items: { icon: ReactNode; url: string }[] = [
  { icon: <HiOutlineHome />, url: '/dashboard' },
  { icon: <HiOutlineCalendar />, url: `/report/${new Date().getFullYear()}` },
  { icon: <GoGraph />, url: '/analytics' },
];

const LeftMenu = () => {
  return (
    <div className={'w-1/12 bg-secondary h-screen sticky top-0'}>
      <div
        className={
          'w-full flex flex-col justify-center items-center gap-10 mt-20'
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

export default LeftMenu;
