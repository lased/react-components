import axios, {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';
import { useRef, useState } from 'react';

import { useErrorStore } from 'store/error';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useAxios = <T>(
  config: string | AxiosRequestConfig,
  instance?: AxiosInstance
) => {
  const [metadata, setMetadata] = useState({
    isSuccess: false,
    isLoading: false,
    isError: false,
    error: null as any | null,
    data: null as AxiosResponse<T> | null
  });
  const errorStore = useErrorStore();
  const queryInstance = useRef<AxiosPromise<any> | null>(null);

  const fetching = () => {
    setMetadata((old) => ({
      ...old,
      isLoading: true,
      isSuccess: false,
      isError: false,
      error: null,
      data: null
    }));
  };
  const catchError = (error: AxiosError) => {
    setMetadata((old) => ({
      ...old,
      isLoading: false,
      isError: true,
      error: error
    }));
    queryInstance.current = null;
    errorStore.setError(error);
  };
  const success = (data: AxiosResponse<T>) => {
    setMetadata((old) => ({
      ...old,
      isLoading: false,
      isSuccess: true,
      data
    }));
    queryInstance.current = null;
  };
  const query = (customConfig: AxiosRequestConfig = {}) => {
    if (!queryInstance.current) {
      let newConfig = {
        ...(typeof config === 'string' ? { url: config } : config),
        ...customConfig
      };

      if (BASE_URL) {
        newConfig = {
          baseURL: BASE_URL,
          ...newConfig
        };
      }

      fetching();

      if (instance) {
        queryInstance.current = instance(newConfig);
      } else {
        queryInstance.current = axios(newConfig);
      }

      queryInstance.current.then(success).catch(catchError);
    }
  };

  return {
    ...metadata,
    query
  };
};

export default useAxios;
