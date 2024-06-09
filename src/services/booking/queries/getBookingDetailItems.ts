import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { BookingItemDetailModel } from 'models/Booking/BookingModel';
import { BookingDetailRequest } from 'models/Booking/BookingRequest';
import { BaseAxiosResponseGetAll } from 'models/globalInterface';

export const getBookingDetailItems = (
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
    builder.query<Array<BookingItemDetailModel>, BookingDetailRequest>({
        query: (arg: BookingDetailRequest) => ({
            url: `api/v2/orders/${arg.OrderCode}/item-details`,
            method: 'GET',
        }),
        transformResponse: async (
            response: BaseAxiosResponseGetAll<Array<BookingItemDetailModel>>,
            meta: any,
            arg: BookingDetailRequest,
        ) => {
            return response.Data as Array<BookingItemDetailModel>;
        },
        async onQueryStarted(
            arg,
            { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry },
        ) {},
    });
