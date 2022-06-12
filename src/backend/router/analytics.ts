import { createRouter } from './context';
import { z } from 'zod';
import { prisma } from '../../db/client';
import { UserSession } from '../../pages/api/auth/[...nextauth]';

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

      // sum up incomes with same category
      //  const incomeByCategory ;
    },
  })
  .query('get-expense-report', {
    input: z.object({
      year: z.number(),
    }),
    async resolve({ input }) {},
  });
