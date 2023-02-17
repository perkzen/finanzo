import { TransactionService } from '../services/transaction-service';
import { protectedProcedure, router } from '../trpc';
import { getUserId } from '../helpers/getUserId';
import { createTransactionValidator } from '../validators/create-transaction-validator';
import {
  getByIdValidator,
  getTransactionByMonthValidator,
  limitValidator,
} from '../validators/common-validators';

const service = new TransactionService();

export const transactionsRouter = router({
  getTransactionHistory: protectedProcedure
    .input(limitValidator)
    .query(async ({ input, ctx }) => {
      const userId = getUserId(ctx);
      return await service.getTransactionHistory(input.limit, userId);
    }),
  getTransactionsByMonth: protectedProcedure
    .input(getTransactionByMonthValidator)
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
    .input(getByIdValidator)
    .mutation(async ({ input, ctx }) => {
      const userId = getUserId(ctx);
      return await service.deleteTransaction(input.id, userId);
    }),
  getUpcomingTransactions: protectedProcedure.query(async ({ ctx }) => {
    const userId = getUserId(ctx);
    return await service.getUpcomingTransactions(userId);
  }),
});
