import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { NewOrderInfoGetDetailRequest } from 'models/NewOrderInfo/NewOrderInfoRequest';
import { NewOrderInfoGetDetailResponse } from 'models/NewOrderInfo/NewOrderInfoResponse';
import { BaseAxiosResponseGetDetail } from 'models/globalInterface';

export const newOrderInfoGetDetail = (
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
    builder.query<NewOrderInfoGetDetailResponse, NewOrderInfoGetDetailRequest>({
        query: (arg) => ({
            url: `api-end-user/orders/${arg.OrderCode}/get-detail`,
            method: 'GET',
        }),
        transformResponse: async (
            response: BaseAxiosResponseGetDetail<NewOrderInfoGetDetailResponse>,
            meta: any,
            arg: NewOrderInfoGetDetailRequest,
        ) => {
            return response.Data as NewOrderInfoGetDetailResponse;
        },
        async onQueryStarted(
            arg,
            { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry },
        ) {},
    });
