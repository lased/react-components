import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';
import { useEffect, useRef, useState } from 'react';

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
    data: null as T | null
  });
  const errorStore = useErrorStore();
  const abortController = useRef<AbortController | null>(null);
  const prevRequest = useRef<Promise<T>>();

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
    if (!abortController.current?.signal.aborted) {
      setMetadata((old) => ({
        ...old,
        isError: true,
        error: error
      }));
      errorStore.setError(error);
    }

    return Promise.reject(error);
  };
  const success = (data: AxiosResponse<T>) => {
    setMetadata((old) => ({
      ...old,
      isSuccess: true,
      data: data.data
    }));

    return Promise.resolve(data.data);
  };
  const finallyCallback = () => {
    setMetadata((old) => ({
      ...old,
      isLoading: false
    }));
  };
  const query = (customConfig: AxiosRequestConfig = {}) => {
    if (!metadata.isLoading) {
      abortController.current = new AbortController();

      let newConfig = {
        ...(typeof config === 'string' ? { url: config } : config),
        ...customConfig,
        signal: abortController.current.signal,
        withCredentials: true
      };

      if (BASE_URL) {
        newConfig = {
          baseURL: BASE_URL,
          ...newConfig
        };
      }

      fetching();
      prevRequest.current = (instance || axios)(newConfig)
        .then(success)
        .catch(catchError)
        .finally(finallyCallback);
    }

    return prevRequest.current as Promise<T>;
  };
  const abort = () => abortController.current?.abort();

  useEffect(() => () => abort(), []);

  return {
    ...metadata,
    query,
    abort
  };
};

export default useAxios;
