import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';
import { newCollectionGetDetailRequest } from 'models/NewCollection/NewCollectionRequest';
import { newCollectionGetDetailResponse } from 'models/NewCollection/NewCollectionResponse';
import { BaseAxiosResponseGetDetail } from 'models/globalInterface';

export const newCollectionGetDetail = (
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
    builder.query<newCollectionGetDetailResponse, newCollectionGetDetailRequest>({
        query: (arg: newCollectionGetDetailRequest) => ({
            url: `api-end-user/collection/${arg.Id}?AId=${arg.Aid}`,
            method: 'GET',
        }),
        transformResponse: async (
            response: BaseAxiosResponseGetDetail<newCollectionGetDetailResponse>,
            meta: any,
            arg: newCollectionGetDetailRequest,
        ) => {
            return response.Data as newCollectionGetDetailResponse;
        },
        async onQueryStarted(
            arg,
            { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry },
        ) {},
    });
