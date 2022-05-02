import { delay, from, map } from 'rxjs';
import { useState } from 'react';
import axios from 'axios';

import { ITodo } from 'models/Todo';
import { useQuery } from 'shared/hooks';

const TestQuery = () => {
  const [isError, setIsError] = useState(false);
  const [counter, setCounter] = useState(0);
  const query = useQuery(
    () =>
      from(
        axios.get<ITodo>('https://jsonplaceholder.typicode.com/todos/1')
      ).pipe(
        delay(2000),
        map((v) => {
          if (isError) {
            throw new Error('Simulate error');
          }

          return v;
        })
      ),
    [counter, isError]
  );
  const todo = query.data?.data;

  const refetch = () => {
    setIsError(false);
    query.refetch();
  };
  const changeDepends = () => {
    setIsError(false);
    setCounter((oldCounter) => oldCounter + 1);
  };
  const initError = () => {
    setIsError(true);
    query.refetch();
  };

  return (
    <>
      <button onClick={refetch}>Refetch</button>
      <button onClick={changeDepends}>Change depends</button>
      <button onClick={initError}>Get error</button>

      {query.isLoading && <strong>LOADING...</strong>}
      {query.isSuccess && <strong>SUCCESS</strong>}
      {query.isError && <strong>ERROR: {query.error?.message}</strong>}
      {query.isSuccess && todo && (
        <p>
          {todo.id} - {todo.title}
        </p>
      )}
    </>
  );
};

export default TestQuery;
