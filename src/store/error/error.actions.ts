import { ErrorType } from './error.types';

const setError = (message: string) =>
  ({
    type: ErrorType.SET_ERROR,
    message
  } as const);
const clear = () =>
  ({
    type: ErrorType.CLEAR_ERROR
  } as const);

const ErrorAction = {
  setError,
  clear
};

export default ErrorAction;
