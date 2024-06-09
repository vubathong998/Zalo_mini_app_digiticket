import queries from './query';

const actions: typeof queries = {
    ...queries,
};
const {
    // useNewListingGetByPageQuery,
    useLazyNewListingGetByPageQuery,
    useLazyNewListingGetListUsingDateByIdQuery,
    useLazyNewListingGetDetailQuery,
    useLazyNewListingPropertyGetPriceByVariationsQuery,
} = actions;

export {
    // useNewListingGetByPageQuery,
    useLazyNewListingGetByPageQuery,
    useLazyNewListingGetListUsingDateByIdQuery,
    useLazyNewListingGetDetailQuery,
    useLazyNewListingPropertyGetPriceByVariationsQuery,
};
export default actions;
