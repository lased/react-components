import { ActionType } from 'store/store.types';
import AuthAction from './auth.actions';

export type AuthActionType = ReturnType<ActionType<typeof AuthAction>>;
export const enum AuthType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT'
}
