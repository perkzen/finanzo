import { createRouter } from './context';
import { z } from 'zod';
import { prisma } from '../../db/client';
import { UserSession } from '../../pages/api/auth/[...nextauth]';
import { getGraphData } from '../helpers/getGraphData';

export const analyticsRouter = createRouter()
  .query('get-income-report', {
    input: z.object({
      year: z.number(),
    }),
    async resolve({ input, ctx }) {
      const userId = (ctx.session as UserSession).user.id;
      if (!userId) return [];

      const incomes = await prisma.monthlyReport.findMany({
        where: {
          year: input.year,
          userId,
        },
        select: {
          Expense: {
            select: {
              type: true,
              category: true,
              amount: true,
            },
            where: {
              type: 'Income',
            },
          },
        },
      });

      const incomeByCategory = getGraphData(incomes);
      return Array.from(incomeByCategory);
    },
  })
  .query('get-expense-report', {
    input: z.object({
      year: z.number(),
    }),
    async resolve({ input, ctx }) {
      const userId = (ctx.session as UserSession).user.id;
      if (!userId) return [];

      const expenses = await prisma.monthlyReport.findMany({
        where: {
          year: input.year,
          userId,
        },
        select: {
          Expense: {
            select: {
              type: true,
              category: true,
              amount: true,
            },
            where: {
              type: 'Expense',
            },
          },
        },
      });

      const expenseByCategory = getGraphData(expenses);
      return Array.from(expenseByCategory);
    },
  });
