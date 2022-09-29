import React, { ReactNode, useState } from 'react';
import { HiOutlineCalendar, HiOutlineHome } from 'react-icons/hi';
import { GoGraph } from 'react-icons/go';
import Link from 'next/link';

const items: { icon: ReactNode; url: string }[] = [
  { icon: <HiOutlineHome />, url: '/dashboard' },
  { icon: <HiOutlineCalendar />, url: `/report/${new Date().getFullYear()}` },
  { icon: <GoGraph />, url: '/analytics' },
];

const MobileMenu = () => {
  const [active, setActive] = useState(0);

  const handleClick = (index: number) => {
    setActive(index);
  };

  return (
    <div
      className={
        'sm:hidden flex flex-row w-full justify-center items-center bottom-4 sticky'
      }
    >
      <div className={'flex bg-neutral-900 w-5/6 p-2 rounded-full'}>
        {items.map((item, index) => (
          <div
            onClick={() => handleClick(index)}
            className={`text-2xl p-2 inline-flex justify-center hover:cursor-pointer m-auto text-primary ${
              index === active ? ' border-b-2 border-primary' : ''
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
  );
};

export default MobileMenu;
