import Actions from './todo.actions';
import { ActionType } from '../store.types';
import { TodoType } from './todo.types';
import { ITodo } from 'models/Todo';

export const initialState = [] as ITodo[];
export const todoReducer = (
  prevState: ITodo[],
  action: ReturnType<ActionType<typeof Actions>>
) => {
  switch (action.type) {
    case TodoType.CREATE_TODO:
      return [...prevState, action.todo];
    case TodoType.DELETE_TODO:
      return prevState.filter((todo) => todo.id !== action.id);

    default:
      return [...prevState];
  }
};
