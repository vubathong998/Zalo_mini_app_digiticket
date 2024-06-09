import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { ListAccessibleAgentRequest } from '../../../models/Agent/AgentRequest';
import { ListAgentResponse } from '../../../models/Agent/AgentResponse';
import { BaseAxiosResponse, PaginationDataResponse } from '../../../models/globalInterface';

export const getListAgent = (
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
        PaginationDataResponse<ListAgentResponse>,
        ListAccessibleAgentRequest & { authorization?: string }
    >({
        query: (arg: ListAccessibleAgentRequest & { authorization?: string }) => {
            return {
                url: '/api/distributor/app-get-by-page',
                method: 'POST',
                body: { ...arg },
            };
        },
        transformResponse: (
            response: BaseAxiosResponse<ListAgentResponse>,
            meta: any,
            arg: any,
        ) => {
            return response.Data as PaginationDataResponse<ListAgentResponse>;
        },
        async onQueryStarted(
            arg,
            {
                dispatch,
                getState,
                extra,
                requestId,
                queryFulfilled,
                getCacheEntry,
                updateCachedData,
            },
        ) {},
    });
