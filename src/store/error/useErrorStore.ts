import { errorReducer, initialState } from './error.reducer';
import ErrorAction from './error.actions';
import useStore from '../useStore';

const useErrorStore = () => {
  const { state, ...allProps } = useStore(
    'error',
    errorReducer,
    ErrorAction,
    initialState
  );

  return {
    ...allProps,
    ...state
  };
};

export default useErrorStore;
