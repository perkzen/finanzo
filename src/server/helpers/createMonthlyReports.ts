const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

export const createMonthlyReports = (userId: string, reportId: string) => {
  return months.map((month) => ({
    month,
    yearlyReportId: reportId,
    userId,
  }));
};
