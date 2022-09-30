import { ReactNode } from 'react';

export interface Statistic {
  icon: ReactNode;
  title: string;
  value?: number;
  type: string;
}
