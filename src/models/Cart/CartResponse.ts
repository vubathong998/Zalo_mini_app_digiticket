import { CartItemResponseModel } from './CartModel';

export type CartResponse = {
    CartId: string | null;
    ListItem: Array<CartItemResponseModel>;
};

export type CartCreateOrderResponse = {
    OrderCode: string;
    PaymentUrl: string;
    Signature: string;
};
