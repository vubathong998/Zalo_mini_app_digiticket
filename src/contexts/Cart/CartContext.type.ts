import { CartItemResponseModel } from 'models/Cart/CartModel';
import { CartCreateBookingRequest } from 'models/Cart/CartRequest';
import { CartResponse } from 'models/Cart/CartResponse';
import { NewCreateOrderFromCartRequest, NewItemRemoveFromCartRequest } from 'models/NewCart/NewCartRequest';
import { NewCartGetDetailResponse } from 'models/NewCart/NewCartResponse';

// providers props
export interface CartProviderProps {
    children: React.ReactNode;
}

// enums
export enum CartDispatchEnum {
    updateCart = 'updateCart',
    createBooking = 'createBooking',
}

// dispatch action
export interface Action {
    type: CartDispatchEnum;
    payload: any;
}

export interface CartContextType {
    isLoadingCart: boolean;
    isLoadingCreateBookingFromCart: boolean;
    isLoadingAddItemToCart: boolean;
    isLoadingReduceItemFromCart: boolean;
    isLoadingUpdateItemQuantityFromCart: boolean;
    isLoadingRemoveItemFromCart: boolean;
    cart: NewCartGetDetailResponse;
    updateCart: (cart: CartResponse) => void;
    addItem: (data: {
        groupServiceId: string;
        quantity: number;
        usingDate: Array<string>;
        CId?: string;
    }) => void;
    updateItemQuantity: (data: {
        groupServiceId: string;
        cartItemId: string;
        quantity: number;
    }) => void;
    reduceItem: (item: CartItemResponseModel) => void;
    removeItem: (data: { groupServiceId: string; cartItemId: string }) => void;
    createBooking: (request: NewCreateOrderFromCartRequest) => void;
}
