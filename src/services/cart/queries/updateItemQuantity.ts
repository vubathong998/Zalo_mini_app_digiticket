import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import type { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import type { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { CartUpdateItemRequest } from 'models/Cart/CartRequest';
import { CartResponse } from 'models/Cart/CartResponse';
import { BaseAxiosResponseGetDetail } from 'models/globalInterface';

export const updateItemQuantity = (
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
    builder.mutation<CartResponse, CartUpdateItemRequest>({
        query: (arg: CartUpdateItemRequest) => ({
            url: `api/v2/cart/update-item`,
            method: 'PUT',
            body: {
                ...arg,
            },
        }),
        transformResponse: async (
            response: BaseAxiosResponseGetDetail<CartResponse>,
            meta: any,
            arg: CartUpdateItemRequest,
        ) => {
            return response.Data as CartResponse;
        },
        async onQueryStarted(
            arg,
            { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry },
        ) {},
    });
