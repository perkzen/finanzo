import { format } from 'date-fns';

export const formatDate = (date: Date, formatter?: string): string => {
  if (!formatter) formatter = 'dd.MM.yyyy';
  return format(date, formatter);
};

export const getMonthFromString = (month: string): number => {
  return new Date(Date.parse(month + ' 1, 2012')).getMonth();
};
