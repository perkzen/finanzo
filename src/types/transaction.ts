import { ReactNode } from 'react';

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
  expense: string;
  balance: string;
  numberOfTransactions: number;
}
