import {
    BookingPaymentStatusEnum,
    DeliveryStatusEnum,
    IssueStatusEnum,
    OrderStatusEnum,
} from 'models/Booking/BookingEnum';
import { NewOrderInfoInventoryStatus } from './NewOrderInfoEnum';

/* #region list order info */
export type NewOrderInfoModel = {
    LanguageCode: string;
    OrderCode: string; //
    PaymentStatus: number; //
    UsingDate: string;
    DistributorId: string;
    DistributorName: string; //
    DistributorCode: string;
    PlaceOrEventId: string;
    PlaceOrEventName: string;
    PlaceOrEventCode: string;
    Source: string;
    SourceCode: string;
    SupplierId: string;
    SupplierName: string;
    CategoryId: string;
    UserIdProcess: number;
    UserProcessName: string;
    UserProcessAvartar: string;
    BankId: number;
    BankName: string;
    PaymentId: number;
    PaymentName: string;
    TotalPrice: number; //
    Discount: number; //
    CashReceive: number;
    CashReturn: number;
    Surcharge: number;
    PaymentFee: number;
    Ip: string;
    TypeExchange: number;
    ShipType: number;
    OrderType: string;
    CustomerId: string;
    CustomerName: string; //
    CustomerIdentityReference: string;
    CustomerContactId: string;
    OrderItemDetails: Array<OrderInfoItemDetailModel>;
    Name: string;
    Address: string;
    Phone: string;
    PromotionCode: string;
    Email: string;
    VoucherStatus: NewOrderInfoInventoryStatus;
    DeliveryStatus: NewOrderInfoInventoryStatus;
    StatusName: string;
    /// <summary>
    /// Xác địch đơn hàng mua buôn hay mua lẻ
    /// </summary>
    Type: number;
    OrderDate: string;
    DeliveryDate: string;
    PaymentUrlPublic: string;
    Id: string;
    Status: OrderStatusEnum;
    CreatedDate: string;
    CreatedBy: number;
    CreatedByName: string;
    LastEditedDate: string;
    LastEditedBy: number;
    LastEditedByName: string;
    ProfileData: OrderInfoGetByPageProfileDataModel;
};
export type OrderInfoGetByPageProfileDataModel = {};
export type OrderInfoItemDetailModel = {
    GroupServiceId: string;
    ProductName: string;
    ProductDescription: string;
    Quantity: number;
    Unit: number;
    UnitName: string;
    UnitChild: number;
    UnitChildName: string;
    ProductChildName: string;
    ExchangeRate: number;
    Avatar: string;
    Images: Array<{ Url: string }>;
    SalePrice: number;
    PromotionPrice: number;
    DiscountValue: number;
    TotalPrice: number;
    PaymentFee: number;
    UsingDate: Array<Date>;
};
/* #endregion */

