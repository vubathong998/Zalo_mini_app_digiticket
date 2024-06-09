import { ClassificationModel } from 'models/Classification/ClassificationModel';
import { VariationOptionModel } from 'models/Variation/VariationModel';
import { FilterItemTypeEnum } from 'types/dynamicFilter';
import { ListingUsingDateTypeEnum } from './NewListingEnum';
import { TimeTypeEnum } from 'models/DateTime.types';

export type NewProductModel = {
    Id: string;
    Name: string;
    Description: string;
    ShortDescription?: string;
    Price: number;
    PromotionPrice: number;
    HasPromotion: boolean;
    DiscountPercentage: number;
    Images: Array<{ Url: string }>;
    HasVariationUsingDate: boolean;
};

export type NewListingDetailModel = {
    Id: string;
    Name: string;
    Description: string;
    ShortDescription: string | null;
    ClassificationId: string;
    Classification: Array<ClassificationModel>;
    Images: Array<{ Url: string }>;
    MinHasPromotion: boolean;
    MinPromotionPrice: number;
    MinPrice: number;
    MaxHasPromotion: boolean;
    MaxPromotionPrice: number;
    MaxPrice: number;
    Variation1st: NewListingVariationItemModel | null;
    Variation2nd: NewListingVariationItemModel | null;
    Variation3rd: NewListingVariationItemModel | null;
    VariationUsingDate: NewListingVariationItemModel | null;
    HasVariationUsingDate: boolean;
    AvailableListingProperty: number;
};

export type NewListingVariationItemModel = {
    Id: string;
    Name: string;
    Type: FilterItemTypeEnum;
    Description: string;
    Units: Array<string>; // List Unit default nếu có
    Options: Array<VariationOptionModel>; // List Option default nếu có
    SelectedOptions: Array<VariationOptionModel>; // List Option đã chọn, map ngược từ phần Variations ra
    SelectedUnit: string;
};

export type DateOfUse = {
    RequireUsingdate: boolean;
    IsBuyBefore: boolean;
    BuyBefore: number;
    BuyBeforeTimeType: TimeTypeEnum;
    UsingDate: {
        ListDayOfWeek?: Array<0 | 1>;
        TimeType: ListingUsingDateTypeEnum;
        ListDate?: Array<string>;
        ListDateOff?: Array<string>;
    };
};

export type NewListingPropertySaleDetailModel = {
    Id: string;
    GroupServiceId: string;
    Code: string;
    Price: number;
    PromotionPrice: number;
    HasPromotion: Boolean;
    DiscountPercentage: number;
    Images: [];

    VariationKey1stId: string;
    VariationKey1stValue: string | null;
    VariationOption1stId: string;
    VariationOption1stValue: string | null;
    VariationOption1stUnit: string | null;

    VariationKey2ndId: string;
    VariationKey2ndValue: string | null;
    VariationOption2ndId: string;
    VariationOption2ndValue: string | null;
    VariationOption2ndUnit: string | null;

    VariationKey3rdId: string;
    VariationKey3rdValue: string | null;
    VariationOption3rdId: string;
    VariationOption3rdValue: string | null;
    VariationOption3rdUnit: string | null;

    VariationKeyUsingDateId?: string | null;
    VariationKeyUsingDateValue?: string | null;
    VariationOptionUsingDateId?: string | null;
    VariationOptionUsingDateValue?: string | null;
    VariationOptionUsingDateData?: DateOfUse;
    VariationOptionUsingDateUnit?: string | null;
};
