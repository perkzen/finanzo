import superjson from 'superjson';
import { helloRouter } from './hello';
import { createRouter } from './context';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('hello.', helloRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
