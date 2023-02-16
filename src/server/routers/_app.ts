import { publicProcedure, router } from '../trpc';
import { accountRouter } from './accounts';
import { analyticsRouter } from './analytics';
import { reportsRouter } from './reports';
import { transactionsRouter } from './transactions';
import { z } from 'zod';

export const appRouter = router({
  accounts: accountRouter,
  analytics: analyticsRouter,
  reports: reportsRouter,
  transactions: transactionsRouter,
  hello: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
