import { memo } from 'react';
import axios from 'axios';

import { useTodo } from 'store/todo';
import { ITodo } from 'models/Todo';

const TestStore = ({ name }: { name: string }) => {
  console.log('Render: TestStore ' + name);

  const todo = useTodo();

  const getTodo = () => {
    const getTodoAsync = async () => {
      const receivedTodo = await axios.get<ITodo>(
        'https://jsonplaceholder.typicode.com/todos/1'
      );

      return todo.createTodo(receivedTodo.data);
    };

    getTodoAsync();
  };
  const createTodo = () => {
    const newTodo: ITodo = { id: todo.state.length + 2, name: '' };

    todo.createTodo({
      ...newTodo,
      name: `Todo ${newTodo.id}`
    });
  };
  const deleteTodo = () =>
    todo.state.length && todo.deleteTodo(todo.state[todo.state.length - 1].id);

  return (
    <div>
      <button onClick={getTodo}>Get todo async</button>
      <button onClick={createTodo}>Create todo</button>
      <button onClick={deleteTodo}>Delete last todo</button>

      {todo.state.map((t, i) => (
        <p key={i}>
          {t.id} - {t.name}
        </p>
      ))}
    </div>
  );
};

export default memo(TestStore);
