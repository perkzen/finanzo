import * as trpc from '@trpc/server';
import { z } from 'zod';

export const financeRouter = trpc.router().query('get-all', {
  input: z.object({
    userId: z.string(),
  }),
  resolve({ input }) {
    return {};
  },
});
