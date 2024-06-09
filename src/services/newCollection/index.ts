import queries from './query';

const actions: typeof queries = {
    ...queries,
};
const {
    // useNewListingGetByPageQuery,
    useLazyNewCollectionGetByPageQuery,
    useNewCollectionGetByPageQuery,
    useLazyNewCollectionGetDetailQuery
} = actions;

export {
    // useNewListingGetByPageQuery,
    useLazyNewCollectionGetByPageQuery,
    useNewCollectionGetByPageQuery,
    useLazyNewCollectionGetDetailQuery
};
export default actions;
