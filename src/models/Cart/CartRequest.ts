import { OptionItem } from 'constants/categories';
import { CartItemRequestModel } from './CartModel';

export type GetDetailCartRequest = {
    id: string;
};

export type CreateCartRequest = {
    CartId: string;
    ListItem: Array<CartItemRequestModel>;
};

export type UpdateCartRequest = CreateCartRequest;

export type CartItemRequest = {
    CartId: string;
    Item: CartItemRequestModel;
};

// {
//   "CartId": "0b4da2c8e091f530c5b51591a6fa0dbc",
//   "ListItem": [
//     {
//       "ProductId": "74dbe8be-8552-421f-a1ef-3ee02445f1d1",
//       "ServicePricesId": "15d41943-94cf-4de5-9108-874f84e02539",
//       "GroupServiceId": "07367892-d5de-4378-84f8-e66c9d759972",
//       "Count": 1,
//       "UsingDate": ["2022-11-18T23:40:41.000Z"]
//     }
//   ]
// }

export type CartCreateBookingRequest = {
    CartId: string;
    Contact: {
        Address?: string;
        Title?: string;
        FirstName?: string;
        Name: string;
        Phone: string;
        Email: string;
    };
    Note?: string;
    PaymentId?: number;
    BankId?: number;
    CId?: string;
};
export type CartCreateBookingFormData = {
    Address: string;
    Title: string;
    FirstName: string;
    Name: string;
    Phone: string;
    Email: string;
    Payment: OptionItem;
    PaymentPartner: OptionItem;
    // Bank?: OptionItem;
};

export type CartAddItemRequest = {
    CartId: string | null;
    GroupServiceId: string;
    Count: number;
    AId?: string;
    CId?: string | null;
    UsingDate?: Array<string>;
    CartItemId?: string;
};
export type CartUpdateItemRequest = {
    Id?: string;
    CartId: string;
    GroupServiceId: string;
    Count: number;
    CartItemId: string;
};

export type CartReduceItemRequest = {
    Id?: string;
    CartId: string | null;
    GroupServiceId: string;
    Count: number;
    CartItemId: string;
};

export type CartRemoveItemRequest = {
    Id?: string;
    CartId: string;
    GroupServiceId: string;
    CartItemId: string;
};
