import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { GetListProductRequest } from 'models/Product/ProductRequest';
import { ProductListResponse } from 'models/Product/ProductResponse';
import { BaseAxiosResponse, PaginationDataResponse } from 'models/globalInterface';

export const getListProduct = (
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
    builder.query<PaginationDataResponse<ProductListResponse>, GetListProductRequest>({
        query: (arg: GetListProductRequest) => ({
            url: 'api/groupservice/sale/get-by-page',
            method: 'POST',
            body: {
                ...arg,
            },
        }),
        transformResponse: async (
            response: BaseAxiosResponse<ProductListResponse>,
            meta: any,
            arg: any,
        ) => {
            return response.Data as PaginationDataResponse<ProductListResponse>;
        },
    });
