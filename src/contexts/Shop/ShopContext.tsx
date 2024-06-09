import React, { createContext, useReducer } from 'react';
// types
import { AgentDetailModel } from 'models/Agent/AgentResponse';
import { ConfigTagsModel } from 'models/ConfigTags/ConfigTagsModel';
import { useLazyGetShopConfigQuery, useLazyGetShopDetailQuery } from 'services/shop';
import { setDataStorageByKey } from 'utils/nativeStorage';
import { useSnackbar } from 'zmp-ui';
import appConfig from '../../../app-config.json';
import type { Action, ShopContextType, ShopProviderProps } from './ShopContext.type';
import { ShopDispatchEnum } from './ShopContext.type';

// initial state
const initialState: ShopContextType = {
    isSelectingShop: false,
    selectedShop: {
        detail: null,
        configs: [],
        affiliate: null,
    },
    updateSelectedShop: (shop, affiliate) => {},
};

// create context
const ShopContext = createContext<ShopContextType>(initialState);

// handlers
const handlers: Record<
    ShopDispatchEnum,
    (state: ShopContextType, action: Action) => ShopContextType
> = {
    updateSelectedShop: (state, action) => {
        const selectedShop = action.payload as {
            detail: AgentDetailModel;
            configs: Array<ConfigTagsModel>;
            affiliate: any;
        };
        setDataStorageByKey({
            key: appConfig.nativeKey.selectedShopId,
            data: selectedShop.detail.Id,
        });
        return { ...state, selectedShop: selectedShop };
    },
};

// reducer
const reducer = (state: ShopContextType, action: Action) =>
    handlers[action.type] ? handlers[action.type](state, action) : state;

// provider
const ShopProvider = (props: ShopProviderProps) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);
    const snackbar = useSnackbar();

    const [getShopDetail, getShopDetailState] = useLazyGetShopDetailQuery();
    const [getShopConfig, getShopConfigState] = useLazyGetShopConfigQuery();

    const updateSelectedShop = (shop: AgentDetailModel, affiliate: any) => {
        getShopDetail({
            Id: shop.Id,
        })
            .unwrap()
            .then((shop) => {
                getShopConfig({
                    Aid: shop.Id,
                })
                    .unwrap()
                    .then((configs) => {
                        dispatch({
                            type: ShopDispatchEnum.updateSelectedShop,
                            payload: {
                                shop: shop,
                                configs: configs,
                                affiliate: affiliate,
                            },
                        });

                        snackbar.openSnackbar({
                            type: 'success',
                            text: `Đã chọn cửa hàng ${shop.Name}`,
                            position: 'top',
                        });
                    });
            })
            .catch((e) => {});
    };

    return (
        <ShopContext.Provider
            value={{
                ...state,
                isSelectingShop: getShopDetailState.isLoading || getShopConfigState.isLoading,
                updateSelectedShop,
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};

// export
export { ShopProvider };

export default ShopContext;
