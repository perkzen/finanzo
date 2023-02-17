import { AnalyticsService } from '../services/analytics-service';
import { getUserId } from '../helpers/getUserId';
import { protectedProcedure, router } from '../trpc';
import { getByYearValidator } from '../validators/common-validators';

const service = new AnalyticsService();

export const analyticsRouter = router({
  getDataByYear: protectedProcedure
    .input(getByYearValidator)
    .query(async ({ input, ctx }) => {
      const userId = getUserId(ctx);
      return await service.getAccountDataByYear(userId, input.year);
    }),
  getAccountBalanceDataOverYear: protectedProcedure
    .input(getByYearValidator)
    .query(async ({ input, ctx }) => {
      const userId = getUserId(ctx);
      return await service.getAccountBalanceOverTheYearData(userId, input.year);
    }),
});
