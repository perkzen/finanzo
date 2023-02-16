import { prisma } from '../db/client';
import { Service } from './abstract-service';

export class AccountService implements Service {
  async getBalance(userId: string) {
    const balance = await prisma.transaction.aggregate({
      where: {
        userId,
        createdAt: {
          lte: new Date(),
        },
      },
      _sum: { amount: true },
    });

    const expenses = await prisma.transaction.aggregate({
      where: {
        amount: { lt: 0 },
        userId,
        createdAt: {
          lte: new Date(),
        },
      },
      _sum: { amount: true },
    });

    const income = await prisma.transaction.aggregate({
      where: {
        amount: { gt: 0 },
        userId,
        createdAt: {
          lte: new Date(),
        },
      },
      _sum: { amount: true },
    });

    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        createdAt: {
          lte: new Date(),
        },
      },
    });

    return {
      balance: balance._sum.amount || 0,
      expenses: expenses._sum.amount || 0,
      income: income._sum.amount || 0,
      transactions: transactions.length || 0,
    };
  }

  async getUser(userId: string) {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true, image: true },
    });
  }
}
