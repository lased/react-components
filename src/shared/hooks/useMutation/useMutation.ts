import { useRef, useState } from 'react';
import { Observable, Subscription } from 'rxjs';

const useMutation = <T>(query: (params: any) => Promise<T> | Observable<T>) => {
  const [metadata, setMetadata] = useState({
    isSuccess: false,
    isFetching: false,
    isError: false,
    error: null as any | null,
    data: null as T | null
  });
  const queryInstance = useRef<ReturnType<typeof query> | null>(null);
  const querySubscription = useRef<Subscription | null>(null);

  const queryUnsubscribe = () => {
    if (querySubscription.current) {
      querySubscription.current.unsubscribe();
    }

    querySubscription.current = null;
  };
  const fetching = () => {
    setMetadata((old) => ({
      ...old,
      isFetching: true,
      isSuccess: false,
      isError: false,
      error: null,
      data: null
    }));
  };
  const catchError = (error: any) => {
    setMetadata((old) => ({
      ...old,
      isFetching: false,
      isError: true,
      error: error
    }));
    queryUnsubscribe();
    queryInstance.current = null;
  };
  const success = (data: T) => {
    setMetadata((old) => ({
      ...old,
      isFetching: false,
      isSuccess: true,
      data
    }));
    queryUnsubscribe();
    queryInstance.current = null;
  };
  const mutate = (params: any) => {
    if (!queryInstance.current) {
      fetching();
      queryInstance.current = query(params);

      if (queryInstance.current instanceof Promise) {
        queryInstance.current.then(success).catch(catchError);
      }
      if (queryInstance.current instanceof Observable) {
        querySubscription.current = queryInstance.current.subscribe({
          error: catchError,
          next: success
        });
      }
    }
  };

  return {
    ...metadata,
    mutate
  };
};

export default useMutation;
