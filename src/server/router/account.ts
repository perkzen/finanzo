import { createRouter } from './context';
import { prisma } from '../../db/client';
import { UserSession } from '../../pages/api/auth/[...nextauth]';

export const accountRouter = createRouter()
  .query('get-balance', {
    async resolve({ ctx }) {
      const userId = (ctx.session as UserSession).user.id;
      if (!userId) return;

      const balance = await prisma.transaction.aggregate({
        where: { userId },
        _sum: { amount: true },
      });

      const expenses = await prisma.transaction.aggregate({
        where: { amount: { lt: 0 }, userId },
        _sum: { amount: true },
      });

      const income = await prisma.transaction.aggregate({
        where: { amount: { gt: 0 }, userId },
        _sum: { amount: true },
      });

      return {
        balance: balance._sum.amount || 0,
        expenses: expenses._sum.amount || 0,
        income: income._sum.amount || 0,
      };
    },
  })
  .query('get-user', {
    async resolve({ ctx }) {
      const userId = (ctx.session as UserSession).user.id;
      if (!userId) return;

      return await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true, email: true, image: true },
      });
    },
  });
