import { prisma } from '../../db/client';
import { createMonthlyReports } from '../helpers/createMonthlyReports';
import { Service } from './abstract-service';

export class ReportService implements Service {
  private async getMonthlyReportBalanceInfo(monthId: string) {
    const balance = await prisma.transaction.aggregate({
      where: {
        monthlyReportId: monthId,
        createdAt: {
          lte: new Date(),
        },
      },
      _sum: { amount: true },
    });

    const expenses = await prisma.transaction.aggregate({
      where: {
        amount: { lt: 0 },
        monthlyReportId: monthId,
        createdAt: {
          lte: new Date(),
        },
      },
      _sum: { amount: true },
    });

    const income = await prisma.transaction.aggregate({
      where: {
        amount: { gt: 0 },
        monthlyReportId: monthId,
        createdAt: {
          lte: new Date(),
        },
      },
      _sum: { amount: true },
    });

    return {
      balance: balance._sum.amount || 0,
      expenses: expenses._sum.amount || 0,
      income: income._sum.amount || 0,
    };
  }

  async getYearlyReportByYear(userId: string, year: number) {
    const reports = await prisma.yearlyReport.findFirst({
      where: { year, userId },
      select: {
        id: true,
        MonthlyReport: {
          select: {
            id: true,
            month: true,
            Transaction: {
              where: {
                createdAt: { lte: new Date() },
              },
              select: { amount: true },
            },
          },
        },
      },
    });

    if (!reports) throw new Error('Report not found');

    const monthsData = await Promise.all(
      reports.MonthlyReport.map(async (report) => {
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
          ...(await this.getMonthlyReportBalanceInfo(report.id)),
        };
      })
    );

    return { id: reports.id, months: monthsData };
  }

  async createYearlyReport(userId: string, year: number) {
    const found = await prisma.yearlyReport.findFirst({
      where: { userId, year },
    });

    if (found) throw new Error('Report already exists');

    const { id } = await prisma.yearlyReport.create({ data: { userId, year } });
    const reports = createMonthlyReports(userId, id);
    return await prisma.monthlyReport.createMany({
      data: reports,
    });
  }

  async deleteYearlyReport(reportId: string, userId: string) {
    const reports = await prisma.yearlyReport.findMany({ where: { userId } });
    if (reports.length === 1) throw new Error('Cannot delete last one');
    return await prisma.yearlyReport.delete({ where: { id: reportId } });
  }

  async getYearsFromReports(userId: string) {
    // this is used for select options
    return await prisma.yearlyReport.findMany({
      where: { userId },
      select: {
        year: true,
      },
    });
  }
}
