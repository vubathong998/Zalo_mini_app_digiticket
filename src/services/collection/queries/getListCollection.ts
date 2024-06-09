import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { GetListCollectionRequest } from 'models/Collection/CollectionRequest';
import { ListCollectionResponse } from 'models/Collection/CollectionResponse';
import {
    BaseAxiosResponse,
    PaginationDataResponse
} from 'models/globalInterface';

export const getListCollection = (
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
    builder.query<PaginationDataResponse<ListCollectionResponse>, GetListCollectionRequest>({
        query: (arg: GetListCollectionRequest) => ({
            url: `/api/v2/collection/get-by-page`,
            method: 'POST',
            body: { ...arg },
        }),
        transformResponse: async (
            response: BaseAxiosResponse<ListCollectionResponse>,
            meta: any,
            arg: GetListCollectionRequest,
        ) => {
            return response.Data as PaginationDataResponse<ListCollectionResponse>;
        },
        async onQueryStarted(
            arg,
            { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry },
        ) {},
    });
