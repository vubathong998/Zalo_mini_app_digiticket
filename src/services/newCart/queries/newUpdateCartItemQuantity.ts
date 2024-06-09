import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import type { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import type { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { NewCartUpdateItemRequest } from 'models/NewCart/NewCartRequest';
import { NewCartUpdateItemResponse } from 'models/NewCart/NewCartResponse';
import { BaseAxiosResponseGetDetail } from 'models/globalInterface';

export const newUpdateCartItemQuantity = (
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
    builder.mutation<NewCartUpdateItemResponse, NewCartUpdateItemRequest>({
        query: (arg: NewCartUpdateItemRequest) => ({
            url: `api-end-user/cart/update-item`,
            method: 'PUT',
            body: {
                ...arg,
            },
        }),
        transformResponse: async (
            response: BaseAxiosResponseGetDetail<NewCartUpdateItemResponse>,
            meta: any,
            arg: NewCartUpdateItemRequest,
        ) => {
            return response.Data as NewCartUpdateItemResponse;
        },
        async onQueryStarted(
            arg,
            { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry },
        ) {},
    });
