import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta
} from "@reduxjs/toolkit/dist/query";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { RetryOptions } from "@reduxjs/toolkit/dist/query/retry";
import { ChangePasswordRequest } from "../../../models/Auth/AuthRequest";
import { ChangePasswordResponse } from "../../../models/Auth/AuthResponse";
import { BaseAxiosResponseAuth } from "../../../models/globalInterface";

export const changePassword = (
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
  >
) =>
  builder.mutation<
    BaseAxiosResponseAuth<ChangePasswordResponse>,
    ChangePasswordRequest
  >({
    query: (arg: ChangePasswordRequest) => ({
      url: "https://openvnid.com/api/account/change-password",
      method: "PUT",
      body: { ...arg },
    }),
    transformResponse: async (
      response: BaseAxiosResponseAuth<ChangePasswordResponse>,
      meta: any,
      arg: any
    ) => {
      return response as BaseAxiosResponseAuth<ChangePasswordResponse>;
    },
    async onQueryStarted(
      arg,
      { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry }
    ) {},
  });
