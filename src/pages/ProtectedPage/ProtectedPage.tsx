import { Link } from 'react-router-dom';

import useTodoService from 'services/useTodoService';
import useTodoStore from 'store/todo/useTodo';

const ProtectedPage = () => {
  console.log('Render: Protected');

  const { createTodo, deleteTodo, todosQuery } = useTodoService();
  const todoStore = useTodoStore();

  return (
    <>
      <Link to="/">To home</Link>
      <div>
        <h2>Todos:</h2>
        <button onClick={() => createTodo(`Todo - ${todoStore.state.length}`)}>
          Create Todo
        </button>
        {todosQuery.isLoading && <strong>Loading...</strong>}
        {todosQuery.isSuccess &&
          todoStore.state?.map((todo) => (
            <p key={todo.id}>
              {todo.name}
              <button onClick={() => deleteTodo(todo.id)}>X</button>
            </p>
          ))}
      </div>
    </>
  );
};

export default ProtectedPage;
