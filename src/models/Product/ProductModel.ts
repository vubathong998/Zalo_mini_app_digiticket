import { ProductUsingDateTypeEnum } from './ProductEnum';

export type ProductModel = {
    BeginDate: string;
    ServicePriceId: string;
    CostPrice: number;
    RecommendPrice: number;
    EndUsedPrice: number;
    PromotionPrice: number;
    CategoryName: string;
    Name: string;
    Code: string;
    CategoryId: string;
    Images: Array<{ Url: string }>;
    Description: string;
    Detail: string; //'[{"ServiceId":"94ee5a67-1319-4f0d-a1de-ed6d8a803d4b","LimitUse":1,"IsLimit":true,"Quantity":1,"Unit":""}]';
    OriginalPrice: number;
    IsLimit: null;
    LimitUse: null;
    Unit: string;
    UnitId: number;
    ListService: Array<any>;
    Type: number;
    ProfileType: number;
    Id: string;
    Status: number;
    CreatedDate: string;
    CreatedBy: number;
    CreatedByName: string;
    LastEditedDate: string;
    LastEditedBy: number;
    LastEditedByName: string;
    ProfileData: Record<any, any>;
    ProductId: string;
    //
    UnitChildId?: number;
    UnitChildName?: string;
    UnitExchangeRate?: number;
    RequireUsingdate: boolean;
    UsingDate: {
        ListDate: Array<string>;
        ListDateOff: Array<string>;
        ListDayOfWeek: Array<1 | 0>;
        ListTime: null;
        TimeType: ProductUsingDateTypeEnum;
    };
};

export type ProductPriceCalendarItemModel = {
    Date: string;
    GroupServiceId: string;
    ProductId: string;
    ServicePriceId: string;
    PriceTags: Array<{
        Id: string;
        Code: string;
        Price: number;
        Color: string;
        Index: number;
    }>;
};
