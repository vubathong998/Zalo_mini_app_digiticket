import { api } from '../api';
import { newOrderInfoGetByPage } from './queries/newOrderInfoGetByPage';
import { newOrderInfoGetDetail } from './queries/newOrderInfoGetDetail';
import { newOrderTicketGetList } from './queries/newOrderTicketGetList';

const queries = api.injectEndpoints({
    endpoints: (builder) => ({
        newOrderInfoGetByPage: newOrderInfoGetByPage(builder),
        newOrderInfoGetDetail: newOrderInfoGetDetail(builder),
        newOrderTicketGetList: newOrderTicketGetList(builder)
    }),
});

export default queries;
