import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { BookingListRequest } from 'models/Booking/BookingRequest';
import { BookingListResponse } from 'models/Booking/BookingResponse';
import { BaseAxiosResponse, PaginationDataResponse } from 'models/globalInterface';

export const getMyBooking = (
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
    builder.query<PaginationDataResponse<BookingListResponse>, BookingListRequest>({
        query: (arg: BookingListRequest) => ({
            url: `api/orders/customer-get-by-page`,
            method: 'POST',
            body: {
                ...arg,
            },
        }),
        transformResponse: async (
            response: BaseAxiosResponse<BookingListResponse>,
            meta: any,
            arg: BookingListRequest,
        ) => {
            return response.Data as PaginationDataResponse<BookingListResponse>;
        },
        async onQueryStarted(
            arg,
            { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry },
        ) {},
    });
