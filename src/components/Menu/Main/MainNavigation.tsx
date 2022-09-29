import React, { ReactNode, useState } from 'react';
import { HiOutlineCalendar, HiOutlineHome } from 'react-icons/hi';
import { GoGraph } from 'react-icons/go';
import Link from 'next/link';

const items: { icon: ReactNode; url: string }[] = [
  { icon: <HiOutlineHome />, url: '/dashboard' },
  { icon: <HiOutlineCalendar />, url: `/report/${new Date().getFullYear()}` },
  { icon: <GoGraph />, url: '/analytics' },
];

const MainNavigation = () => {
  const [active, setActive] = useState(0);

  const handleClick = (index: number) => {
    setActive(index);
  };

  return (
    <>
      <div
        className={'hidden sm:block w-1/12 bg-secondary h-screen sticky top-0'}
      >
        <div
          className={
            'w-full flex flex-col justify-center items-center gap-10 mt-20'
          }
        >
          {items.map((item, index) => (
            <div
              onClick={() => handleClick(index)}
              className={`text-2xl p-4 inline-flex justify-center hover:cursor-pointer m-auto w-full ${
                index === active ? ' border-r-2 border-neutral-800' : ''
              }`}
              key={index}
            >
              <Link href={item.url}>
                <a>{item.icon}</a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MainNavigation;
