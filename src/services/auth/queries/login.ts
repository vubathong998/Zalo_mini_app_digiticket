import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import appConfig from '../../../../app-config.json';
import { LoginRequest } from '../../../models/Auth/AuthRequest';
import { LoginResponse } from '../../../models/Auth/AuthResponse';
import { BaseAxiosResponseAuth } from '../../../models/globalInterface';
import { setDataStorageByKey } from './../../../utils/nativeStorage';

export const login = (
    builder: EndpointBuilder<
        BaseQueryFn<
            string | FetchArgs,
            unknown,
            FetchBaseQueryError,
            RetryOptions,
            FetchBaseQueryMeta
        >,
        string,
        string
    >,
) =>
    builder.mutation<LoginResponse, LoginRequest>({
        query: (arg: LoginRequest) => {
            return {
                url: '/api/account/login-dis',
                method: 'POST',
                body: {
                    ...arg,
                    DistributorCode: appConfig.env.VITE_SHOP_ID,
                },
            };
        },
        transformResponse: async (
            response: BaseAxiosResponseAuth<LoginResponse>,
            meta: any,
            arg: any,
        ) => {
            if (response.Code > 0) {
                await setDataStorageByKey({
                    key: appConfig.nativeKey.scToken,
                    data: response.Data.AccessToken,
                });
            }

            return response.Data as LoginResponse;
        },
        async onQueryStarted(
            arg,
            { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry },
        ) {},
    });
