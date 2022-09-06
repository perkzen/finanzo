import superjson from 'superjson';
import { createRouter } from './context';
import { transactionsRouter } from './transactions';
import { accountRouter } from './account';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('transactions.', transactionsRouter)
  .merge('account.', accountRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
