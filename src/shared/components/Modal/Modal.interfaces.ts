import { SyntheticEvent } from 'react';

export interface IModalProps {
  open: boolean;
  className?: string;
  onClose?: (event: SyntheticEvent) => void;
}
