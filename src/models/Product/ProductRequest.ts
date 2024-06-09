import { ListFilter } from 'models/dynamicFilterInterface';

export type GetListProductRequest = {
    CategoryId?: string;
    CollectionId?: string;
    ProductId?: string;
    UsingDate?: string;
} & ListFilter;

export type GetProductDetailRequest = {
    // Aid: string;
    GroupServiceId: string;
    UsingDate: string;
};
export type GetProductDetailPriceCalendarRequest = {
    GroupServiceId: string;
    // AId: string;
    BeginDate: string;
    EndDate: string;
};
export type GetListAvailableUsingDateRequest = {
    GroupServiceId: string;
    // AId: string;
    DateFrom?: string;
    DateTo?: string;
};
