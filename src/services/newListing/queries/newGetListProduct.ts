import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { NewListingGetByPageRequest } from 'models/NewListing/NewListingRequest';
import { NewListingGetByPageResponse } from 'models/NewListing/NewListingResponse';
import { BaseAxiosResponse, PaginationDataResponse } from 'models/globalInterface';

export const newListingGetByPage = (
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
    builder.query<PaginationDataResponse<NewListingGetByPageResponse>, NewListingGetByPageRequest>({
        query: (arg: NewListingGetByPageRequest) => ({
            url: `api-end-user/listing/get-by-page`,
            method: 'POST',
            body: {
                ...arg,
            },
        }),
        transformResponse: async (
            response: BaseAxiosResponse<NewListingGetByPageResponse>,
            meta: any,
            arg: NewListingGetByPageRequest,
        ) => {
            return response.Data as PaginationDataResponse<NewListingGetByPageResponse>;
        },
        async onQueryStarted(
            arg,
            { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry },
        ) {},
    });
