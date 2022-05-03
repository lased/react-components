import React, { useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';

import { useAxiosPrivate } from '../useAxiosPrivate';

const useQueryPrivate = <T>(
  config: string | AxiosRequestConfig,
  depends = [] as React.DependencyList
) => {
  const [counter, setCounter] = useState(0);
  const { query, ...axios } = useAxiosPrivate<T>(config);

  const refetch = () => {
    if (!axios.isLoading) {
      setCounter((oldCounter) => oldCounter + 1);
    }
  };

  useEffect(() => {
    query();
  }, [counter, ...depends]);

  return {
    ...axios,
    refetch
  };
};

export default useQueryPrivate;
