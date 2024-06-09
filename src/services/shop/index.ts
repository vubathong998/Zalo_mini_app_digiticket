import queries from './query';
import slice from './slice';
export const { reducer } = slice;

const actions: typeof slice.actions & typeof queries = {
    ...slice.actions,
    ...queries,
};
const {
    useGetShopConfigQuery,
    useLazyGetShopConfigQuery,
    useGetShopDetailQuery,
    useLazyGetShopDetailQuery,
    updateSelectedShop,
    updateShopConfigs,
} = actions;

export type TypesActions = typeof slice.actions;
export type TypesState = ReturnType<typeof reducer>;

export {
  updateSelectedShop,
  updateShopConfigs,
  useGetShopConfigQuery,
  useGetShopDetailQuery,
  useLazyGetShopConfigQuery,
  useLazyGetShopDetailQuery
};
export default actions;
