import { SubscriptionOptions } from '@reduxjs/toolkit/dist/query/core/apiState';
import { FetchBaseQueryError } from '@rtk-incubator/rtk-query/dist';

export type UseQueryResult<T> = {
    // Base query state
    originalArgs?: unknown; // Arguments passed to the query
    data?: T; // The latest returned result regardless of hook arg, if present
    currentData?: T; // The latest returned result for the current hook arg, if present
    error?: unknown; // Error result if present
    requestId?: string; // A string generated by RTK Query
    endpointName?: string; // The name of the given endpoint for the query
    startedTimeStamp?: number; // Timestamp for when the query was initiated
    fulfilledTimeStamp?: number; // Timestamp for when the query was completed

    // Derived request status booleans
    isUninitialized: boolean; // Query has not started yet.
    isLoading: boolean; // Query is currently loading for the first time. No data yet.
    isFetching: boolean; // Query is currently fetching, but might have data from an earlier request.
    isSuccess: boolean; // Query has data from a successful load.
    isError: boolean; // Query is currently in an "error" state.

    refetch: () => void; // A function to force refetch the query
};

export type UseQueryOptions = {
    pollingInterval?: number;
    refetchOnReconnect?: boolean;
    refetchOnFocus?: boolean;
    skip?: boolean;
    refetchOnMountOrArgChange?: boolean | number;
    selectFromResult?: (result: UseQueryResult<any>) => any;
};

export type UseLazyQueryOptions = {
    pollingInterval?: number;
    refetchOnReconnect?: boolean;
    refetchOnFocus?: boolean;
    selectFromResult?: (result: UseQueryStateResult<any>) => any;
};

export type UseLazyQueryTrigger<T> = (
    arg: any,
    preferCacheValue?: boolean,
) => Promise<UseQueryStateResult<any>> & {
    arg: unknown; // Whatever argument was provided to the query
    requestId: string; // A string generated by RTK Query
    subscriptionOptions: SubscriptionOptions; // The values used for the query subscription
    abort: () => void; // A method to cancel the query promise
    unwrap: () => Promise<T>; // A method to unwrap the query call and provide the raw response/error
    unsubscribe: () => void; // A method used to manually unsubscribe from the query results
    refetch: () => void; // A method used to re-run the query. In most cases when using a lazy query, you will never use this and should prefer to call the trigger again.
    updateSubscriptionOptions: (options: SubscriptionOptions) => () => void; // A method used to update the subscription options (eg. pollingInterval)
};

export type UseQueryStateResult<T> = {
    // Base query state
    originalArgs?: unknown; // Arguments passed to the query
    data?: T; // The latest returned result regardless of trigger arg, if present
    currentData?: T; // The latest returned result for the trigger arg, if present
    error?: unknown; // Error result if present
    requestId?: string; // A string generated by RTK Query
    endpointName?: string; // The name of the given endpoint for the query
    startedTimeStamp?: number; // Timestamp for when the query was initiated
    fulfilledTimeStamp?: number; // Timestamp for when the query was completed

    isUninitialized: false; // Query has not started yet.
    isLoading: false; // Query is currently loading for the first time. No data yet.
    isFetching: false; // Query is currently fetching, but might have data from an earlier request.
    isSuccess: false; // Query has data from a successful load.
    isError: false; // Query is currently in an "error" state.
};

export type UseLazyQueryLastPromiseInfo = {
    lastArg: any;
};

/**
 * Default tags used by the cacher helpers
 */
const defaultTags = ['UNAUTHORIZED', 'UNKNOWN_ERROR'] as const;
type DefaultTags = typeof defaultTags[number];

function concatErrorCache<T, ID>(
    existingCache: CacheList<T, ID>,
    error: FetchBaseQueryError | undefined,
): CacheList<T, ID> {
    if (error && 'status' in error && error.status === 401) {
        // unauthorized error
        return [...existingCache, 'UNAUTHORIZED'];
    }

    // unknown error
    return [...existingCache, 'UNKNOWN_ERROR'];
}

/**
 * An individual cache item
 */
export type CacheItem<T, ID> = { type: T; id: ID };

