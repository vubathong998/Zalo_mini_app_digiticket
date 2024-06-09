import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { BaseAxiosResponseAuth } from '../../../models/globalInterface';

export const zaloOAuthByToken = (
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
    builder.mutation<
        {
            AccessToken: string;
        },
        {
            AccessToken: string;
            Code: string;
            IsAutoRegister: true;
            AId: string;
        }
    >({
        query: (arg: { AccessToken: string; Code: string; IsAutoRegister: true; AId: string }) => ({
            url: 'api/account/login-zalo',
            method: 'POST',
            body: { ...arg },
        }),
        transformResponse: async (
            response: BaseAxiosResponseAuth<{
                AccessToken: string;
            }>,
            meta: any,
            arg: any,
        ) => {
            return response.Data as {
                AccessToken: string;
            };
        },
    });