/* #region get detail */
export type NewOrderInfoGetDetailModel = {
    Status: OrderStatusEnum;
    OrderCode: string;
    CategoryId: string;
    DisWorkgroupId: number;
    LanguageCode: string;
    UserIdProcess: number;
    BankId: number;
    BankName: string;
    TotalPrice: number;
    Discount: number;
    CashReceive?: number;
    CashReturn?: number;
    Surcharge?: number;
    PaymentFee: number;
    Currency: number;
    PaymentPartner: number;
    // EnumPaymentPartner
    PaymentPartnerName: string;
    // EnumPaymentPartnerName
    PaymentId: number;
    // EnumPaymentType
    PaymentName: string;
    // EnumPaymentTypeName
    PaymentStatus: BookingPaymentStatusEnum;
    // EnumPaymentStatus
    PaymentStatusName: string;
    // EnumPaymentStatusName
    IsVoucher: number;
    ShipType: number;
    DeliveryDate: Date;
    DeliveryStatus: DeliveryStatusEnum;
    //* unknown
    VoucherStatus: IssueStatusEnum;
    ClientIp: string;
    Active: boolean;
    Type: number;
    CustomerId?: number;
    CustomerContactId?: number;
    CollaboratorId?: number;
    CollaboratorCode: string;
    TotalRows: number;
    PaymentUrlPublic: string;
    OrderContact: NewOrderContactModel;
    OrderTickets: Array<NewOrderTicketModel>;
    OrderDelivery: Array<NewOrderDeliveryModel>;
    Payment: Array<NewPriceInModel>;
    DriverInfo: NewDriverInfoModel;
    OrderDistributor: NewOrderDistributorModel;
    OrderSupplier: NewOrderSupplierModel;
    PaymentMethod: Array<NewPaymentMethodModel>;
    Collaborator: NewCollaboratorResponse;
};
export type NewOrderContactModel = {
    OrderId: string;
    Name: string;
    Address: string;
    Phone: string;
    Email: string;
    ReceivePlace: string;
    CompanyAddress: string;
    TaxNumber: string;
    CompanyName: string;
    TaxNumCompanyNameber: string;
    City: string;
    Note: string;
    EmailInvoice: string;
};
export type NewOrderTicketModel = {
    Id: string;
    OrderId: string;
    SupplierId: string;
    CategoryId: string;
    CategoryName: string;
    ProductId: string;
    ProductCode: string;
    ProductName: string;
    Description: string;
    WorkgroupId: number;
    Place: string;
    Avatar: string;
    Images: Array<{ Url: string }>;
    IsVoucher: number;
    ServicePricesId: string;
    ServicePricesName: string;
    GroupServiceId: string;
    GroupServiceName: string;
    GroupServiceCode: string;
    GroupServiceUnit: string;
    UnitExchangeRate: number;
    GroupServiceUnitChild: string;
    //Thêm xử lý unit
    GroupServiceUnitId: number;
    GroupServiceUnitChildId: number;
    GroupServiceChildName: string;
    GroupServiceChildId: string;
    //Thêm xử lý unit
    OriginalPrice: number;
    SalePrice: number;
    PromotionPrice: number;
    Count: number;
    DiscountValue: number;
    TotalPrice: number;
    PaymentFee: number;
    UsingDate: Array<Date>;
    VoucherStatus: number;
    DeliveryStatus: number;
    SupplierStatus: number;
    CustomerStatus: number;
    ProcessId: number;
    CustomerInfomation: number;
    // TicketDetail: Array<UsedTicket>;
    //OrderCode đơn buôn của đại lý
    DISOrderCode: string;
    //OrderCode đơn nhập của Tenant
    ReceiptOrderCode: string;
    //* unknown
    // thêm xử lý variation
    //* unknown
    // Variations: VariationsResponse;
};
export type NewDriverInfoModel = {
    DriverName: string;
    LisencePlate: string;
    PhoneNumber: string;
    Image: string;
    VehicleType: string;
};
export type NewOrderDeliveryModel = {
    OrderId: string;
    OrderTicketId: string;
    OrderCode: string;
    Address: string;
    Stop: number;
    Lat: number;
    Lng: number;
    ContactName: string;
    ContactPhone: string;
    ContactEmail: string;
};
export type NewPriceInModel = {
    Id: string;
    OrderId: string;
    OrderTicketId: string;
    Price: number;
    //public DateTime CreatedDate { get; set; }
    //public DateTime DatePayment { get; set; }
    //public bool Invoice { get; set; }
    //public int PaymentType { get; set; }
    Status: number;
    //public string Note { get; set; }
    //public long CreateBy { get; set; }
    //public string CreateByName { get; set; }
    //public string CreateByAvartar { get; set; }
    //public long ModifiedBy { get; set; }
    //public string ModifiedByName { get; set; }
    //public string ModifiedByAvartar { get; set; }
    //public DateTime ModifiedDate { get; set; }
    //public long AgencyId { get; set; }
    //public bool Active { get; set; }
};
export type NewOrderDistributorModel = {
    DistributorId: string;
    DistributorName: string;
    PlaceOrEventId: string;
    PlaceOrEventName: string;
};
export type NewOrderSupplierModel = {
    SupplierId: string;
    SupplierName: string;
    Address: string;
    Description: string;
    Title: string;
    ContactName: string;
    Phone: string;
    Hotline: string;
    Email: string;
    BookingEmail: string;
    CompanyName: string;
    CompanyAddress: string;
    CompanyTaxCode: string;
    CompanyRepresentative: string;
    //* unknown
    // Banks: Array<SupplierBank>;
    //* unknown
    // Contacts: Array<SupplierContact>;
    IdentityReference: string;
    //public string SupplierConfigCode { get; set; }
};
export type NewPaymentMethodModel = {
    Name: string;
    Id: number;
    PartnerId: number;
    Url: string;
    //* unknown
    // Detail: Array<PaymentDetail>;
    Index: number;
    Description: string;
    Images: Array<{ Url: string }>;
};
export type NewCollaboratorResponse = {
    Id: string;
    GroupId: string;
    GroupName: string;
    Code: string;
    Name: string;
    CityId: number;
    CityName: string;
    DistrictId: number;
    DistrictName: string;
    WardId: number;
    WardName: string;
    Description: string;
    Address: string;
    TotalPoint: number;
    IsPublic: boolean;
    IsApproval: boolean;
    Contact: NewCollaboratorContactModel;
};
export type NewCollaboratorContactModel = {
    Id: string;
    GroupId: string;
    IdentityType: number;
    IdentityId: number;
    Title?: number;
    FirstName?: number;
    LastName?: number;
    Gender: boolean;
    EmailAddress?: number;
    Phone?: number;
    Tax?: number;
    Address?: number;
};
/* #endregion */