/**
 * A list of cache items, including a LIST entity cache
 */
export type CacheList<T, ID> = (CacheItem<T, 'LIST'> | CacheItem<T, ID> | DefaultTags)[];

/**
 * Inner function returned by `providesList` to be passed to the `provides` property of a query
 */
type InnerProvidesList<T> = <Results extends { id: unknown }[], Error extends FetchBaseQueryError>(
    results: Results | undefined,
    error: Error | undefined,
) => CacheList<T, Results[number]['id']>;

/**
 * HOF to create an entity cache to provide a LIST,
 * depending on the results being in a common format.
 *
 * Will not provide individual items without a result.
 *
 * @example
 * ```ts
 * const results = [
 *   { id: 1, message: 'foo' },
 *   { id: 2, message: 'bar' }
 * ]
 * providesList('Todo')(results)
 * // [
 * //   { type: 'Todo', id: 'List'},
 * //   { type: 'Todo', id: 1 },
 * //   { type: 'Todo', id: 2 },
 * // ]
 * ```
 */
export const providesList =
    <T extends string>(type: T): InnerProvidesList<T> =>
    (results, error) => {
        // is result available?
        if (results) {
            // successful query
            return [{ type, id: 'LIST' }, ...results.map(({ id }) => ({ type, id } as const))];
        }
        // Received an error, include an error cache item to the cache list
        return concatErrorCache([{ type, id: 'LIST' }], error);
    };

/**
 * HOF to create an entity cache to invalidate a LIST.
 *
 * Invalidates regardless of result.
 *
 * @example
 * ```ts
 * invalidatesList('Todo')()
 * // [{ type: 'Todo', id: 'List' }]
 * ```
 */
export const invalidatesList =
    <T extends string>(type: T) =>
    (): readonly [CacheItem<T, 'LIST'>] =>
        [{ type, id: 'LIST' }] as const;

/**
 * HOF to create an entity cache for a single item using the query argument as the ID.
 *
 * @example
 * ```ts
 * cacheByIdArg('Todo')({ id: 5, message: 'walk the fish' }, undefined, 5)
 * // returns:
 * // [{ type: 'Todo', id: 5 }]
 * ```
 */
export const cacheByIdArg =
    <T extends string>(type: T) =>
    <ID, Result = undefined, Error = undefined>(
        result: Result,
        error: Error,
        id: ID,
    ): readonly [CacheItem<T, ID>] =>
        [{ type, id }] as const;

/**
 * HOF to create an entity cache for a single item using the id property from the query argument as the ID.
 *
 * @example
 * ```ts
 * cacheByIdArgProperty('Todo')(undefined, { id: 5, message: 'sweep up' })
 * // returns:
 * // [{ type: 'Todo', id: 5 }]
 * ```
 */
export const cacheByIdArgProperty =
    <T extends string>(type: T) =>
    <Arg extends { id: unknown }, Result = undefined, Error = undefined>(
        result: Result,
        error: Error,
        arg: Arg,
    ): readonly [CacheItem<T, Arg['id']>] | [] =>
        [{ type, id: arg.id }] as const;

/**
 * HOF to invalidate the 'UNAUTHORIZED' type cache item.
 */
export const invalidatesUnauthorized =
    () =>
    <Arg = undefined, Result = undefined, Error = undefined>(
        result: Result,
        error: Error,
        arg: Arg,
    ): ['UNAUTHORIZED'] =>
        ['UNAUTHORIZED'];

/**
 * HOF to invalidate the 'UNKNOWN_ERROR' type cache item.
 */
export const invalidatesUnknownErrors =
    () =>
    <Arg = undefined, Result = undefined, Error = undefined>(
        result: Result,
        error: Error,
        arg: Arg,
    ): ['UNKNOWN_ERROR'] =>
        ['UNKNOWN_ERROR'];

/**
 * Utility helpers for common provides/invalidates scenarios
 */
export const cacher = {
    defaultTags,
    providesList,
    invalidatesList,
    cacheByIdArg,
    cacheByIdArgProperty,
    invalidatesUnauthorized,
    invalidatesUnknownErrors,
};