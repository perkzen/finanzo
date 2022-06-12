import { z } from 'zod';

export const createExpenseValidator = z.object({
  type: z.string(),
  amount: z.number(),
  category: z.string(),
  monthlyReportId: z.string(),
  createdAt: z.date().optional().nullish(),
});

export type CreateExpenseInputType = z.infer<typeof createExpenseValidator>;
