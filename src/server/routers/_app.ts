import { router } from '../trpc';
import { accountRouter } from './accounts';
import { analyticsRouter } from './analytics';
import { reportsRouter } from './reports';
import { transactionsRouter } from './transactions';

export const appRouter = router({
  accounts: accountRouter,
  analytics: analyticsRouter,
  reports: reportsRouter,
  transactions: transactionsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
