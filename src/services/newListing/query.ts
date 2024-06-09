import { api } from '../api';
import { newListingGetByPage } from './queries/newGetListProduct';
import { newListingGetDetail } from './queries/newListingGetDetail';
import { newListingGetListUsingDateById } from './queries/newListingGetListUsingDateById';
import { newListingPropertyGetPriceByVariations } from './queries/newListingPropertyGetPriceByVariations';

const queries = api.injectEndpoints({
    endpoints: (builder) => ({
        // API Query Function
        newListingGetByPage: newListingGetByPage(builder),
        newListingGetListUsingDateById: newListingGetListUsingDateById(builder),
        newListingGetDetail: newListingGetDetail(builder),
        newListingPropertyGetPriceByVariations: newListingPropertyGetPriceByVariations(builder),
    }),
});

export default queries;
