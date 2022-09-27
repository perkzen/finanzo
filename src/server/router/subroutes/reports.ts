import { createRouter } from '../context';
import { z } from 'zod';
import { UserSession } from '../../../pages/api/auth/[...nextauth]';
import { prisma } from '../../../db/client';
import { getMonthlyReportAccountInfo } from '../../helpers/transactions';
import { createMonthlyReports } from '../../helpers/createMonthlyReports';

export const reportsRouter = createRouter()
  .query('get-yearly-report-by-id', {
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
            where: {
              createdAt: { lt: new Date() },
            },
            select: {
              amount: true,
            },
          },
        },
      });

      return await Promise.all(
        reports.map(async (report) => {
          if (report.Transaction.length === 0) {
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
            transactions: report.Transaction.length,
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
      if (!userId) throw new Error('User not found');

      //check if monthly reports for this year already exist
      const report = await prisma.monthlyReport.findFirst({
        where: { userId, year: input.year },
      });

      if (report) throw new Error("This year's reports already exist");

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
      if (!userId) throw new Error('User not found');

      // can't delete last one
      // should add year table

      return await prisma.monthlyReport.deleteMany({
        where: {
          userId,
          year: input.year,
        },
      });
    },
  })
  .query('get-years', {
    async resolve({ ctx }) {
      const userId = (ctx.session as UserSession).user.id;
      if (!userId) return [];
      // this is used for select options
      return await prisma.monthlyReport.findMany({
        where: { userId },
        select: {
          year: true,
        },
        distinct: ['year'],
      });
    },
  });
