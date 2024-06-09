import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { NewListingPropertyDetailPriceByVariationsRequest } from 'models/NewListing/NewListingRequest';
import { NewListingPropertySaleDetailResponse } from 'models/NewListing/NewListingResponse';
import { BaseAxiosResponseGetDetail } from 'models/globalInterface';

export const newListingPropertyGetPriceByVariations = (
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
        NewListingPropertySaleDetailResponse,
        NewListingPropertyDetailPriceByVariationsRequest
    >({
        query: (arg) => ({
            url: `api-end-user/listing/listing-properties/get-sale-by-variation`,
            method: 'POST',
            body: { ...arg },
        }),
        transformResponse: async (
            response: BaseAxiosResponseGetDetail<NewListingPropertySaleDetailResponse>,
            meta: any,
            arg,
        ) => {
            return response.Data as NewListingPropertySaleDetailResponse;
        },
        async onQueryStarted(
            arg,
            { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry },
        ) {},
    });
