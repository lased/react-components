import React, { useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';

import useAxios from './useAxios';

const useQuery = <T>(
  config: string | AxiosRequestConfig,
  depends = [] as React.DependencyList
) => {
  const [counter, setCounter] = useState(0);
  const { query, ...axios } = useAxios<T>(config);

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

export default useQuery;
