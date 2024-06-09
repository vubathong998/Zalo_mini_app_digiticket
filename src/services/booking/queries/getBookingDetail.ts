import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { BookingPaymentDetailModel } from 'models/Booking/BookingModel';
import { BaseAxiosResponseGetAll } from 'models/globalInterface';

export const getBookingDetail = (
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
    builder.query<BookingPaymentDetailModel, { OrderCode: string; Signature: string }>({
        query: (arg: { OrderCode: string; Signature: string }) => ({
            url: `api/orders/${arg.OrderCode}/payment/${arg.Signature}`,
            method: 'GET',
        }),
        transformResponse: async (
            response: BaseAxiosResponseGetAll<BookingPaymentDetailModel>,
            meta: any,
            arg: { OrderCode: string; Signature: string },
        ) => {
            return response.Data as BookingPaymentDetailModel;
        },
        async onQueryStarted(
            arg,
            { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry },
        ) {},
    });
