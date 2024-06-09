import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { BaseQueryError, BaseQueryMeta } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { ProfileResponse } from '../../../models/Profile/ProfileModel';
import { BaseAxiosResponseGetDetail } from '../../../models/globalInterface';

export const getProfile = (
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
    builder.query<ProfileResponse, any>({
        query: () => {
            return {
                url: `/api/customer/get-by-token`,
                method: 'GET',
            };
        },
        transformResponse: async (
            response: BaseAxiosResponseGetDetail<ProfileResponse>,
            meta: any,
            arg: any,
        ) => {
            return response.Data as ProfileResponse;
        },
        transformErrorResponse(
            baseQueryReturnValue: BaseQueryError<any>,
            meta: BaseQueryMeta<any>,
            arg: any,
        ): any {
            return baseQueryReturnValue;
        },
        async onQueryStarted(
            arg,
            { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry },
        ) {},
    });
