import { createEntityAdapter } from 'shared/helpers';
import { ActionType } from '../store.types';
import { TodoType } from './todo.types';
import Actions from './todo.actions';
import { ITodo } from 'models/Todo';

const todoAdapter = createEntityAdapter<ITodo>();

export const initialState: ITodo[] = [
  { id: 1, name: 'Todo 1' },
  { id: 3, name: 'Todo 3' }
];
export const todoReducer = (
  prevState: ITodo[],
  action: ReturnType<ActionType<typeof Actions>>
) => {
  switch (action.type) {
    case TodoType.CREATE_TODO:
      return todoAdapter.add(prevState, action.todo);
    case TodoType.DELETE_TODO:
      return todoAdapter.remove(prevState, action.id);

    default:
      return [...prevState];
  }
};
