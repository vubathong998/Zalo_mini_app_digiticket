import queries from './query';

const actions: typeof queries = {
    ...queries,
};
const { useGetCollaboratorDetailQuery, useLazyGetCollaboratorDetailQuery } = actions;

export { useGetCollaboratorDetailQuery, useLazyGetCollaboratorDetailQuery };
export default actions;
