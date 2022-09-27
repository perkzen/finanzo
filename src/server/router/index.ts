import superjson from 'superjson';
import { createRouter } from './context';
import { transactionsRouter } from './subroutes/transactions';
import { accountRouter } from './subroutes/account';
import { reportsRouter } from './subroutes/reports';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('transactions.', transactionsRouter)
  .merge('reports.', reportsRouter)
  .merge('account.', accountRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
