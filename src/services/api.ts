import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    retry,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { removeDataStorageByKey } from 'utils/nativeStorage';
import appConfig from '../../app-config.json';
import { getDataStorageByKey } from './../utils/nativeStorage';

const mutex = new Mutex();

// @ts-ignore
export const API_URL = import.meta.env.VITE_API_URL as string;

interface ExtendedHeaders extends Headers {
    ClientId?: string;
    ClientSecret?: string;
}
const staggeredBaseQuery = retry(
    fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: async (headers: ExtendedHeaders, { getState }) => {
            const res: Record<string, string> = (await getDataStorageByKey(
                appConfig.nativeKey.scToken,
            )) as Record<string, string>;

            headers.set('ClientId', appConfig.env.VITE_CLIENT_ID);
            headers.set('ClientSecret', appConfig.env.VITE_CLIENT_SECRET);
            headers.set('Access-Control-Allow-Origin', '*');

            if (
                `${appConfig.nativeKey.scToken}` in res &&
                Boolean(res[appConfig.nativeKey.scToken])
            ) {
                headers.set('authorization', `Bearer ${res[appConfig.nativeKey.scToken]}`);
            }

            return headers;
        },
    }),
    {
        maxRetries: 0,
    },
);
const baseQueryWithReAuth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    {} & RetryOptions,
    FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
    // await mutex.waitForUnlock();

    let result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta> =
        (await staggeredBaseQuery(args, api, extraOptions)) as QueryReturnValue<
            unknown,
            FetchBaseQueryError,
            FetchBaseQueryMeta
        >;
    if (result?.error) {
        switch (result.error.status) {
            case 401:
                // await removeDataStorageByKey(appConfig.nativeKey.scRefreshToken);
                // await removeDataStorageByKey(appConfig.nativeKey.scToken);
                // await removeDataStorageByKey(appConfig.nativeKey.zToken);
                // await removeDataStorageByKey(appConfig.nativeKey.selectedShop);
                // window.location.reload();
                if (!mutex.isLocked()) {
                    const release = await mutex.acquire();
                    try {
                        getDataStorageByKey(appConfig.nativeKey.scRefreshToken).then(
                            async (res: Record<string, string>) => {
                                if (
                                    `${appConfig.nativeKey.scRefreshToken}` in res &&
                                    Boolean(res[appConfig.nativeKey.scRefreshToken])
                                ) {
                                    const refreshResult = await staggeredBaseQuery(
                                        {
                                            url: `https://openvnid.com/api/account/token/refresh/${
                                                res[appConfig.nativeKey.scRefreshToken]
                                            }`,
                                            method: 'GET',
                                        },
                                        api,
                                        extraOptions,
                                    );

                                    if (
                                        refreshResult.data &&
                                        //@ts-ignore
                                        'Code' in refreshResult.data &&
                                        //@ts-ignore
                                        refreshResult.data.Code > 0
                                    ) {
                                        // Retry the initial query
                                        result = await staggeredBaseQuery(args, api, extraOptions);
                                    } else {
                                        await removeDataStorageByKey(
                                            appConfig.nativeKey.scRefreshToken,
                                        );
                                        await removeDataStorageByKey(appConfig.nativeKey.scToken);
                                        await removeDataStorageByKey(appConfig.nativeKey.zToken);
                                        await removeDataStorageByKey(
                                            appConfig.nativeKey.selectedShop,
                                        );
                                        window.location.reload();
                                    }
                                } else {
                                    await removeDataStorageByKey(appConfig.nativeKey.scToken);
                                    await removeDataStorageByKey(appConfig.nativeKey.zToken);
                                    await removeDataStorageByKey(appConfig.nativeKey.selectedShop);
                                    await removeDataStorageByKey(
                                        appConfig.nativeKey.scRefreshToken,
                                    );
                                    window.location.reload();
                                }
                            },
                        );
                    } finally {
                        // release must be called once the mutex should be released again.
                        release();
                    }
                } else {
                    // wait until the mutex is available without locking it
                    await mutex.waitForUnlock();
                    result = await staggeredBaseQuery(args, api, extraOptions);
                }

                return result;
            case 403:
                await removeDataStorageByKey(appConfig.nativeKey.scToken);
                await removeDataStorageByKey(appConfig.nativeKey.zToken);
                await removeDataStorageByKey(appConfig.nativeKey.selectedShop);
                await removeDataStorageByKey(appConfig.nativeKey.scRefreshToken);
                window.location.reload();
                return result;
            case 400:
                if (result?.error?.data && typeof result?.error?.data === 'object') {
                    if ('Message' in result.error.data) {
                        console.log((result.error.data.Message as string) || '');
                    }
                    if ('title' in result.error.data) {
                        console.log((result.error.data.title as string) || '');
                    }
                }
                return result;
            default:
                return result;
        }
    }
    return result;
};
export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReAuth,
    refetchOnMountOrArgChange: 10,
    refetchOnReconnect: true,
    tagTypes: [],
    endpoints: () => ({}),
    keepUnusedDataFor: 30000,
});
