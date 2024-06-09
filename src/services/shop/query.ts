import { api } from '../api';
import { getShopConfig } from './queries/getShopConfig';
import { getShopDetail } from './queries/getShopDetail';

const queries = api.injectEndpoints({
    endpoints: (builder) => ({
        getShopConfig: getShopConfig(builder),
        getShopDetail: getShopDetail(builder),
    }),
});

export default queries;
