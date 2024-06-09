import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { BaseAxiosResponseGetDetail } from 'models/globalInterface';
import { AgentDetailModel } from '../../../models/Agent/AgentResponse';

export const getShopDetail = (
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
        AgentDetailModel,
        {
            Id: string;
        }
    >({
        query: (arg: { Id: string }) => ({
            url: `api/distributor/get-detail-public?AId=${arg.Id}`,
            method: 'GET',
        }),
        transformResponse: async (response: BaseAxiosResponseGetDetail<AgentDetailModel>) => {
            return response.Data as AgentDetailModel;
        },
        transformErrorResponse: async () => {
            return;
        },
    });
