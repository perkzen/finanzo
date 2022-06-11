import * as trpc from '@trpc/server';
import superjson from 'superjson';
import { helloRouter } from './hello';

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .merge('hello.', helloRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
