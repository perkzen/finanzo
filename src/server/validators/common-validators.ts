import { z } from 'zod';

export const getByYearValidator = z.object({
  year: z.number(),
});

export const getByIdValidator = z.object({
  id: z.string().cuid(),
});

export const limitValidator = z.object({
  limit: z.number(),
});

export const getTransactionByMonthValidator = z.object({
  month: z.string(),
  year: z.number(),
});
