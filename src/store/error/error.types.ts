import { ActionType } from 'store/store.types';
import ErrorAction from './error.actions';

export type ErrorActionType = ReturnType<ActionType<typeof ErrorAction>>;
export const enum ErrorType {
  SET_ERROR = 'SET_ERROR',
  CLEAR_ERROR = 'CLEAR_ERROR'
}
