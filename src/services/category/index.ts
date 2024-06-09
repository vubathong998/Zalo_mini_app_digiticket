import queries from './query';

const actions: typeof queries = {
    ...queries,
};
const {
    useGetCategoriesQuery,
    useLazyGetCategoriesQuery,
    util: { getRunningOperationPromises },
} = actions;

export { useGetCategoriesQuery, useLazyGetCategoriesQuery };
export default actions;
