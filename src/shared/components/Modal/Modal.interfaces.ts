import { ReactNode, MouseEvent, KeyboardEvent } from 'react';

export interface IModalProps {
  open: boolean;
  children: ReactNode;
  className?: string;
  onClose?: (event: KeyboardEvent | MouseEvent) => void;
}
