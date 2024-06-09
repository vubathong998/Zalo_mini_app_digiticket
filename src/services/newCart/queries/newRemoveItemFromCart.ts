import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';
import { NewItemRemoveFromCartRequest } from 'models/NewCart/NewCartRequest';
import { NewItemRemoveFromCartResponse } from 'models/NewCart/NewCartResponse';
import { BaseAxiosResponseGetDetail } from 'models/globalInterface';

export const newRemoveItemFromCart = (
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
    builder.mutation<NewItemRemoveFromCartResponse, NewItemRemoveFromCartRequest>({
        query: (arg: NewItemRemoveFromCartRequest) => ({
            url: `api-end-user/cart/remove-item`,
            method: 'PUT',
            body: {
                ...arg,
            },
        }),
        transformResponse: async (
            response: BaseAxiosResponseGetDetail<NewItemRemoveFromCartResponse>,
            meta: any,
            arg: NewItemRemoveFromCartRequest,
        ) => {
            return response.Data as NewItemRemoveFromCartResponse;
        },
        async onQueryStarted(
            arg,
            { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry },
        ) {},
    });
