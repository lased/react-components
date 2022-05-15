import axios, { AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';

import { useAuthStore } from 'store/auth';
import useAxios from './useAxios';
import { API } from 'api';

type ResolveType = (token: string) => void;
type ResolveAsyncType = (request: AxiosPromise) => void;
type RejectType = (error: AxiosError) => void;
type FailedRequestType = {
  resolve: ResolveType;
  reject: RejectType;
};

const axiosPrivate = axios.create();

const queueFailedRequest: FailedRequestType[] = [];
let isRefreshingToken = false;

const useAxiosPrivate = <T>(config: string | AxiosRequestConfig) => {
  const axios = useAxios<T>(config, axiosPrivate);
  const authStore = useAuthStore();

  const refresh = useAxios<{ accessToken: string }>(API.REFRESH_TOKEN);

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

        if (error.response?.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;

          if (isRefreshingToken) {
            return new Promise((resolve: ResolveType, reject: RejectType) => {
              queueFailedRequest.push({ resolve, reject });
            })
              .then((accessToken) => {
                prevRequest.headers!['Authorization'] = `Bearer ${accessToken}`;

                return axiosPrivate(prevRequest);
              })
              .catch((error) => Promise.reject(error));
          }

          isRefreshingToken = true;

          return new Promise(
            (resolve: ResolveAsyncType, reject: RejectType) => {
              refresh
                .query()
                .then(({ accessToken }) => {
                  authStore.login(accessToken);
                  queueFailedRequest.forEach((request) =>
                    request.resolve(accessToken)
                  );
                  prevRequest.headers![
                    'Authorization'
                  ] = `Bearer ${accessToken}`;
                  resolve(axiosPrivate(prevRequest));
                })
                .catch((error) => {
                  queueFailedRequest.forEach((request) =>
                    request.reject(error)
                  );
                  authStore.logout();
                  reject(error);
                })
                .finally(() => (isRefreshingToken = false));
            }
          );
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
