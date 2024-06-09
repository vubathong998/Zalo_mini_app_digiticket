import { InvoicePaymentMethod } from 'models/Invoice/InvoiceModel';
import {
    BookingPaymentStatusEnum,
    DeliveryStatusEnum,
    IssueStatusEnum,
    OrderStatusEnum,
} from './BookingEnum';

export type OrderItemDetail = {
    ProductName: string;
    Quantity: number;
    UnitName: string;
    Unit: number;
    //
    ExchangeRate: number;
    ProductChildName: string;
    UnitChild: number;
    UnitChildName: string;
};

export type BookingModelItemDetailQuickView = {
    ProductName: string;
    ProductDescription: string | null;
    Quantity: number;
    UnitName: 'thẻ';
};

export type BookingModel = {
    LanguageCode: 'en-US' | 'vi-VN';
    OrderDistributor: {
        DistributorId: string;
        DistributorName: string | null;
        PlaceOrEventId: string;
        PlaceOrEventName: string | null;
    };
    OrderContact: {
        Address: string;
        City: string | null;
        CompanyAddress: string | null;
        CompanyName: string | null;
        CreatedBy: number;
        CreatedByName: string;
        CreatedDate: string;
        Email: string;
        EmailInvoice: string | null;
        Id: string;
        LastEditedBy: number;
        LastEditedByName: string;
        LastEditedDate: string;
        Name: string;
        Note: string | null;
        OrderId: string;
        Phone: string;
        ProfileData: Record<string, any>;
        ReceivePlace: string | null;
        Status: 0 | 1;
        TaxNumCompanyNameber: string | null;
        TaxNumber: string | null;
    };
    OrderItemDetails: Array<BookingItemDetailModel>;
    OrderCode: string;
    CategoryId: string;
    UserIdProcess: number;
    BankId: number;
    BankName: string;
    TotalPrice: number;
    Discount: number;
    CashReceive: number;
    CashReturn: number;
    Surcharge: number;
    PaymentFee: number;
    Currency: number;
    PaymentPartner: number;
    PaymentPartnerName: string;
    PaymentId?: number;
    PaymentName: string;
    PaymentStatus: BookingPaymentStatusEnum;
    PaymentStatusName: string;
    IsVoucher: number;
    ShipType: number;
    DeliveryDate: string;
    DeliveryStatus: number;
    VoucherStatus: number;
    ClientIp: null;
    Active: true;
    Type: number;
    OrderDelivery: string | null;
    PaymentUrl: string;
    PaymentUrlPublic?: string;
    Signature?: string;
    Id: string;
    Status: OrderStatusEnum;
    CreatedDate: string;
    CreatedBy: number;
    CreatedByName: string;
    LastEditedDate: string;
    LastEditedBy: number;
    LastEditedByName: string;
    ProfileData: Record<string, any>;
    PaymentMethod: InvoicePaymentMethod;
};

export type BookingContactModel = {
    OrderId: string;
    Name: string;
    Address: string | null;
    Phone: string;
    Email: string;
    ReceivePlace: string | null;
    CompanyAddress: string | null;
    TaxNumber: string | null;
    CompanyName: string | null;
    TaxNumCompanyNameber: string | null;
    City: string | null;
    Note: string | null;
    EmailInvoice: string | null;
    Id: string;
    Status: number;
    CreatedDate: string;
    CreatedBy: number;
    CreatedByName: string;
    LastEditedDate: string;
    LastEditedBy: number;
    LastEditedByName: string;
    ProfileData: Record<string, any>;
};

export type BookingItemDetailModel = {
    OrderId: string;
    SupplierId: string;
    CategoryId: string;
    CategoryName: string;
    ProductId: string;
    QRCode: string;
    ProductCode: string;
    ProductName: string;
    Description: string;
    WorkgroupId: number;
    Place: string | null;
    Avatar: string | null;
    Images: [
        {
            Name: string;
            Url: string;
            Alt: string;
            Type: number;
        },
    ];
    ServicePricesId: string;
    ServicePricesName: string;
    GroupServiceId: string;
    GroupServiceCode: string;
    GroupServiceName: string;
    GroupServiceUnit: string;
    GroupServiceUnitChild: string;
    GroupServiceUnitChildId: number;
    GroupServiceUnitId: number;
    GroupName: string;
    OriginalPrice: number;
    SalePrice: number;
    Count: number;
    Quantity?: number;
    DiscountValue: number;
    TotalPrice: number;
    PaymentFee: number;
    UsingDate: null;
    VoucherStatus: IssueStatusEnum;
    Status: number;
    DeliveryStatus: DeliveryStatusEnum;
    SupplierStatus: 0 | 1;
    CustomerStatus: 0 | 1;
    Id: string;
    CreatedDate: string;
    CreatedByName: string;
    LastEditedDate: string;
    LastEditedByName: string;
    ProfileData: Record<string, any>;
};

export type BookingPaymentDetailModel = {
    OrderCode: string;
    CategoryId: string;
    DisWorkgroupId: number;
    LanguageCode: 'vi-VN' | 'en-US';
    UserIdProcess: number;
    BankId: number;
    BankName: null;
    TotalPrice: number;
    Discount: number;
    CashReceive: number;
    CashReturn: number;
    Surcharge: number;
    PaymentFee: number;
    Currency: number;
    PaymentPartner: number;
    PaymentPartnerName: string;
    PaymentId: number;
    PaymentName: string;
    PaymentStatus: number;
    PaymentStatusName: string;
    IsVoucher: number;
    ShipType: number;
    DeliveryDate: string;
    DeliveryStatus: number;
    VoucherStatus: number;
    ClientIp: null;
    Active: true;
    Type: number;
    OrderContact: BookingContactModel;
    OrderTickets: Array<BookingItemDetailModel>;
    OrderDelivery: null;
    Payment: Array<any>;
    OrderDistributor: {
        DistributorId: string;
        DistributorName: string | null;
        PlaceOrEventId: string;
        PlaceOrEventName: string | null;
    };
    OrderSupplier: {
        SupplierId: string;
        SupplierName: string | null;
        Address: string | null;
        Description: string | null;
        Title: string | null;
        ContactName: string | null;
        Phone: string | null;
        Hotline: string | null;
        Email: string | null;
        BookingEmail: string | null;
        CompanyName: string | null;
        CompanyAddress: string | null;
        CompanyTaxCode: string | null;
        CompanyRepresentative: string | null;
        Banks: string | null;
        Contacts: string | null;
        IdentityReference: string | null;
    };
    PaymentUrlPublic: string;
    PaymentMethod: Array<InvoicePaymentMethod>;
    TotalRows: number;
    Id: string;
    Status: number;
    CreatedDate: string;
    CreatedBy: number;
    CreatedByName: string;
    LastEditedDate: string;
    LastEditedBy: number;
    LastEditedByName: string;
    ProfileData: Record<string, any>;
};
