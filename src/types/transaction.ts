import { ReactNode } from 'react';
import { Prisma } from '@prisma/client';

export interface TransactionTable {
  description: string;
  amount: string;
  createdAt: string;
}

export interface Transaction {
  description: string;
  amount: number;
  createdAt: Date;
}

export interface UpcomingPayment {
  icon: ReactNode;
  description: string;
  amount: number;
  createdAt?: Date;
}

export interface YearlyReportTable {
  month: string;
  income: string;
  expenses: string;
  balance: string;
  transactions: number;
}
