import { errorReducer, initialState } from './error.reducer';
import ErrorAction from './error.actions';
import useStore from '../useStore';

const useErrorStore = () => {
  const { data, ...allProps } = useStore(
    'error',
    errorReducer,
    ErrorAction,
    initialState
  );

  return {
    ...allProps,
    ...data
  };
};

export default useErrorStore;
