import queries from './query';

const actions: typeof queries = {
    ...queries,
};
const {
    useLoginMutation,
    useGetListAgentQuery,
    useLazyGetListAgentQuery,
    useSelectSalePointOrAgentQuery,
    useLazySelectSalePointOrAgentQuery,
    useGetProfileQuery,
    useLazyGetProfileQuery,
    //
    useChangePasswordMutation,
    //
    useZaloOAuthByTokenMutation,
} = actions;

export {
  useChangePasswordMutation,
  useGetListAgentQuery,
  useGetProfileQuery,
  useLazyGetListAgentQuery,
  useLazyGetProfileQuery,
  useLazySelectSalePointOrAgentQuery,
  useLoginMutation,
  useSelectSalePointOrAgentQuery,
  useZaloOAuthByTokenMutation
};
export default actions;
