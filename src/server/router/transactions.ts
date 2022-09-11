import { z } from 'zod';
import { prisma } from '../../db/client';
import { createRouter } from './context';
import { UserSession } from '../../pages/api/auth/[...nextauth]';
import { getMonthlyReportAccountInfo } from '../helpers/transactions';

export const transactionsRouter = createRouter()
  .query('get-transaction-history', {
    input: z.object({
      limit: z.number(),
    }),
    async resolve({ input, ctx }) {
      const userId = (ctx.session as UserSession).user.id;
      if (!userId) return [];

      return await prisma.transaction.findMany({
        take: input.limit,
        where: { userId: userId },
        select: {
          description: true,
          amount: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      });
    },
  })
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
            ...(await getMonthlyReportAccountInfo(report.id)),
          };
        })
      );
    },
  });
