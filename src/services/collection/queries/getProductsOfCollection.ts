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
import { BaseAxiosResponse } from '../../../models/globalInterface';

export const getProductsOfCollection = (
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
    builder.query<ProductListResponse, GetListProductRequest>({
        query: (arg: GetListProductRequest) => ({
            url: '/api/groupservice/sale/get-by-page',
            method: 'POST',
            body: {
                ...arg,
                PageSize: 200,
                FieldName: 'Priority',
                CollectionId: arg.CollectionId,
                Orderby: 'desc',
            },
        }),
        transformResponse: async (
            response: BaseAxiosResponse<ProductListResponse>,
            meta: any,
            arg: any,
        ) => {
            return response.Data.Result as ProductListResponse;
        },
        async onQueryStarted(
            arg,
            { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry },
        ) {},
    });
