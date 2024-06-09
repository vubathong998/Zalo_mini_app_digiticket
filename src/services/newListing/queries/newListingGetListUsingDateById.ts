import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { NewListingGetListUsingDateByIdRequest } from 'models/NewListing/NewListingRequest';
import { NewListingGetListUsingDateByIdResponse } from 'models/NewListing/NewListingResponse';
import { BaseAxiosResponseGetDetail } from 'models/globalInterface';

export const newListingGetListUsingDateById = (
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
    builder.query<NewListingGetListUsingDateByIdResponse, NewListingGetListUsingDateByIdRequest>({
        query: (arg) => ({
            url: `api-end-user/listing/${arg.Id}/get-list-usingdate`,
            method: 'GET',
            params: {
                AId: arg.AId,
            },
        }),
        transformResponse: async (
            response: BaseAxiosResponseGetDetail<NewListingGetListUsingDateByIdResponse>,
        ) => {
            return response.Data as NewListingGetListUsingDateByIdResponse;
        },
        async onQueryStarted(
            arg,
            { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry },
        ) {},
    });
