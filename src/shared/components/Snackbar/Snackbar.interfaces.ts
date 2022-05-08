import { ReactNode } from 'react';

export interface ISnackbarAnchorOrigin {
  horizontal: 'left' | 'center' | 'right';
  vertical: 'top' | 'bottom';
}

export interface ISnackbarProps {
  open: boolean;
  children?: ReactNode;
  message?: string;
  autoHideDuration?: number;
  className?: string;
  anchorOrigin?: ISnackbarAnchorOrigin;
  onClose?: () => void;
}
