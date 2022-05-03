import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';
import { useAuthStore } from 'store/auth';

import useAxios from '../useAxios/useAxios';

const axiosPrivate = axios.create({ withCredentials: true });

const useAxiosPrivate = <T>(config: string | AxiosRequestConfig) => {
  const axios = useAxios<T>(config, axiosPrivate);
  const authStore = useAuthStore();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (request) => {
        if (!request.headers!['Authorization']) {
          request.headers!['Authorization'] = `Bearer ${authStore.accessToken}`;
        }

        return request;
      }
    );
    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const prevRequest = error.config as AxiosRequestConfig & {
          sent: boolean;
        };

        if (error.response?.status === 403 && !prevRequest.sent) {
          const newAccessToken = '123';

          prevRequest.sent = true;
          prevRequest.headers!['Authorization'] = `Bearer ${newAccessToken}`;
          authStore.login(newAccessToken);

          return axiosPrivate(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseInterceptor);
      axiosPrivate.interceptors.request.eject(requestInterceptor);
    };
  }, [authStore.accessToken]);

  return axios;
};

export default useAxiosPrivate;
