import { RiAccountCircleLine, RiCarLine } from 'react-icons/ri';
import { HiOutlineHome } from 'react-icons/hi';
import { MdOutlineLocalGroceryStore } from 'react-icons/md';
import { TbFileInvoice } from 'react-icons/tb';
import { IoFastFoodOutline } from 'react-icons/io5';
import React from 'react';

export const transactionTypes = [
  { icon: <RiCarLine />, category: 'Car' },
  { icon: <HiOutlineHome />, category: 'Home' },
  { icon: <RiAccountCircleLine />, category: 'Personal' },
  { icon: <MdOutlineLocalGroceryStore />, category: 'Shopping' },
  { icon: <TbFileInvoice />, category: 'Bills' },
  { icon: <IoFastFoodOutline />, category: 'Food & drinks' },
];

export const renderTransactionTypeIcons = (category: string) => {
  return transactionTypes.find((t) => t.category === category)?.icon;
};
