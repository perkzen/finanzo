import { PrismaClient } from '@prisma/client';

export const getMonthlyReportBalanceInfo = async (
  prisma: PrismaClient,
  monthId: string
) => {
  const balance = await prisma.transaction.aggregate({
    where: {
      monthlyReportId: monthId,
      createdAt: {
        lte: new Date(),
      },
    },
    _sum: { amount: true },
  });

  const expenses = await prisma.transaction.aggregate({
    where: {
      amount: { lt: 0 },
      monthlyReportId: monthId,
      createdAt: {
        lte: new Date(),
      },
    },
    _sum: { amount: true },
  });

  const income = await prisma.transaction.aggregate({
    where: {
      amount: { gt: 0 },
      monthlyReportId: monthId,
      createdAt: {
        lte: new Date(),
      },
    },
    _sum: { amount: true },
  });

  return {
    balance: balance._sum.amount || 0,
    expenses: expenses._sum.amount || 0,
    income: income._sum.amount || 0,
  };
};
