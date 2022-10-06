import superjson from 'superjson';
import { createRouter } from './context';
import { transactionsRouter } from './routes/transactions-router';
import { accountRouter } from './routes/account-router';
import { reportsRouter } from './routes/reports-router';
import { analyticsRouter } from './routes/analytics-router';
import { TRPCError } from '@trpc/server';
import { getUserId } from '../helpers/getUserId';

export const appRouter = createRouter()
  .transformer(superjson)
  .middleware(async ({ ctx, next }) => {
    const userId = getUserId(ctx);
    if (!userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to access this resource',
      });
    }
    return next();
  })
  .merge('transactions.', transactionsRouter)
  .merge('reports.', reportsRouter)
  .merge('account.', accountRouter)
  .merge('analytics', analyticsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
