import { createRouter } from './context';
import { z } from 'zod';
import { prisma } from '../../db/client';

export const expensesRouter = createRouter().mutation('create-expense', {
  input: z.object({
    type: z.string(),
    amount: z.number(),
    description: z.string(),
  }),
  async resolve({ input, ctx }) {},
});
