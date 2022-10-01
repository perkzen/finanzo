import { ReactNode } from 'react';

export interface TransactionTable {
  id: string;
  displayName: string;
  amount: string;
  createdAt: string;
  category: ReactNode;
}

export interface Transaction {
  id: string;
  displayName: string;
  amount: number;
  category: string;
  createdAt: Date;
}

export interface YearlyReportTable {
  month: string;
  income: string;
  expenses: string;
  balance: string;
  transactions: number;
}
