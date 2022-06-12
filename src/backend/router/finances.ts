import { z } from 'zod';
import { prisma } from '../../db/client';
import { createRouter } from './context';
import { UserSession } from '../../pages/api/auth/[...nextauth]';
import { getSum } from '../helpers/getSum';

export const financeRouter = createRouter()
  .query('get-yearly-report', {
    input: z.object({
      year: z.number(),
    }),
    async resolve({ input, ctx }) {
      const userId = (ctx.session as UserSession).user.id;
      if (!userId) return [];

      const yearlyReport = await prisma.monthlyReport.findMany({
        where: {
          year: input.year,
          userId,
        },
        select: {
          id: true,
          month: true,
          year: true,
          Expense: {
            select: {
              type: true,
              amount: true,
            },
          },
        },
      });

      return yearlyReport.map((monthlyReport) => {
        const income = getSum(monthlyReport, 'Income');
        const expense = getSum(monthlyReport, 'Expense');
        return {
          id: monthlyReport.id,
          month: monthlyReport.month,
          income: income,
          expense: expense,
          balance: income - expense,
        };
      });
    },
  })
  .query('get-monthly-report-by-id', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      const userId = (ctx.session as UserSession).user.id;
      if (!userId) return null;

      return await prisma.monthlyReport.findFirst({
        where: {
          id: input.id,
        },
        select: {
          Expense: {
            select: {
              id: true,
              createdAt: true,
              description: true,
              type: true,
              amount: true,
            },
          },
        },
      });
    },
  });
