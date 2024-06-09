import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { NewOrderTicketGetListRequest } from 'models/NewOrderInfo/NewOrderInfoRequest';
import { NewOrderTicketGetListResponse } from 'models/NewOrderInfo/NewOrderInfoResponse';
import { BaseAxiosResponseGetDetail } from 'models/globalInterface';

export const newOrderTicketGetList = (
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
    builder.query<NewOrderTicketGetListResponse, NewOrderTicketGetListRequest>({
        query: (arg) => ({
            url: `api-end-user/orders/${arg.OrderCode}/get-list-ordertickets`,
            method: 'GET',
        }),
        transformResponse: async (
            response: BaseAxiosResponseGetDetail<NewOrderTicketGetListResponse>,
            meta: any,
            arg: NewOrderTicketGetListRequest,
        ) => {
            return response.Data as NewOrderTicketGetListResponse;
        },
        async onQueryStarted(
            arg,
            { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry },
        ) {},
    });
