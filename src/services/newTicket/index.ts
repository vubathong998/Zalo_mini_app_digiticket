import queries from './query';

const actions: typeof queries = {
    ...queries,
};
const { useLazyNewGetTicketQuery } = actions;

export { useLazyNewGetTicketQuery };
export default actions;
