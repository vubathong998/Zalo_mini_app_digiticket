import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';
import { NewCreateOrderFromCartRequest } from 'models/NewCart/NewCartRequest';
import { NewCreateOrderFromCartResponse } from 'models/NewCart/NewCartResponse';
import { BaseAxiosResponseGetDetail } from 'models/globalInterface';

export const newCreateOrderFromCart = (
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
    builder.mutation<NewCreateOrderFromCartResponse, NewCreateOrderFromCartRequest>({
        query: (arg: NewCreateOrderFromCartRequest) => ({
            url: `api-end-user/cart/create-order`,
            method: 'POST',
            body: {
                ...arg,
            },
        }),
        transformResponse: async (
            response: BaseAxiosResponseGetDetail<NewCreateOrderFromCartResponse>,
            meta: any,
            arg: NewCreateOrderFromCartRequest,
        ) => {
            return response.Data as NewCreateOrderFromCartResponse;
        },
        async onQueryStarted(
            arg,
            { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry },
        ) {},
    });
