import { api } from '../api';
import { getCollaboratorDetail } from './queries/getCollaboratorDetail';

const queries = api.injectEndpoints({
    endpoints: (builder) => ({
        // API Query Function
        getCollaboratorDetail: getCollaboratorDetail(builder),
    }),
});

export default queries;
