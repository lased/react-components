import { AxiosRequestConfig } from 'axios';

import { useAxios } from '../useAxios';

const useMutation = <T>(config: string | AxiosRequestConfig) => {
  const { query, ...axios } = useAxios<T>(config);

  const mutate = (params?: any, config: AxiosRequestConfig = {}) =>
    query({ data: params, ...config });

  return {
    ...axios,
    mutate
  };
};

export default useMutation;
