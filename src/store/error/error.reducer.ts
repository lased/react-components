import { ErrorActionType, ErrorType } from './error.types';
import { IErrorState } from './error.interfaces';

export const initialState: IErrorState = {
  hasError: false,
  error: null
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
        error: action.error
      };
    case ErrorType.CLEAR_ERROR:
      return {
        ...prevState,
        hasError: false,
        error: null
      };
    default:
      return { ...prevState };
  }
};
