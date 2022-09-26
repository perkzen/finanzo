import { format } from 'date-fns';

export const formatDate = (date: Date, formatter?: string): string => {
  if (!formatter) formatter = 'dd.MM.yyyy';
  return format(date, formatter);
};

export const getMonthFromString = (month: string): number => {
  return new Date(Date.parse(month + ' 1, 2012')).getMonth();
};

export const getDateMax = (year: number | null, month: string | null) => {
  if (!year || !month) return undefined;
  const date = new Date();
  date.setFullYear(year);
  date.setMonth(getMonthFromString(month));
  date.setDate(31);
  return formatDate(date, 'yyyy-MM-dd');
};

export const getDateMin = (year: number | null, month: string | null) => {
  if (!year || !month) return undefined;
  const date = new Date();
  date.setDate(1);
  date.setMonth(getMonthFromString(month));
  date.setFullYear(year);
  return formatDate(date, 'yyyy-MM-dd');
};
