import { createRouter } from './context';
import { z } from 'zod';
import { UserSession } from '../../pages/api/auth/[...nextauth]';
import { prisma } from '../../db/client';
import { getMonthlyReportAccountInfo } from '../helpers/transactions';
import { createMonthlyReports } from '../helpers/createMonthlyReports';

export const reportsRouter = createRouter()
  .query('get-yearly-report', {
    input: z.object({
      year: z.number(),
    }),
    async resolve({ input, ctx }) {
      const userId = (ctx.session as UserSession).user.id;
      if (!userId) return [];

      const reports = await prisma.monthlyReport.findMany({
        where: { userId, year: input.year },
        select: {
          id: true,
          month: true,
          Transaction: {
            select: {
              amount: true,
            },
          },
          _count: {
            select: {
              Transaction: true,
            },
          },
        },
      });

      return await Promise.all(
        reports.map(async (report) => {
          if (report._count.Transaction === 0) {
            return {
              month: report.month,
              transactions: 0,
              income: 0,
              expenses: 0,
              balance: 0,
            };
          }
          return {
            month: report.month,
            transactions: report._count.Transaction,
            ...(await getMonthlyReportAccountInfo(prisma, report.id)),
          };
        })
      );
    },
  })
  .mutation('create-yearly-report', {
    input: z.object({
      year: z.number(),
    }),
    async resolve({ input, ctx }) {
      const userId = (ctx.session as UserSession).user.id;
      if (!userId) return new Error('User not found');
      const reports = createMonthlyReports(userId, input.year);
      return await prisma.monthlyReport.createMany({
        data: reports,
      });
    },
  })
  .mutation('delete-yearly-report', {
    input: z.object({
      year: z.number(),
    }),
    async resolve({ input, ctx }) {
      const userId = (ctx.session as UserSession).user.id;
      if (!userId) return new Error('User not found');
      return await prisma.monthlyReport.deleteMany({
        where: {
          userId,
          year: input.year,
        },
      });
    },
  });
