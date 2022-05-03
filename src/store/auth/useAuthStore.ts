import { authReducer, initialState } from './auth.reducer';
import AuthAction from './auth.actions';
import useStore from '../useStore';

const useAuthStore = () => {
  const { data, ...allProps } = useStore(
    'auth',
    authReducer,
    AuthAction,
    initialState
  );

  return {
    ...allProps,
    ...data
  };
};

export default useAuthStore;
