import { prisma } from '../../db/client';
import { CreateTransactionProps } from '../validators/create-transaction-validator';
import { Transaction } from '../../types/transaction';
import { addMonthsToDate } from '../../utils/date';

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

    await this.refreshPayment(userId);

    const payments: { [key: string]: Transaction[] } = {};
    const dates: Date[] = [];
    // format to {"2022-09-26": [payment1,payment2, ...]}
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

  async refreshPayment(userId: string) {
    const outdatedPayments = await prisma.transaction.findMany({
      where: {
        userId,
        recurring: true,
        createdAt: {
          lte: new Date(),
        },
      },
    });

    // refresh outdated payments
    return await Promise.all(
      outdatedPayments.map(
        async (payment) =>
          await prisma.transaction.create({
            data: {
              ...payment,
              createdAt: addMonthsToDate(payment.createdAt, 1),
            },
          })
      )
    );
  }
}
