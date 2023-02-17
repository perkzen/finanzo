import { ReportService } from '../services/report-service';
import { protectedProcedure, router } from '../trpc';
import { getUserId } from '../helpers/getUserId';
import {
  getByIdValidator,
  getByYearValidator,
} from '../validators/common-validators';

const service = new ReportService();

export const reportsRouter = router({
  getYearlyReportById: protectedProcedure
    .input(getByYearValidator)
    .query(async ({ input, ctx }) => {
      const userId = getUserId(ctx);
      return await service.getYearlyReportByYear(userId, input.year);
    }),
  createYearlyReport: protectedProcedure
    .input(getByYearValidator)
    .mutation(async ({ input, ctx }) => {
      const userId = getUserId(ctx);
      return await service.createYearlyReport(userId, input.year);
    }),
  deleteYearlyReport: protectedProcedure
    .input(getByIdValidator)
    .mutation(async ({ input, ctx }) => {
      const userId = getUserId(ctx);
      return await service.deleteYearlyReport(input.id, userId);
    }),
  getYears: protectedProcedure.query(async ({ ctx }) => {
    const userId = getUserId(ctx);
    return await service.getYearsFromReports(userId);
  }),
});
