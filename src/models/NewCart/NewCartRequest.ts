export type NewCartAddItemRequest = {
    CartId: string;
    ItemId?: string;
    Count?: number;
    UsingDate: Array<string>;
};

export type NewCartUpdateItemRequest = {
    CartId: string;
    ItemId: string;
    CartItemId: string;
    Count: number;
};

export type NewItemRemoveFromCartRequest = {
    Id?: string;
    CartId: string;
    GroupServiceId: string;
    CartItemId: string;
};

export type NewCreateOrderFromCartRequest = {
    CartId: string;
    ClientIp?: string;
    LanguageCode?: string;
    ListItem?: Array<NewCreateOrderFromCartListItemRequest>;
    Contact: NewCreateOrderFromCartContactRequest;
    CustomerId?: string;
    CustomerContactId?: string;
    BankId?: number;
    PaymentId?: number;
    CashReceive?: number;
    CashReturn?: number;
    TotalPrice?: number;
    Currency?: number;
    From?: number;
    DistributorId?: string;
    CId?: string;
    Affiliate?: NewCreateOrderFromCartAffiliateRequest;
};
export type NewCreateOrderFromCartAffiliateRequest = {
    ShortlinkCode: string;
    CampaignCode: string;
    PublisherCode: string;
    UtmSource: string;
    UtmCampaign: string;
    UtmContent: string;
    UtmTerm: string;
    UtmMedium: string;
    Device: string;
    Platform: string;
};
export type NewCreateOrderFromCartContactRequest = {
    Address: string;
    Title: string;
    FirstName: string;
    Name: string;
    Phone: string;
    Email: string;
};
export type NewCreateOrderFromCartListItemRequest = {
    CartItemId: string;
};
