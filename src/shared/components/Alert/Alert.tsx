import { FC } from 'react';

import { IAlertProps } from './Alert.interfaces';
import { composeClass } from 'shared/helpers';

import './Alert.css';

const Alert: FC<IAlertProps> = ({ variant, action, className, children }) => {
  return (
    <div className={composeClass(['alert', `alert-${variant}`, className])}>
      <span className="alert__text">{children}</span>
      {action && <span className="alert__action">{action}</span>}
    </div>
  );
};

export default Alert;
