import { NewCartModel } from './NewCartModel';

export type NewCartAddItemResponse = NewCartModel;

export type NewCartGetDetailResponse = NewCartModel;

export type NewCartUpdateItemResponse = NewCartModel;

export type NewItemRemoveFromCartResponse = NewCartModel;

export type NewCreateOrderFromCartResponse = {
    OrderId: string;
    OrderCode: string;
    TotalPrice: number;
    PaymentFee: number;
    ListOrderItem: NewListOrderItem[];
    Payment: any[];
    PaymentMethod: any[];
    PaymentUrl: string;
    Signature: string;
};

export type NewListOrderItem = {
    OrderTicketId: string;
    Id: string;
    ProductId: string;
    ProductCode?: any;
    ProductName?: any;
    ImageUrl?: any;
    ServicePricesId: string;
    ServicePricesName?: any;
    GroupServiceId: string;
    GroupServiceName?: any;
    GroupName?: any;
    SalePrice: number;
    DiscountValue: number;
    AppliedVouchers?: any;
    UsingDate: string[];
    Count: number;
    TotalPrice: number;
    Status: number;
    SupplierStatus: number;
    CustomerStatus: number;
    ProcessId: number;
};
