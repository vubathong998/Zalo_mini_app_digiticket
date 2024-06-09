import { api } from '../api';
import { getAvailableUsingDate } from './queries/getAvailableUsingDate';
import { getProductDetail } from './queries/getDetailProduct';
import { getListProduct } from './queries/getListProduct';

const queries = api.injectEndpoints({
    endpoints: (builder) => ({
        // API Query Function
        getListProduct: getListProduct(builder),
        getProductDetail: getProductDetail(builder),
        getAvailableUsingDate: getAvailableUsingDate(builder),
    }),
});

export default queries;
