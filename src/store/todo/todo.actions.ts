import { TodoType } from './todo.types';
import { ITodo } from 'models/Todo';

const createTodo = (todo: ITodo) =>
  ({
    type: TodoType.CREATE_TODO,
    todo
  } as const);
const deleteTodo = (id: number) =>
  ({
    type: TodoType.DELETE_TODO,
    id
  } as const);

const TodoAction = {
  createTodo,
  deleteTodo
};
export default TodoAction;
