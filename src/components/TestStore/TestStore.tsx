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
    const newTodo: ITodo = { id: todo.data.length + 2, title: '' };

    todo.createTodo({
      ...newTodo,
      title: `Todo ${newTodo.id}`
    });
  };
  const deleteTodo = () =>
    todo.data.length && todo.deleteTodo(todo.data[todo.data.length - 1].id);

  return (
    <div>
      <button onClick={getTodo}>Get todo async</button>
      <button onClick={createTodo}>Create todo</button>
      <button onClick={deleteTodo}>Delete todo random</button>

      {todo.data.map((t, i) => (
        <p key={i}>
          {t.id} - {t.title}
        </p>
      ))}
    </div>
  );
};

export default memo(TestStore);
