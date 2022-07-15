export const getSum = (
  month: {
    year: number;
    Expense: { type: string; amount: number }[];
    id: string;
    month: string;
  },
  type: 'Income' | 'Expense'
): number => {
  return month.Expense.filter((expense) => expense.type === type).reduce(
    (acc, expense) => acc + expense.amount,
    0
  );
};
