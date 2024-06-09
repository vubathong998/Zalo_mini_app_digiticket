export type NewCartModel = {
    CartId: string;
    ListItem: Array<NewCartListItemModel>;
    DisWorkgroupId?: number;
    DistributorId: string;
    PoeWorkgroupId?: number;
    PlaceOrEventId: string;
    TenantId?: number;
    WorkgroupId?: number;
    Expires?: number;
};

export type NewCartListItemModel = {
    CartItemId: string;
    ProductId: string;
    ImageUrl: Array<{ Url: string }>;
    Id: string;
    Name?: string;
    GroupName?: string;
    SalePrice: number;
    PromotionPrice: number;
    UsingDate: string[];
    MinTickets: number;
    MaxTickets: number;
    Count: number;
    DiscountValue: number;
    TotalPrice: number;
    VariationKey1stId: string;
    VariationKey1stValue?: string;
    VariationOption1stId: string;
    VariationOption1stValue?: string;
    VariationOption1stUnit?: string;
    VariationKey2ndId: string;
    VariationKey2ndValue?: string;
    VariationOption2ndId: string;
    VariationOption2ndValue?: string;
    VariationOption2ndUnit?: string;
    VariationKey3rdId: string;
    VariationKey3rdValue?: string;
    VariationOption3rdId: string;
    VariationOption3rdValue?: string;
    VariationOption3rdUnit?: string;
    VariationKeyUsingDateId: string;
    VariationKeyUsingDateValue?: string;
    VariationOptionUsingDateId: string;
    VariationOptionUsingDateValue?: string;
    VariationOptionUsingDateData?: string;
    VariationOptionUsingDateUnit?: string;
    TermOfUsingDate?: NewCartListItemTermOfUsingDate;
    TermOfBuyBefore?: NewCartAddItemListItemTermOfBuyBeforeModel;
};
export type NewCartAddItemListItemTermOfBuyBeforeModel = {
    IsBuyBefore: boolean;
    BuyBefore: number;
    BuyBeforeTimeType: number;
};
export type NewCartListItemTermOfUsingDate = {
    RequireUsingdate: boolean;
    UsingDate: NewCartListItemTermOfUsingDateUsingDate;
};
export type NewCartListItemTermOfUsingDateUsingDate = {
    TimeType: number;
    BeginDate: string;
    EndDate: string;
    ListDayOfWeek: number[];
    ListDate: any[];
    ListTime?: any;
    ListDateOff: string[];
};

export type NewGetCartDetailRequest = {
    Id: string;
}