import { prisma } from '../../db/client';
import { CreateTransactionProps } from '../validators/create-transaction-validator';
import { Transaction } from '../../types/transaction';

export class TransactionService {
  async getTransactionHistory(limit: number, userId: string) {
    return await prisma.transaction.findMany({
      take: limit,
      where: {
        userId: userId,
        createdAt: {
          lte: new Date(),
        },
      },
      select: {
        id: true,
        displayName: true,
        amount: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getTransactionsByMonth(month: string, year: number, userId: string) {
    return await prisma.transaction.findMany({
      where: {
        userId,
        monthlyReport: {
          month: month,
          year: year,
        },
        createdAt: {
          lte: new Date(),
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createTransaction(transaction: CreateTransactionProps, userId: string) {
    const { category, recurring, displayName, amount, createdAt } = transaction;

    const month = createdAt.toLocaleString('default', { month: 'long' });
    const year = transaction.createdAt.getFullYear();

    const monthlyReport = await prisma.monthlyReport.findFirst({
      where: {
        month,
        year,
        userId,
      },
      select: {
        id: true,
      },
    });

    if (!monthlyReport) throw new Error('Monthly Report Not Found');

    return await prisma.transaction.create({
      data: {
        category,
        recurring,
        displayName,
        amount,
        createdAt,
        monthlyReportId: monthlyReport.id,
        userId,
      },
    });
  }

  async deleteTransaction(transactionId: string, userId: string) {
    return await prisma.transaction.deleteMany({
      where: { id: transactionId, userId },
    });
  }

  async getUpcomingTransactions(userId: string) {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        createdAt: {
          gt: new Date(),
        },
      },
    });

    const payments: { [key: string]: Transaction[] } = {};

    const dates: Date[] = [];
    transactions.forEach((t) => {
      if (!payments.hasOwnProperty(`${t.createdAt}`)) {
        dates.push(t.createdAt);
        Object.assign(payments, { [`${t.createdAt}`]: [] });
        payments[`${t.createdAt}`]?.push(t);
        return;
      }
      payments[`${t.createdAt}`]?.push(t);
    });

    return { payments, dates };
  }
}
