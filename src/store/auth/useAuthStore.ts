import { authReducer, initialState } from './auth.reducer';
import { useStore } from 'shared/hooks';
import AuthAction from './auth.actions';

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
