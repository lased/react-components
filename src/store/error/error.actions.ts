import { AxiosError } from 'axios';
import { ErrorType } from './error.types';

const setError = (error: AxiosError | Error) =>
  ({
    type: ErrorType.SET_ERROR,
    error
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
