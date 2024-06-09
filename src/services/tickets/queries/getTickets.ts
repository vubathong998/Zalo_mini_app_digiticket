import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { GetListTicketRequest } from 'models/Ticket/TicketRequest';
import { GetListTicketResponse } from 'models/Ticket/TicketResponse';
import { BaseAxiosResponse, PaginationDataResponse } from 'models/globalInterface';

export const getTickets = (
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
    builder.query<PaginationDataResponse<GetListTicketResponse>, GetListTicketRequest>({
        query: (arg: GetListTicketRequest) => ({
            url: 'api/ticket/pub-get-by-page',
            method: 'POST',
            body: {
                ...arg,
                Filter: [
                    ...arg.Filter,
                    {
                        Opt: 'AND',
                        Name: 'OrderTicketId',
                        Opt1: '=',
                        Type: 2,
                        Values: arg.OrderTicketId,
                    },
                    {
                        Opt: 'AND',
                        Name: 'OrderCode',
                        Opt1: '=',
                        Type: 2,
                        Values: arg.OrderCode,
                    },
                ],
            },
        }),
        transformResponse: async (
            response: BaseAxiosResponse<GetListTicketResponse>,
            meta: any,
            arg: GetListTicketRequest,
        ) => {
            return response.Data as PaginationDataResponse<GetListTicketResponse>;
        },
    });
