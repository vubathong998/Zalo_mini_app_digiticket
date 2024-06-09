import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import type { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import type { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { CartCreateBookingRequest } from 'models/Cart/CartRequest';
import { CartCreateOrderResponse } from 'models/Cart/CartResponse';
import { BaseAxiosResponseGetDetail } from 'models/globalInterface';

export const createBooking = (
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
    builder.mutation<CartCreateOrderResponse, CartCreateBookingRequest>({
        query: (arg: CartCreateBookingRequest) => ({
            url: `api/cart/create-order`,
            method: 'POST',
            body: {
                ...arg,
            },
        }),
        transformResponse: async (
            response: BaseAxiosResponseGetDetail<CartCreateOrderResponse>,
            meta: any,
            arg: CartCreateBookingRequest,
        ) => {
            // console.log({
            //     ...arg,
            // });
            return response.Data as CartCreateOrderResponse;
        },
        async onQueryStarted(
            arg,
            { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry },
        ) {},
    });
