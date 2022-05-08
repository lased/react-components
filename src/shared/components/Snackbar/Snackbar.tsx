import { createPortal } from 'react-dom';
import { FC, useEffect } from 'react';

import { ISnackbarProps } from './Snackbar.interfaces';
import { composeClass } from 'shared/helpers';

import './Snackbar.css';

const Snackbar: FC<ISnackbarProps> = ({
  open,
  message,
  children,
  className,
  autoHideDuration,
  anchorOrigin = { vertical: 'bottom', horizontal: 'center' },
  onClose
}) => {
  useEffect(() => {
    if (open && autoHideDuration && onClose) {
      const timerId = setTimeout(() => {
        onClose?.();
      }, autoHideDuration);

      return () => clearTimeout(timerId);
    }
  }, [open]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div
      className={composeClass([
        'snackbar',
        className,
        message && 'snackbar-message'
      ])}
      data-horizontal={anchorOrigin.horizontal}
      data-vertical={anchorOrigin.vertical}
    >
      {message ? message : children}
      {onClose && !children && (
        <button className="snackbar__close" onClick={onClose}>
          X
        </button>
      )}
    </div>,
    document.body
  );
};

export default Snackbar;
