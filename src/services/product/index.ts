import queries from './query';

const actions: typeof queries = {
    ...queries,
};
const {
    useGetListProductQuery,
    useLazyGetListProductQuery,
    useGetProductDetailQuery,
    useLazyGetProductDetailQuery,
    //
    useGetAvailableUsingDateQuery,
    useLazyGetAvailableUsingDateQuery,
} = actions;

export {
    useGetAvailableUsingDateQuery,
    useGetListProductQuery,
    useGetProductDetailQuery,
    useLazyGetAvailableUsingDateQuery,
    useLazyGetListProductQuery,
    useLazyGetProductDetailQuery
};
export default actions;
