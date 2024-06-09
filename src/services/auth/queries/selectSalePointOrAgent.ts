import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { LoginResponse } from '../../../models/Auth/AuthResponse';
import { BaseAxiosResponseGetAll } from '../../../models/globalInterface';

export const selectSalePointOrAgent = (
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
    builder.query<LoginResponse, { Id: string }>({
        query: (arg: {} & { Id: string }) => {
            return {
                url: `api/distributor/${arg.Id}/select`,
                method: 'GET',
            };
        },
        transformResponse: async (
            response: BaseAxiosResponseGetAll<LoginResponse>,
            meta: any,
            arg: any,
        ) => {
            return response.Data as LoginResponse;
        },
        async onQueryStarted(
            arg,
            {
                dispatch,
                getState,
                extra,
                requestId,
                queryFulfilled,
                getCacheEntry,
                updateCachedData,
            },
        ) {},
    });
