import { AxiosRequestConfig } from "axios";
import {
  Control,
  DeepMap,
  FieldValues,
  Message,
  MultipleFieldErrors,
  Ref
} from "react-hook-form";

export interface BaseResponse<T = any> {
  code: number;
  status: string;
  data: T;
  message: string;
  meta?: PaginationInterface;
}

export interface TransformerInclude<T> {
  data: T;
}

export interface TypeSelect {
  id: number;
  value: string;
}

export interface ErrorValidate<E = any, T = Array<any>> {
  errors: PartialType<E, T>;
  error: string;
  exception: string;
}

export interface AxiosErrorCustom<T = any> extends Error {
  config: AxiosRequestConfig;
  code?: string;
  request?: any;
  response?: AxiosRes<T>;
  isAxiosError?: boolean;
}

/**
 * Pagination from response
 */
export interface PaginationInterface {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  lastPage: number;
  length: number;
  nextPage: number;
  previousPage: number;
}

export interface AxiosRes<T> extends BaseAxiosResponse<BaseResponse<T>> {}

export interface AxiosValidateError<T, E = any>
  extends AxiosRes<ErrorValidate<T, E>> {}

export interface ErrorResponseRTK {
  error: any;
  meta: any;
  payload: any;
  type: string;
}

export interface BaseAxiosResponseGetDetail<T = any> {
  Data: T;
  Code: number;
  Message: string;
}
export interface BaseAxiosResponseGetAll<T = any> {
  Data: T;
  Code: number;
  Message: string;
}
export interface BaseAxiosResponseAuth<T = any> {
  Data: T;
  Code: number;
  Message: string;
}
export interface BaseAxiosResponse<T = any> {
  Data: PaginationDataResponse<T>;
  Code: number;
  Message: string;
}
export interface BaseAxiosResponseWithoutPaging<T = any> {
  data: T;
}
// export interface BaseAxiosResponse<T = any> {
//     data: T;
//     status: number;
//     statusText: string;
//     headers: any;
//     config: AxiosRequestConfig;
//     request?: any;
//     pageInfo: PaginationInterface;
// }

export interface ListGeneralFilter {
  perPage?: number | 10;
  page?: number | 1;
  selectField?: string | null;
  keyword?: string | null;
  status?: string | null;
}

// export interface TypeSelectOption extends OptionTypeBase {
//   renderOption?: ReactNode;
// }

export interface DefaultStrictSelectOption {
  label: any;
  value: any;
}
export interface BaseResponse<T = any> {
  code: number;
  status: string;
  data: T;
  message: string;
  meta?: PaginationInterface;
}

export interface TransformerInclude<T> {
  data: T;
}

export type IsArray<E, T> = E extends any[] ? T[] : T;

export interface TypeSelect {
  id: number;
  value: string;
}

export interface ErrorValidate<E = any, T = Array<any>> {
  errors: PartialType<E, T>;
  error: string;
  exception: string;
}

export interface AxiosErrorCustom<T = any> extends Error {
  config: AxiosRequestConfig;
  code?: string;
  request?: any;
  response?: AxiosRes<T>;
  isAxiosError?: boolean;
}

/**
 * Pagination from response
 */
export interface PaginationInterface {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  lastPage: number;
  length: number;
  perPage: number;
  nextPage: number;
  previousPage: number;
}

export interface AxiosRes<T> extends BaseAxiosResponse<BaseResponse<T>> {}

export interface AxiosValidateError<T, E = any>
  extends AxiosRes<ErrorValidate<T, E>> {}

type PartialType<E, T = any> = {
  [P in keyof E]: T;
};

export type AddExtraType<Interface, Type> = {
  [I in keyof Interface]: Interface[I] | Type;
};

export type ErrorResponse = {
  // arg: BlogDetailRequest;
  requestId: string;
  rejectedWithValue: boolean;
  requestStatus: "rejected";
  aborted: boolean;
  condition: boolean;
};

export type MetaTags = {
  title: string;
  description: string;
  image: string;
  url: string;
  canonical?: string;
};

export type FieldArray<
  TFieldArrayValues extends FieldValues = FieldValues,
  TKeyName extends string = "id"
> = TFieldArrayValues & Record<TKeyName, string>;

export type UseFieldArrayOptions<
  TKeyName extends string = "id",
  TControl extends Control = Control
> = {
  name: string;
  keyName?: TKeyName;
  control?: TControl;
};

export type UseFieldArrayMethods<
  TFieldArrayValues extends FieldValues = FieldValues,
  TKeyName extends string = "id"
> = {
  swap: (indexA: number, indexB: number) => void;
  move: (indexA: number, indexB: number) => void;
  prepend: (
    value: Partial<TFieldArrayValues> | Partial<TFieldArrayValues>[],
    shouldFocus?: boolean
  ) => void;
  append: (
    value: Partial<TFieldArrayValues> | Partial<TFieldArrayValues>[],
    shouldFocus?: boolean
  ) => void;
  remove: (index?: number | number[]) => void;
  insert: (
    index: number,
    value: Partial<TFieldArrayValues> | Partial<TFieldArrayValues>[],
    shouldFocus?: boolean
  ) => void;
  fields: Partial<FieldArray<TFieldArrayValues, TKeyName>>[];
};
export interface ErrorResponseRTK {
  error: any;
  meta: any;
  payload: any;
  type: string;
}

export type FieldErrors<TFieldValues extends FieldValues = FieldValues> =
  DeepMap<TFieldValues, FieldError>;

export type FieldError = {
  type: string;
  ref?: Ref;
  types?: MultipleFieldErrors;
  message?: Message;
};

export interface PaginationDataResponse<T = any> {
  PageIndex: number;
  PageSize: number;
  Result: T;
  Total: number;
}

// export interface TypeSelectOption extends OptionTypeBase {
//   renderOption?: ReactNode;
// }

export interface DefaultStrictSelectOption {
  label: any;
  value: any;
}

export type ClassNameMap<T extends string = string> = Record<T, string>;

export interface StyledComponentProps<ClassKey extends string = string> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ClassNameMap<ClassKey>>;
}

export interface CustomClasses<T extends string = string> {
  customClasses?: Partial<ClassNameMap<T>>;
}
