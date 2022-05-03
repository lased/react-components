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
      return {
        ...prevState,
        hasError: true,
        message: action.message
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
