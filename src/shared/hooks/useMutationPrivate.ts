import { AxiosRequestConfig } from 'axios';

import useAxiosPrivate from './useAxiosPrivate';

const useMutationPrivate = <T>(config: string | AxiosRequestConfig) => {
  const { query, ...axios } = useAxiosPrivate<T>(config);

  const mutate = (params?: any, config: AxiosRequestConfig = {}) =>
    query({ data: params, ...config });

  return {
    ...axios,
    mutate
  };
};

export default useMutationPrivate;
