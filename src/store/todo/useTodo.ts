import { initialState, todoReducer } from './todo.reducer';
import TodoAction from './todo.actions';
import useStore from '../useStore';

const useTodoStore = () => {
  return useStore('todos', todoReducer, TodoAction, initialState);
};

export default useTodoStore;
