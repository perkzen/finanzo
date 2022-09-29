import { createRouter } from '../context';
import { z } from 'zod';
import { UserSession } from '../../../pages/api/auth/[...nextauth]';
import { ReportService } from '../../services/report-service';

const service = new ReportService();

export const reportsRouter = createRouter()
  .query('get-yearly-report-by-id', {
    input: z.object({
      year: z.number(),
    }),
    async resolve({ input, ctx }) {
      const userId = (ctx.session as UserSession).user.id;
      if (!userId) return [];

      return await service.getYearlyReportById(userId, input.year);
    },
  })
  .mutation('create-yearly-report', {
    input: z.object({
      year: z.number(),
    }),
    async resolve({ input, ctx }) {
      const userId = (ctx.session as UserSession).user.id;
      if (!userId) throw new Error('User not found');

      return await service.createYearlyReport(userId, input.year);
    },
  })
  .mutation('delete-yearly-report', {
    input: z.object({
      year: z.number(),
    }),
    async resolve({ input, ctx }) {
      const userId = (ctx.session as UserSession).user.id;
      if (!userId) throw new Error('User not found');
      return await service.deleteYearlyReport(userId, input.year);
    },
  })
  .query('get-years', {
    async resolve({ ctx }) {
      const userId = (ctx.session as UserSession).user.id;
      if (!userId) return [];
      return await service.getYearsFromReports(userId);
    },
  });
