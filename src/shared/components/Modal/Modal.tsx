import React, { KeyboardEvent, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { IModalProps } from './Modal.interfaces';
import { composeClass } from 'shared/helpers';

import './Modal.css';

let modalIds: number[] = [];
let counter = 0;

const Modal: React.FC<IModalProps> = ({
  open,
  children,
  className,
  onClose
}) => {
  const modalIdRef = useRef(counter++);

  useEffect(() => {
    const onEscCallback: any = (event: KeyboardEvent) => {
      const isLast = modalIdRef.current === modalIds[modalIds.length - 1];

      if (open && event.key === 'Escape' && isLast) {
        onClose?.(event);
      }
    };

    if (open) {
      modalIds.push(modalIdRef.current);
    } else {
      modalIds = modalIds.filter((id) => id !== modalIdRef.current);
    }

    document.addEventListener('keyup', onEscCallback);

    return () => {
      document.removeEventListener('keyup', onEscCallback);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div className={composeClass(['modal-container', className])}>
      <div className="modal-background" onClick={onClose} />
      <div className="modal-block">
        <button className="modal-close-btn" type="button" onClick={onClose}>
          X
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
