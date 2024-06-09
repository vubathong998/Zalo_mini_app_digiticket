import { DateOfUse } from 'models/NewListing/NewListingModel';

export type VariationOptionModel = {
    Id: string;
    Value: string;
    Unit: string | null;
    IsDefault?: boolean;
    Data?: DateOfUse;
};
