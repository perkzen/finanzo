export interface TransactionTable {
  id: string;
  displayName: string;
  amount: string;
  createdAt: string;
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
