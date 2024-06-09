import queries from './query';

const actions: typeof queries = {
    ...queries,
};
const {
    useGetMyBookingQuery,
    useLazyGetMyBookingQuery,
    useGetBookingDetailQuery,
    useLazyGetBookingDetailQuery,
    useGetBookingDetailItemsQuery,
    useLazyGetBookingDetailItemsQuery,
} = actions;

export {
    useGetBookingDetailItemsQuery,
    useGetBookingDetailQuery,
    useGetMyBookingQuery,
    useLazyGetBookingDetailItemsQuery,
    useLazyGetBookingDetailQuery,
    useLazyGetMyBookingQuery
};
export default actions;
