import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';
import { NewOrderInfoGetByPageRequest } from 'models/NewOrderInfo/NewOrderInfoRequest';
import { NewOrderInfoGetByPageResponse } from 'models/NewOrderInfo/NewOrderInfoResponse';
import { BaseAxiosResponse, PaginationDataResponse } from 'models/globalInterface';

export const newOrderInfoGetByPage = (
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
        PaginationDataResponse<NewOrderInfoGetByPageResponse>,
        NewOrderInfoGetByPageRequest
    >({
        query: (arg: NewOrderInfoGetByPageRequest) => ({
            url: 'api-end-user/orders/get-by-page-by-customer',
            method: 'POST',
            body: { ...arg },
        }),
        transformResponse: async (
            response: BaseAxiosResponse<NewOrderInfoGetByPageResponse>,
            meta: any,
            arg: NewOrderInfoGetByPageRequest,
        ) => {
            return response.Data as PaginationDataResponse<NewOrderInfoGetByPageResponse>;
        },
    });
