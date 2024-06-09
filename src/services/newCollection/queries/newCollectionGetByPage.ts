import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import type { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import type { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { NewCollectionGetByPageRequest } from 'models/NewCollection/NewCollectionRequest';
import { NewCollectionResponse } from 'models/NewCollection/NewCollectionResponse';
import {
    BaseAxiosResponse,
    BaseAxiosResponseGetDetail,
    PaginationDataResponse,
} from 'models/globalInterface';

export const newCollectionGetByPage = (
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
    builder.query<PaginationDataResponse<NewCollectionResponse>, NewCollectionGetByPageRequest>({
        query: (arg: NewCollectionGetByPageRequest) => ({
            url: `api-end-user/collection/get-by-page`,
            method: 'POST',
            body: {
                ...arg,
            },
        }),
        transformResponse: async (
            response: BaseAxiosResponse<NewCollectionResponse>,
            meta: any,
            arg: NewCollectionGetByPageRequest,
        ) => {
            return response.Data as PaginationDataResponse<NewCollectionResponse>;
        },
        async onQueryStarted(
            arg,
            { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry },
        ) {},
    });
