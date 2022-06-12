import superjson from 'superjson';
import { createRouter } from './context';
import { financeRouter } from './finances';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('finance.', financeRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
