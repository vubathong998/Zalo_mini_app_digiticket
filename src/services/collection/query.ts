import { api } from '../api';
import { getDetailCollection } from './queries/getDetailCollection';
import { getListCollection } from './queries/getListCollection';
import { getProductsOfCollection } from './queries/getProductsOfCollection';

const queries = api.injectEndpoints({
    endpoints: (builder) => ({
        getListCollection: getListCollection(builder),
        getProductsOfCollection: getProductsOfCollection(builder),
        getDetailCollection: getDetailCollection(builder),

    }),
});

export default queries;
