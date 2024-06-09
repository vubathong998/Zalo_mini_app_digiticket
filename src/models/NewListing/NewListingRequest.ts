import { ListFilter } from 'models/dynamicFilterInterface';

export type NewListingGetByPageRequest = ListFilter & {
    AId: string;
};

export type NewListingGetListUsingDateByIdRequest = {
    AId: string;
    Id: string;
    DateFrom?: string;
    DateTo?: string;
};

export type NewListingPropertyDetailPriceByVariationsRequest = {
    AId: string;
    ListingId: string;
    VariationOption1stId?: string;
    VariationOption2ndId?: string;
    VariationOption3rdId?: string;
    VariationUsingDateValue: string;
};
