import queries from './query';

const actions: typeof queries = {
    ...queries,
};
const {
    useNewAddItemToCartMutation,
    useLazyNewGetCartDetailQuery,
    useNewUpdateCartItemQuantityMutation,
    useNewRemoveItemFromCartMutation,
    useNewCreateOrderFromCartMutation,
} = actions;

export {
    useNewAddItemToCartMutation,
    useLazyNewGetCartDetailQuery,
    useNewUpdateCartItemQuantityMutation,
    useNewRemoveItemFromCartMutation,
    useNewCreateOrderFromCartMutation,
};
export default actions;
