import { AuthActionType, AuthType } from './auth.types';
import { IAuthState } from './auth.interfaces';

export const initialState: IAuthState = {
  isLoggedIn: false,
  accessToken: null as string | null
};
export const authReducer = (
  prevState: IAuthState,
  action: AuthActionType
): IAuthState => {
  switch (action.type) {
    case AuthType.LOGIN:
      return {
        ...prevState,
        isLoggedIn: true,
        accessToken: action.accessToken
      };
    case AuthType.LOGOUT:
      return {
        ...prevState,
        isLoggedIn: false,
        accessToken: null
      };
    default:
      return { ...prevState };
  }
};
