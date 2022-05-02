import { TodoType } from './todo.types';
import { ITodo } from 'models/Todo';
import axios from 'axios';

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

const getTodoAsync = async () => {
  const todo = await axios.get<ITodo>(
    'https://jsonplaceholder.typicode.com/todoss/1'
  );

  return createTodo(todo.data);
};

export const ActionSync = {
  createTodo,
  deleteTodo
};
export const ActionAsync = {
  getTodoAsync
};
