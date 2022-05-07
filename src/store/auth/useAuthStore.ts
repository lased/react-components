import { authReducer, initialState } from './auth.reducer';
import AuthAction from './auth.actions';
import useStore from '../useStore';

const useAuthStore = () => {
  const { state, ...allProps } = useStore(
    'auth',
    authReducer,
    AuthAction,
    initialState
  );

  return {
    ...allProps,
    ...state
  };
};

export default useAuthStore;
