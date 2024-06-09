import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import type { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import type { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { CartResponse } from 'models/Cart/CartResponse';
import { BaseAxiosResponseGetDetail } from 'models/globalInterface';

export const getCartDetail = (
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
    builder.query<
        CartResponse,
        {
            CartId: string;
        }
    >({
        query: (arg: { CartId: string }) => ({
            url: `api/cart-public/${arg.CartId}`,
            method: 'GET',
        }),
        transformResponse: async (
            response: BaseAxiosResponseGetDetail<CartResponse>,
            meta: any,
            arg: {
                CartId: string;
            },
        ) => {
            return response.Data as CartResponse;
        },
        async onQueryStarted(
            arg,
            { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry },
        ) {},
    });
