import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { NewListingDetailResponse } from 'models/NewListing/NewListingResponse';
import { BaseAxiosResponseGetDetail } from 'models/globalInterface';

export const newListingGetDetail = (
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
    builder.query<NewListingDetailResponse, { Id: string; AId: string }>({
        query: (arg) => ({
            url: `api-end-user/listing/${arg.Id}`,
            method: 'GET',
            params: {
                AId: arg.AId,
            },
        }),
        transformResponse: async (
            response: BaseAxiosResponseGetDetail<NewListingDetailResponse>,
            meta: any,
            arg,
        ) => {
            return response.Data as NewListingDetailResponse;
        },
        async onQueryStarted(
            arg,
            { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry },
        ) {},
    });
