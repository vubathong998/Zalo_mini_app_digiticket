import { AgentDetailModel } from 'models/Agent/AgentResponse';
import { ProfileResponse } from 'models/Profile/ProfileModel';

// providers props
export interface AuthProviderProps {
    children: React.ReactNode;
}

// enums
export enum AuthDispatchEnum {
    login = 'login',
    updateAffiliateCode = 'updateAffiliateCode',
    loginViaQR = 'loginViaQR',
    updateSelectedShop = 'updateSelectedShop',
    updateUserInfo = 'updateUserInfo',
    logout = 'logout',
}

// dispatch action
export interface Action {
    type: AuthDispatchEnum;
    payload: any;
}

export interface AuthContextType {
    isLoggedIn: boolean;
    isLoggingIn: boolean;
    login: (successCallback: VoidFunction, aid?: string, cid?: string) => void;
    logout: (successCallback: VoidFunction) => void;
    updateAffiliateCode: (affiliateCode: string | null) => void;
    updateSelectedShop: (selectedShop: AgentDetailModel | null) => void;
    updateUserInfo: (userInfo: ProfileResponse | null) => void;
    loginViaQR: (content: string, successCallback: VoidFunction) => void;
    selectedShop: AgentDetailModel | null;
    userInfo: ProfileResponse | null;
    affiliateCode: string | null;
    dispatch: React.Dispatch<Action>;
}
