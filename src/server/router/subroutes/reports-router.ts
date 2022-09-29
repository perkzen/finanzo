import { createRouter } from '../context';
import { z } from 'zod';
import { ReportService } from '../../services/report-service';
import { getUserId } from '../../helpers/getUserId';

const service = new ReportService();

export const reportsRouter = createRouter()
  .query('get-yearly-report-by-id', {
    input: z.object({
      year: z.number(),
    }),
    async resolve({ input, ctx }) {
      const userId = getUserId(ctx);
      return await service.getYearlyReportById(userId, input.year);
    },
  })
  .mutation('create-yearly-report', {
    input: z.object({
      year: z.number(),
    }),
    async resolve({ input, ctx }) {
      const userId = getUserId(ctx);
      return await service.createYearlyReport(userId, input.year);
    },
  })
  .mutation('delete-yearly-report', {
    input: z.object({
      year: z.number(),
    }),
    async resolve({ input, ctx }) {
      const userId = getUserId(ctx);
      return await service.deleteYearlyReport(userId, input.year);
    },
  })
  .query('get-years', {
    async resolve({ ctx }) {
      const userId = getUserId(ctx);
      return await service.getYearsFromReports(userId);
    },
  });
