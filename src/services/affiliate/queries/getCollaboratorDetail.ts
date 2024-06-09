import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { CollaboratorModel } from 'models/Collaborator/CollaboratorModel';
import { BaseAxiosResponseGetAll } from 'models/globalInterface';

export const getCollaboratorDetail = (
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
    builder.query<CollaboratorModel, { aid: string; cid: string }>({
        query: (arg: { aid: string; cid: string }) => ({
            url: `api/collaborator/get-by-code-public?aid${arg.aid}=&cid=${arg.cid}`,
            method: 'GET',
        }),
        transformResponse: async (
            response: BaseAxiosResponseGetAll<CollaboratorModel>,
            meta: any,
            arg: { aid: string; cid: string },
        ) => {
            return response.Data as CollaboratorModel;
        },
        async onQueryStarted(
            arg,
            { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry },
        ) {},
    });
