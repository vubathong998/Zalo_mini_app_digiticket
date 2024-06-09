import { ListFilter } from 'models/dynamicFilterInterface';

export type NewCollectionGetByPageRequest = ListFilter & {
    // LanguageCode: string;
    // CurrencyCode: string;
    AId: string;
};

export type newCollectionGetDetailRequest = {
    Id: string;
    Aid: string;
};
