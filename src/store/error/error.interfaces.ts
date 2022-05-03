import { AxiosError } from 'axios';

export interface IErrorState {
  hasError: boolean;
  error: AxiosError | Error | null;
}
