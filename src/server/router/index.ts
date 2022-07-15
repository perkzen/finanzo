import superjson from 'superjson';
import { createRouter } from './context';
import { financeRouter } from './finances';
import { expensesRouter } from './expenses';
import { analyticsRouter } from './analytics';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('finances.', financeRouter)
  .merge('expenses.', expensesRouter)
  .merge('analytics.', analyticsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
