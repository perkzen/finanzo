import { z } from 'zod';
import { prisma } from '../../db/client';
import { createRouter } from './context';
import { UserSession } from '../../pages/api/auth/[...nextauth]';

export const transactionsRouter = createRouter().query(
  'get-transaction-history',
  {
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
          description: true,
          amount: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      });
    },
  }
);
