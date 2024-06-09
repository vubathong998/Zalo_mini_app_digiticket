import { api } from '../api';
import { getTickets } from './queries/getTickets';

const queries = api.injectEndpoints({
    endpoints: (builder) => ({
        getTickets: getTickets(builder),
    }),
});

export default queries;
