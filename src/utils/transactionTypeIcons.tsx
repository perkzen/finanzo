import React from 'react';
import { useTranslation } from 'react-i18next';
import { RiCarLine } from 'react-icons/ri';
import { HiOutlineHome } from 'react-icons/hi';
import { MdOutlineLocalGroceryStore } from 'react-icons/md';
import { TbFileInvoice } from 'react-icons/tb';
import { IoFastFoodOutline } from 'react-icons/io5';
import { BiBriefcase } from 'react-icons/bi';

const transactionTypes = [
  { icon: <RiCarLine />, category: 'car' },
  { icon: <HiOutlineHome />, category: 'home' },
  {
    icon: <BiBriefcase />,
    category: 'work',
  },
  {
    icon: <MdOutlineLocalGroceryStore />,
    category: 'shopping',
  },
  {
    icon: <TbFileInvoice />,
    category: 'bills',
  },
  {
    icon: <IoFastFoodOutline />,
    category: 'food_and_drinks',
  },
];

export const useTransactionTypeIcons = () => {
  const { t } = useTranslation();
  return transactionTypes.map((item) => {
    return { ...item, displayName: t(item.category) };
  });
};

export const renderTransactionTypeIcons = (category: string) => {
  return transactionTypes.find((t) => t.category === category)?.icon;
};
