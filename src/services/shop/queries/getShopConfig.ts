import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { ObjectConfigTypeEnum } from 'models/ConfigTags/ConfigTagsEnum';
import { ConfigTagsModel } from 'models/ConfigTags/ConfigTagsModel';
import { BaseAxiosResponseGetAll } from 'models/globalInterface';

type Request = {
    Id?: string;
    Code?: string;
    ObjectConfigType?: ObjectConfigTypeEnum;
    LanguageCode?: 'vi-VN' | 'en-US' | string;
    Aid: string;
};
export const getShopConfig = (
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
    builder.query<Array<ConfigTagsModel>, Request>({
        query: (arg: Request) => ({
            url: `api/tags-config/config/get-all-child-public`,
            method: 'GET',
            params: arg,
        }),
        transformResponse: async (
            response: BaseAxiosResponseGetAll<Array<ConfigTagsModel>>,
            meta: any,
            arg: Request,
        ) => {
            return response.Data as Array<ConfigTagsModel>;
        },
        async onQueryStarted(
            arg,
            { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry },
        ) {},
    });
