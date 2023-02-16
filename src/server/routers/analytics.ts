import { AnalyticsService } from '../services/analytics-service';
import { z } from 'zod';
import { getUserId } from '../helpers/getUserId';
import { protectedProcedure, router } from '../trpc';

const service = new AnalyticsService();

export const analyticsRouter = router({
  getDataByYear: protectedProcedure
    .input(
      z.object({
        year: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      const userId = getUserId(ctx);
      return await service.getAccountDataByYear(userId, input.year);
    }),
  getAccountBalanceDataOverYear: protectedProcedure
    .input(
      z.object({
        year: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      const userId = getUserId(ctx);
      return await service.getAccountBalanceOverTheYearData(userId, input.year);
    }),
});
