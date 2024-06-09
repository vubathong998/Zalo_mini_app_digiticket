import queries from './query';
// export const { reducer } = slice;

const actions: typeof queries = {
    ...queries,
};
const { useGetTicketsQuery, useLazyGetTicketsQuery } = actions;

// export type TypesActions = typeof slice.actions;
// export type TypesState = ReturnType<typeof reducer>;

export { useGetTicketsQuery, useLazyGetTicketsQuery };
export default actions;
