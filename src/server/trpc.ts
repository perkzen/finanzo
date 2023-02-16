import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { Context } from './context';
import { getUserId } from './helpers/getUserId';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});
export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;

const isAuthorized = middleware(async ({ ctx, next }) => {
  const userId = getUserId(ctx);
  if (!userId) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource',
    });
  }
  return next();
});

export const protectedProcedure = t.procedure.use(isAuthorized);
