import { z } from 'zod';

export const createExpenseValidator = z.object({
  type: z.string(),
  amount: z.number(),
  description: z.string(),
  monthlyReportId: z.string(),
});

export type CreateExpenseInputType = z.infer<typeof createExpenseValidator>;
