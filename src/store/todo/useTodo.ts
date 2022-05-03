import { initialState, todoReducer } from './todo.reducer';
import TodoAction from './todo.actions';
import { useStore } from 'shared/hooks';

const useTodoStore = () => {
  return useStore(
    'todos',
    todoReducer,
    TodoAction,
    initialState
  );
};

export default useTodoStore;
