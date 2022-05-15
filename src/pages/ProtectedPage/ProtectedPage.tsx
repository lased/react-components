import { Link } from 'react-router-dom';
import { useState } from 'react';

import { useMutationPrivate, useQueryPrivate } from 'shared/hooks';
import { TestStore } from './components';
import { ITodo } from 'models/Todo';
import { IUser } from 'models/User';
import { API } from 'api';

const ProtectedPage = () => {
  console.log('Render: Protected');

  const [openNewStore, setOpenNewStore] = useState(false);
  const todosQuery = useQueryPrivate<ITodo[]>(API.TODOS);
  const usersQuery = useQueryPrivate<IUser[]>(API.USERS);
  const createTodoMutation = useMutationPrivate<ITodo>({
    method: 'post',
    url: API.TODOS
  });

  const createTodo = () => {
    createTodoMutation.mutate();
  };

  return (
    <>
      <Link to="/">To home</Link>
      <div style={{ display: 'flex' }}>
        <div>
          <h2>Todos:</h2>
          <button onClick={createTodo}>Create Todo</button>
          {todosQuery.isLoading && <strong>Loading...</strong>}
          {todosQuery.isSuccess &&
            todosQuery.data?.map((todo) => <p key={todo.id}>{todo.name}</p>)}
        </div>
        <div>
          <h2>Users:</h2>
          {usersQuery.isLoading && <strong>Loading...</strong>}
          {usersQuery.isSuccess &&
            usersQuery.data?.map((user) => (
              <p key={user.id}>{user.username}</p>
            ))}
        </div>
      </div>
      <div className="store">
        <TestStore name="store 1" />
        <TestStore name="store 2" />
        {openNewStore && <TestStore name="store 3" />}
        {!openNewStore && (
          <button onClick={() => setOpenNewStore(true)}>
            Open new component with store
          </button>
        )}
      </div>
    </>
  );
};

export default ProtectedPage;
