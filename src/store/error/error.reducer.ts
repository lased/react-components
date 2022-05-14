import axios from 'axios';

import { ErrorActionType, ErrorType } from './error.types';
import { IErrorState } from './error.interfaces';

export const initialState: IErrorState = {
  hasError: false,
  message: null
};
export const errorReducer = (
  prevState: IErrorState,
  action: ErrorActionType
): IErrorState => {
  switch (action.type) {
    case ErrorType.SET_ERROR:
      let message = '';

      if (axios.isAxiosError(action.error)) {
        if (action.error.response) {
          const response = action.error.response;
          const { data } = response;

          message = data.message || response.statusText;
        } else if (action.error.request) {
          message = action.error.request.request;
        }
      } else {
        message = action.error.message;
      }

      return {
        ...prevState,
        hasError: true,
        message
      };
    case ErrorType.CLEAR_ERROR:
      return {
        ...prevState,
        hasError: false,
        message: null
      };
    default:
      return { ...prevState };
  }
};
