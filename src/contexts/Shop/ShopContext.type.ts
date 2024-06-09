import { AgentDetailModel } from 'models/Agent/AgentResponse';
import { ConfigTagsModel } from 'models/ConfigTags/ConfigTagsModel';

// providers props
export interface ShopProviderProps {
    children: React.ReactNode;
}

// enums
export enum ShopDispatchEnum {
    updateSelectedShop = 'updateSelectedShop',
}

// dispatch action
export interface Action {
    type: ShopDispatchEnum;
    payload: any;
}

export interface ShopContextType {
    isSelectingShop: boolean;
    selectedShop: {
        detail: AgentDetailModel | null;
        configs: Array<ConfigTagsModel>;
        affiliate: any;
    };
    updateSelectedShop: (shop: AgentDetailModel, affiliate: any) => void;
}
