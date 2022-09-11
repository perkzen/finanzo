import superjson from 'superjson';
import { createRouter } from './context';
import { transactionsRouter } from './transactions';
import { accountRouter } from './account';
import { reportsRouter } from './reports';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('transactions.', transactionsRouter)
  .merge('reports.', reportsRouter)
  .merge('account.', accountRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
