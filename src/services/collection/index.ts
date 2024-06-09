import queries from './query';

const actions: typeof queries = {
  ...queries,
};
const {
  useGetListCollectionQuery,
  useLazyGetListCollectionQuery,
  useGetProductsOfCollectionQuery,
  useLazyGetProductsOfCollectionQuery,
  useGetDetailCollectionQuery,
  useLazyGetDetailCollectionQuery,
} = actions;

export {
  useGetDetailCollectionQuery, useGetListCollectionQuery,
  useGetProductsOfCollectionQuery, useLazyGetDetailCollectionQuery, useLazyGetListCollectionQuery,
  useLazyGetProductsOfCollectionQuery
};
export default actions;
