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

export const createMonthlyReports = (userId: string, year: number) => {
  return months.map((month) => ({
    month,
    year,
    userId,
  }));
};
