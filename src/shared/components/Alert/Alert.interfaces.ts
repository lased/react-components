import { ReactNode } from 'react';

export interface IAlertProps {
  variant: 'error' | 'success' | 'warning' | 'info';
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}
