import React, { useEffect, useRef, useState } from 'react';
import { Observable, Subscription } from 'rxjs';

const useQuery = <T>(
  query: () => Promise<T> | Observable<T>,
  depends = [] as React.DependencyList
) => {
  const [metadata, setMetadata] = useState({
    isSuccess: false,
    isLoading: false,
    isError: false,
    error: null as any | null,
    data: null as T | null
  });
  const [counter, setCounter] = useState(0);
  const queryInstance = useRef<ReturnType<typeof query> | null>(null);

  const refetch = () => {
    if (!queryInstance.current) {
      setCounter((oldCounter) => oldCounter + 1);
    }
  };
  const fetching = () => {
    if (!queryInstance.current) {
      setMetadata((old) => ({
        ...old,
        isLoading: true,
        isSuccess: false,
        isError: false,
        error: null,
        data: null
      }));
      queryInstance.current = query();
    }
  };
  const catchError = (error: any) => {
    setMetadata((old) => ({
      ...old,
      isLoading: false,
      isError: true,
      error: error,
    }));
    queryInstance.current = null;
  };
  const success = (data: T) => {
    setMetadata((old) => ({
      ...old,
      isLoading: false,
      isSuccess: true,
      data
    }));
    queryInstance.current = null;
  };

  useEffect(() => {
    let subscription$: Subscription | null = null;

    fetching();

    if (queryInstance.current instanceof Promise) {
      queryInstance.current.then(success).catch(catchError);
    }
    if (queryInstance.current instanceof Observable) {
      subscription$ = queryInstance.current.subscribe({
        error: catchError,
        next: success
      });
    }

    return () => subscription$?.unsubscribe();
  }, [counter, ...depends]);

  return {
    ...metadata,
    refetch
  };
};

export default useQuery;
