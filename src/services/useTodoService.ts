import { useMutationPrivate, useQueryPrivate } from 'shared/hooks';
import useTodoStore from 'store/todo/useTodo';
import { ITodo } from 'models/Todo';
import { API } from 'api';
import { useEffect } from 'react';

const useTodoService = () => {
  const todoStore = useTodoStore();

  const todosQuery = useQueryPrivate<ITodo[]>(API.TODOS);
  const createMutation = useMutationPrivate<ITodo>({
    method: 'post',
    url: API.TODOS
  });
  const deleteMutation = useMutationPrivate<ITodo>({
    method: 'delete'
  });

  const createTodo = async (name: string) => {
    const todo = await createMutation.mutate({ name });
    todo && todoStore.createTodo(todo);
  };
  const deleteTodo = async (id: number) => {
    await deleteMutation.mutate(null, { url: `${API.TODOS}/${id}` });
    todoStore.deleteTodo(id);
  };

  useEffect(() => {
    if (todosQuery.isSuccess && todosQuery.data) {
      todoStore.setTodos(todosQuery.data);
    }
  }, [todosQuery.isSuccess]);

  return {
    todosQuery,
    createTodo,
    deleteTodo,
    deleteMutation,
    createMutation
  };
};

export default useTodoService;
