import superjson from 'superjson';
import { createRouter } from './context';
import { transactionsRouter } from './subroutes/transactions-router';
import { accountRouter } from './subroutes/account-router';
import { reportsRouter } from './subroutes/reports-router';
import { analyticsRouter } from './subroutes/analytics-router';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('transactions.', transactionsRouter)
  .merge('reports.', reportsRouter)
  .merge('account.', accountRouter)
  .merge('analytics', analyticsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
