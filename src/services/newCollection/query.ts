import { api } from 'services/api';
import { newCollectionGetByPage } from './queries/newCollectionGetByPage';
import { newCollectionGetDetail } from './queries/newCollectionGetDetail';

const queries = api.injectEndpoints({
    endpoints: (builder) => ({
        // API Query Function
        newCollectionGetByPage: newCollectionGetByPage(builder),
        newCollectionGetDetail: newCollectionGetDetail(builder),
    }),
});

export default queries;
