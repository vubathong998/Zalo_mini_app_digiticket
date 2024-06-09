import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';
import { NewGetCartDetailRequest } from 'models/NewCart/NewCartModel';
import { NewCartGetDetailResponse } from 'models/NewCart/NewCartResponse';
import { BaseAxiosResponseGetDetail } from 'models/globalInterface';

export const newGetCartDetail = (
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
    builder.query<NewCartGetDetailResponse, NewGetCartDetailRequest>({
        query: (arg: NewGetCartDetailRequest) => ({
            url: `api-end-user/cart/${arg.Id}`,
            method: 'GET',
        }),
        transformResponse: async (
            response: BaseAxiosResponseGetDetail<NewCartGetDetailResponse>,
            meta: any,
            arg: NewGetCartDetailRequest,
        ) => {
            return response.Data as NewCartGetDetailResponse;
        },
        async onQueryStarted(
            arg,
            { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry },
        ) {},
    });
