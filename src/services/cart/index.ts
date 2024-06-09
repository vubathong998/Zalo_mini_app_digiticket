import queries from './query';

const actions: typeof queries = {
    ...queries,
};
const {
    useAddItemToCartMutation,
    useReduceItemFromCartMutation,
    useCreateBookingMutation,
    useRemoveItemFromCartMutation,
    useUpdateItemQuantityMutation,
    useGetCartDetailQuery,
    useLazyGetCartDetailQuery,
} = actions;

export {
    useAddItemToCartMutation,
    useCreateBookingMutation,
    useGetCartDetailQuery,
    useLazyGetCartDetailQuery,
    useReduceItemFromCartMutation,
    useRemoveItemFromCartMutation,
    useUpdateItemQuantityMutation
};

