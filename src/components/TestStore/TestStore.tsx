import { ITodo } from 'models/Todo';
import { memo } from 'react';

import { useTodo } from 'store/todo';

const TestStore = ({ name }: { name: string }) => {
  console.log('Render: TestStore ' + name);

  const todo = useTodo();

  const getTodo = () => todo.getTodoAsync();
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
