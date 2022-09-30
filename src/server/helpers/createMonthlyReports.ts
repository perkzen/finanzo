const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const createMonthlyReports = (userId: string, reportId: string) => {
  return months.map((month) => ({
    month,
    yearlyReportId: reportId,
    userId,
  }));
};
