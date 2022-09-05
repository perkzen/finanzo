export interface MonthlyReportTable {
  month: string;
  income: string;
  expense: string;
  balance: string;
}

export interface TransactionTable {
  category: string;
  amount: number;
  createdAt: string;
}
