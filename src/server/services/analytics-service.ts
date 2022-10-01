import { Service } from './abstract-service';
import { ReportService } from './report-service';

export class AnalyticsService implements Service {
  async getAccountDataByYear(userId: string, year: number) {
    const data = await new ReportService().getYearlyReportByYear(userId, year);

    const res: {
      balances: number[];
      incomes: number[];
      expenses: number[];
      transactions: number[];
    } = {
      balances: [],
      incomes: [],
      expenses: [],
      transactions: [],
    };

    data.months.forEach((month) => {
      res.balances.push(month.balance);
      res.incomes.push(month.income);
      res.expenses.push(month.expenses);
      res.transactions.push(month.transactions);
    });

    return res;
  }
}
