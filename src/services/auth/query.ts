import { api } from '../api';
import { changePassword } from './queries/changePassword';
import { getListAgent } from './queries/getListAgent';
import { getProfile } from './queries/getProfile';
import { login } from './queries/login';
import { selectSalePointOrAgent } from './queries/selectSalePointOrAgent';
import { zaloOAuthByToken } from './queries/zaloOAuthByToken';

const queries = api.injectEndpoints({
    endpoints: (builder) => ({
        login: login(builder),
        selectSalePointOrAgent: selectSalePointOrAgent(builder),
        getListAgent: getListAgent(builder),
        getProfile: getProfile(builder),
        changePassword: changePassword(builder),
        zaloOAuthByToken: zaloOAuthByToken(builder),
    }),
});

export default queries;
