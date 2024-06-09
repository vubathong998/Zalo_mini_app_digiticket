import type { InternalAxiosRequestConfig } from 'axios';
import axiosBase from 'axios';
import { getDataStorageByKey } from 'utils/nativeStorage';
import { API_URL } from './api';

export type AxiosRequestType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const accessControlAllowOrigin = {
    'Access-Control-Allow-Origin': '*',
};

const { scToken }: { scToken: string } = getDataStorageByKey('scToken') as unknown as {
    scToken: string;
};
let axios = axiosBase.create({
    baseURL: API_URL,
    withCredentials: false, // to use cookies
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${scToken}`,
        timeout: 30000,
        ...accessControlAllowOrigin,
    },
});

axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (!config?.headers) {
            throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
        }
        // config.headers.Authorization = 'application/json';
        // config.headers.Authorization = `Bearer ${getAccessToken(process.env.AUTH_KEY as string)}`;
        // config.headers.Timeout = 30000;
        // config.headers.AcceptLanguage = getCookie(process.env.LANGUAGE as string);

        return { ...config, ...accessControlAllowOrigin };
        // return {
        //     ...config,
        //     headers: {
        //         ...config.headers,
        //         common: {
        //             ...config.headers?.common,
        //             Accept: 'application/json',
        //             Authorization: accessToken(),
        //             'Access-Control-Allow-Origin': '*',
        //         },
        //         // common: {
        //         //     ...config.headers?.common,
        //         //     Accept: 'application/json',
        //         //     Authorization: accessToken(),
        //         //     'Access-Control-Allow-Origin': '*',
        //         // },
        //     },
        //     timeout: 30000,
        //     ...accessControlAllowOrigin,
        // };
    },
    (error: any) => Promise.reject(error),
);

axios.interceptors.response.use(undefined, async (err) => {
    const error = err.response;
    // if error is 401
    if (error.status === 401 && error.config && !error.config.__isRetryRequest) {
        // MySwal.fire({
        //     title: 'Tài khoản đã bị đăng nhập ở nơi khác',
        //     html: '',
        //     icon: 'error',
        //     didClose: () => {
        //         removeCookie(process.env.REACT_APP_AUTH_KEY as string);
        //         removeCookie(process.env.REACT_APP_AUTH_REFRESH as string);
        //         window.location.href = '/';
        //     },
        // });
    }
});

export default axios;
