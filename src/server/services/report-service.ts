import { prisma } from '../../db/client';
import { getMonthlyReportBalanceInfo } from '../helpers/getMonthlyReportBalanceInfo';
import { createMonthlyReports } from '../helpers/createMonthlyReports';

export class ReportService {
  async getYearlyReportById(userId: string, year: number) {
    const reports = await prisma.monthlyReport.findMany({
      where: { userId, year: year },
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
          ...(await getMonthlyReportBalanceInfo(prisma, report.id)),
        };
      })
    );
  }

  async createYearlyReport(userId: string, year: number) {
    //check if monthly reports for this year already exist
    const report = await prisma.monthlyReport.findFirst({
      where: { userId, year },
    });

    if (report) throw new Error("This year's reports already exist");

    const reports = createMonthlyReports(userId, year);
    return await prisma.monthlyReport.createMany({
      data: reports,
    });
  }

  async deleteYearlyReport(userId: string, year: number) {
    // can't delete last one
    // should add year table

    return await prisma.monthlyReport.deleteMany({
      where: {
        userId,
        year,
      },
    });
  }
  async getYearsFromReports(userId: string) {
    // this is used for select options
    return await prisma.monthlyReport.findMany({
      where: { userId },
      select: {
        year: true,
      },
      distinct: ['year'],
    });
  }
}
