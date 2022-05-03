import { AuthType } from './auth.types';

const login = (accessToken: string) =>
  ({
    type: AuthType.LOGIN,
    accessToken
  } as const);
const logout = () =>
  ({
    type: AuthType.LOGOUT
  } as const);

const AuthAction = {
  login,
  logout
};

export default AuthAction;
