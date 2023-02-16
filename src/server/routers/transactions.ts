import { z } from 'zod';
import { TransactionService } from '../services/transaction-service';
import { protectedProcedure, router } from '../trpc';
import { getUserId } from '../helpers/getUserId';
import { createTransactionValidator } from '../validators/create-transaction-validator';

const service = new TransactionService();

export const transactionsRouter = router({
  getTransactionHistory: protectedProcedure
    .input(z.object({ limit: z.number() }))
    .query(async ({ input, ctx }) => {
      const userId = getUserId(ctx);
      return await service.getTransactionHistory(input.limit, userId);
    }),
  getTransactionsByMonth: protectedProcedure
    .input(
      z.object({
        month: z.string(),
        year: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      const userId = getUserId(ctx);
      return await service.getTransactionsByMonth(
        input.month,
        input.year,
        userId
      );
    }),
  createTransaction: protectedProcedure
    .input(createTransactionValidator)
    .mutation(async ({ input, ctx }) => {
      const userId = getUserId(ctx);
      return await service.createTransaction(input, userId);
    }),
  deleteTransaction: protectedProcedure
    .input(z.object({ transactionId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const userId = getUserId(ctx);
      return await service.deleteTransaction(input.transactionId, userId);
    }),
  getUpcomingTransactions: protectedProcedure.query(async ({ ctx }) => {
    const userId = getUserId(ctx);
    return await service.getUpcomingTransactions(userId);
  }),
});
