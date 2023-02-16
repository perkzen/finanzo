import { ReportService } from '../services/report-service';
import { protectedProcedure, router } from '../trpc';
import { z } from 'zod';
import { getUserId } from '../helpers/getUserId';

const service = new ReportService();

export const reportsRouter = router({
  getYearlyReportById: protectedProcedure
    .input(z.object({ year: z.number() }))
    .query(async ({ input, ctx }) => {
      const userId = getUserId(ctx);
      return await service.getYearlyReportByYear(userId, input.year);
    }),
  createYearlyReport: protectedProcedure
    .input(z.object({ year: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const userId = getUserId(ctx);
      return await service.createYearlyReport(userId, input.year);
    }),
  deleteYearlyReport: protectedProcedure
    .input(z.object({ reportId: z.string().cuid() }))
    .mutation(async ({ input, ctx }) => {
      const userId = getUserId(ctx);
      return await service.deleteYearlyReport(input.reportId, userId);
    }),
  getYears: protectedProcedure.query(async ({ ctx }) => {
    const userId = getUserId(ctx);
    return await service.getYearsFromReports(userId);
  }),
});
