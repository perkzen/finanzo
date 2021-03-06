import { createRouter } from './context';
import { prisma } from '../../db/client';
import { createExpenseValidator } from '../../shared/create-expense-validator';
import { UserSession } from '../../pages/api/auth/[...nextauth]';
import { z } from 'zod';

export const expensesRouter = createRouter()
  .mutation('create-expense', {
    input: createExpenseValidator,
    async resolve({ input, ctx }) {
      const userId = (ctx.session as UserSession).user.id;
      if (!userId) throw new Error('User not logged in');

      return await prisma.expense.create({
        data: {
          monthlyReportId: input.monthlyReportId,
          type: input.type,
          amount: input.amount,
          category: input.category,
          createdAt: input.createdAt ? input.createdAt : new Date(),
        },
      });
    },
  })
  .mutation('delete-expense', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      const userId = (ctx.session as UserSession).user.id;
      if (!userId) throw new Error('User not logged in');

      return await prisma.expense.delete({
        where: {
          id: input.id,
        },
      });
    },
  });
