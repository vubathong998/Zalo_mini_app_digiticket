import { api } from '../api';
import { getCategories } from './queries/getCategories';

const queries = api.injectEndpoints({
    endpoints: (builder) => ({
        // API Query Function
        getCategories: getCategories(builder),
    }),
});

export default queries;
