import { z } from 'zod';
import { createRouter } from '../context';
import { TransactionService } from '../../services/transaction-service';
import { createTransactionValidator } from '../../validators/create-transaction-validator';
import { getUserId } from '../../helpers/getUserId';

const service = new TransactionService();

export const transactionsRouter = createRouter()
  .query('get-transaction-history', {
    input: z.object({
      limit: z.number(),
    }),
    async resolve({ input, ctx }) {
      const userId = getUserId(ctx);
      return await service.getTransactionHistory(input.limit, userId);
    },
  })
  .query('get-transactions-by-month', {
    input: z.object({
      month: z.string(),
      year: z.number(),
    }),
    async resolve({ input, ctx }) {
      const userId = getUserId(ctx);
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
      const userId = getUserId(ctx);
      return await service.createTransaction(input, userId);
    },
  })
  .mutation('delete-transaction', {
    input: z.object({
      transactionId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const userId = getUserId(ctx);
      return await service.deleteTransaction(input.transactionId, userId);
    },
  })
  .query('get-upcoming-transactions', {
    async resolve({ ctx }) {
      const userId = getUserId(ctx);
      return await service.getUpcomingTransactions(userId);
    },
  });
