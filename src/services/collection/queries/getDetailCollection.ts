import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { CollectionItemModel } from 'models/Collection/CollectionModel';
import {
    BaseAxiosResponseGetDetail
} from 'models/globalInterface';

export const getDetailCollection = (
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
    builder.query<CollectionItemModel, { Id: string }>({
        query: (arg: { Id: string }) => ({
            url: `/api/v2/collection/${arg.Id}/get-detail`,
            method: 'GET',
        }),
        transformResponse: async (
            response: BaseAxiosResponseGetDetail<CollectionItemModel>,
            meta: any,
            arg: { Id: string },
        ) => {
            return response.Data as CollectionItemModel;
        },
        async onQueryStarted(
            arg,
            { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry },
        ) {},
    });
