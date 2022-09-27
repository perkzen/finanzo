import { z } from 'zod';
import { prisma } from '../../../db/client';
import { createRouter } from '../context';
import { UserSession } from '../../../pages/api/auth/[...nextauth]';
import { Transaction } from '../../../types/transaction';

export const transactionsRouter = createRouter()
  .query('get-transaction-history', {
    input: z.object({
      limit: z.number(),
    }),
    async resolve({ input, ctx }) {
      const userId = (ctx.session as UserSession).user.id;
      if (!userId) return [];

      return await prisma.transaction.findMany({
        take: input.limit,
        where: { userId: userId },
        select: {
          id: true,
          displayName: true,
          amount: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      });
    },
  })
  .query('get-transactions-by-month', {
    input: z.object({
      month: z.string(),
      year: z.number(),
    }),
    async resolve({ input, ctx }) {
      const userId = (ctx.session as UserSession).user.id;
      if (!userId) return [];

      return await prisma.transaction.findMany({
        where: {
          userId,
          monthlyReport: {
            month: input.month,
            year: input.year,
          },
          createdAt: {
            lte: new Date(),
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    },
  })
  .mutation('create-transaction', {
    input: z.object({
      category: z.string(),
      recurring: z.boolean(),
      displayName: z.string(),
      amount: z.number(),
      createdAt: z.date(),
    }),
    async resolve({ input, ctx }) {
      const userId = (ctx.session as UserSession).user.id;
      if (!userId) return new Error('Authentication Required');

      const { category, recurring, displayName, amount, createdAt } = input;

      const month = createdAt.toLocaleString('default', { month: 'long' });
      const year = input.createdAt.getFullYear();

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
    },
  })
  .mutation('delete-transaction', {
    input: z.object({
      transactionId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const userId = (ctx.session as UserSession).user.id;
      if (!userId) return new Error('Authentication Required');

      return await prisma.transaction.delete({
        where: { id: input.transactionId },
      });
    },
  })
  .query('get-upcoming-transactions', {
    async resolve({ ctx }) {
      const userId = (ctx.session as UserSession).user.id;
      if (!userId) return null;

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
    },
  });
