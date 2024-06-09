import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { GetListAvailableUsingDateRequest } from 'models/Product/ProductRequest';
import { BaseAxiosResponseGetDetail } from 'models/globalInterface';

export const getAvailableUsingDate = (
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
        { BeginDate: string; AvailableDates: Array<string> },
        GetListAvailableUsingDateRequest
    >({
        query: (arg) => ({
            url: `api/groupservice/${arg.GroupServiceId}/get-list-usingdate`,
            method: 'GET',
            params: { ...arg },
        }),
        transformResponse: async (
            response: BaseAxiosResponseGetDetail<{
                BeginDate: string;
                AvailableDates: Array<string>;
            }>,
        ) => {
            return response.Data as { BeginDate: string; AvailableDates: Array<string> };
        },
        transformErrorResponse: async () => {
            return;
        },
    });
