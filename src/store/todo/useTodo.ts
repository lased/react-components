import { BehaviorSubject } from 'rxjs';

import { initialState, todoReducer } from './todo.reducer';
import { ActionAsync, ActionSync } from './todo.actions';
import { useStore } from 'shared/hooks';

const todos = new BehaviorSubject(initialState);

const useTodo = () => {
  return useStore(
    todos,
    todoReducer,
    { ...ActionAsync, ...ActionSync },
    initialState
  );
};

export default useTodo;
