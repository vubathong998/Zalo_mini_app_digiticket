import {
    NewListingDetailModel,
    NewListingPropertySaleDetailModel,
    NewProductModel,
} from './NewListingModel';

export type NewListingGetByPageResponse = Array<NewProductModel>;

export type NewListingGetListUsingDateByIdResponse = {
    BeginDate: string;
    AvailableDates: Array<string>;
    ExpiryDate: string | null;
};

export type NewListingDetailResponse = NewListingDetailModel;

export type NewListingPropertySaleDetailResponse = NewListingPropertySaleDetailModel;
