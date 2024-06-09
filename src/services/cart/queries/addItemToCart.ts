import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import type { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import type { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { CartAddItemRequest } from 'models/Cart/CartRequest';
import { CartResponse } from 'models/Cart/CartResponse';
import { BaseAxiosResponseGetDetail } from 'models/globalInterface';
export const addItemToCart = (
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
    builder.mutation<CartResponse, CartAddItemRequest>({
        query: (arg: CartAddItemRequest) => ({
            url: `api/v2/cart/add-item`,
            method: 'POST',
            body: {
                ...arg,
            },
        }),
        transformResponse: async (
            response: BaseAxiosResponseGetDetail<CartResponse>,
            meta: any,
            arg: CartAddItemRequest,
        ) => {
            return response.Data as CartResponse;
        },
        async onQueryStarted(
            arg,
            { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry },
        ) {},
    });
