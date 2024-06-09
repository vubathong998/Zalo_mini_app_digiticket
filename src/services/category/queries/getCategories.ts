import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { CategoryListResponse } from 'models/Category/CategoryResponse';
import { BaseAxiosResponseGetAll } from 'models/globalInterface';

export const getCategories = (
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
    builder.query<CategoryListResponse, { AId?: string }>({
        keepUnusedDataFor: 30000000,
        query: (arg: { AId?: string }) => ({
            url: 'api/category/getall',
            method: 'GET',
            params: {
                ...arg,
            },
        }),
        transformResponse: async (
            response: BaseAxiosResponseGetAll<CategoryListResponse>,
            meta: any,
            arg: { AId?: string },
        ) => {
            return response.Data as CategoryListResponse;
        },
        async onQueryStarted(
            arg,
            { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry },
        ) {},
    });
