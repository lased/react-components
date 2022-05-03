import axios, {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
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
    data: null as AxiosResponse<T> | null
  });
  const errorStore = useErrorStore();
  const abortController = useRef(new AbortController());

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
    if (abortController.current.signal.aborted) {
      return;
    }

    setMetadata((old) => ({
      ...old,
      isLoading: false,
      isError: true,
      error: error
    }));
    errorStore.setError(error);
  };
  const success = (data: AxiosResponse<T>) => {
    setMetadata((old) => ({
      ...old,
      isLoading: false,
      isSuccess: true,
      data
    }));
  };
  const query = (customConfig: AxiosRequestConfig = {}) => {
    if (!metadata.isLoading) {
      let newConfig = {
        ...(typeof config === 'string' ? { url: config } : config),
        ...customConfig,
        signal: abortController.current.signal
      };

      if (BASE_URL) {
        newConfig = {
          baseURL: BASE_URL,
          ...newConfig
        };
      }

      fetching();
      (instance || axios)(newConfig).then(success).catch(catchError);
    }
  };
  const abort = () => abortController.current.abort();

  useEffect(() => () => abort(), []);

  return {
    ...metadata,
    query
  };
};

export default useAxios;
