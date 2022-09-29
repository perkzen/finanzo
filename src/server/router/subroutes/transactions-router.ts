import { z } from 'zod';
import { createRouter } from '../context';
import { UserSession } from '../../../pages/api/auth/[...nextauth]';
import { TransactionService } from '../../services/transaction-service';
import { createTransactionValidator } from '../../validators/create-transaction-validator';

const service = new TransactionService();

export const transactionsRouter = createRouter()
  .query('get-transaction-history', {
    input: z.object({
      limit: z.number(),
    }),
    async resolve({ input, ctx }) {
      const userId = (ctx.session as UserSession).user.id;
      if (!userId) return [];

      return await service.getTransactionHistory(input.limit, userId);
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

      return await service.getTransactionsByMonth(
        input.month,
        input.year,
        userId
      );
    },
  })
  .mutation('create-transaction', {
    input: createTransactionValidator,
    async resolve({ input, ctx }) {
      const userId = (ctx.session as UserSession).user.id;
      if (!userId) return new Error('Authentication Required');

      return await service.createTransaction(input, userId);
    },
  })
  .mutation('delete-transaction', {
    input: z.object({
      transactionId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const userId = (ctx.session as UserSession).user.id;
      if (!userId) return new Error('Authentication Required');

      return await service.deleteTransaction(input.transactionId, userId);
    },
  })
  .query('get-upcoming-transactions', {
    async resolve({ ctx }) {
      const userId = (ctx.session as UserSession).user.id;
      if (!userId) return null;

      return await service.getUpcomingTransactions(userId);
    },
  });
