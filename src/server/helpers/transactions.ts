import { prisma } from '../../db/client';

export const getMonthlyReportAccountInfo = async (monthId: string) => {
  const balance = await prisma.transaction.aggregate({
    where: { monthlyReportId: monthId },
    _sum: { amount: true },
  });

  const expenses = await prisma.transaction.aggregate({
    where: { amount: { lt: 0 }, monthlyReportId: monthId },
    _sum: { amount: true },
  });

  const income = await prisma.transaction.aggregate({
    where: { amount: { gt: 0 }, monthlyReportId: monthId },
    _sum: { amount: true },
  });

  return {
    balance: balance._sum.amount || 0,
    expenses: expenses._sum.amount || 0,
    income: income._sum.amount || 0,
  };
};
