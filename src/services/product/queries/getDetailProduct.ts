import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { GetProductDetailRequest } from 'models/Product/ProductRequest';
import { ProductDetailResponse } from 'models/Product/ProductResponse';
import { BaseAxiosResponseGetDetail } from 'models/globalInterface';

export const getProductDetail = (
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
    builder.query<ProductDetailResponse, GetProductDetailRequest>({
        query: (arg) => ({
            url: `api/groupservice/${arg.GroupServiceId}/get-detail-sale`,
            method: 'GET',
            params: {
                UsingDate: arg.UsingDate,
            },
        }),
        transformResponse: async (response: BaseAxiosResponseGetDetail<ProductDetailResponse>) => {
            return response.Data as ProductDetailResponse;
        },
    });
