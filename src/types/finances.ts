export interface MonthlyReportTable {
  month: string;
  income: string;
  expense: string;
  balance: string;
}

export interface TransactionTable {
  description: string;
  amount: number;
  createdAt: string;
}
