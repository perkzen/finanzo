import { z } from 'zod';

export const createTransactionValidator = z.object({
  category: z.string(),
  recurring: z.boolean(),
  displayName: z.string(),
  amount: z.number(),
  createdAt: z.date(),
});

export type CreateTransactionProps = z.infer<typeof createTransactionValidator>;
