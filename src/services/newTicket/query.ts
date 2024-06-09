import { api } from '../api';
import { newGetTicket } from './queries/newGetTicket';

const queries = api.injectEndpoints({
    endpoints: (builder) => ({
        // API Query Function
        newGetTicket: newGetTicket(builder),
    }),
});

export default queries;
