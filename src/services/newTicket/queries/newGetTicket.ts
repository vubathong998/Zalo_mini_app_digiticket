import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { NewTicketGetListRequest } from 'models/NewTicket/NewTicketRequest';
import { NewTicketGetListResponse } from 'models/NewTicket/NewTicketResponse';
import { BaseAxiosResponseGetDetail } from 'models/globalInterface';

export const newGetTicket = (
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
    builder.query<NewTicketGetListResponse, NewTicketGetListRequest>({
        query: (arg) => ({
            url: `api-end-user/ticket/${arg.OrderCode}/get-list`,
            method: 'GET',
        }),
        transformResponse: async (
            response: BaseAxiosResponseGetDetail<NewTicketGetListResponse>,
            meta: any,
            arg: NewTicketGetListRequest,
        ) => {
            return response.Data as NewTicketGetListResponse;
        },
        async onQueryStarted(
            arg,
            { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry },
        ) {},
    });
