import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';
import { NewCartAddItemRequest } from 'models/NewCart/NewCartRequest';
import { NewCartAddItemResponse } from 'models/NewCart/NewCartResponse';
import { BaseAxiosResponseGetDetail } from 'models/globalInterface';

export const newAddItemToCart = (
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
    builder.mutation<NewCartAddItemResponse, NewCartAddItemRequest>({
        query: (arg: NewCartAddItemRequest) => ({
            url: `api-end-user/cart/item`,
            method: 'POST',
            body: {
                ...arg,
            },
        }),
        transformResponse: async (
            response: BaseAxiosResponseGetDetail<NewCartAddItemResponse>,
            meta: any,
            arg: NewCartAddItemRequest,
        ) => {
            // if (!getCookie(`Cart_${arg.AId}`))
            //     setCookie({
            //         name: `Cart_${arg.AId}`,
            //         value: response.Data.CartId as string,
            //     });
            return response.Data as NewCartAddItemResponse;
        },
        async onQueryStarted(
            arg,
            { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry },
        ) {},
    });
