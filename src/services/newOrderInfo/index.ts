import queries from './query';

const actions: typeof queries = {
    ...queries,
};

const {
    useLazyNewOrderInfoGetByPageQuery,
    useLazyNewOrderInfoGetDetailQuery,
    useLazyNewOrderTicketGetListQuery,
} = actions;

export {
    useLazyNewOrderInfoGetByPageQuery,
    useLazyNewOrderInfoGetDetailQuery,
    useLazyNewOrderTicketGetListQuery,
};
export default actions;
