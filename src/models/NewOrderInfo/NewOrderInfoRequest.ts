import { ListFilter } from 'models/dynamicFilterInterface';
import { NewOrderInfoTypeEnum } from './NewOrderInfoEnum';

export type NewOrderInfoGetByPageRequest = ListFilter & {
    Type?: NewOrderInfoTypeEnum;
    Status?: number;
    DateFrom?: Date;
    DateTo?: Date;
    Columns?: Array<string>;
};

export type NewOrderInfoGetDetailRequest = {
    OrderCode: string;
};

export type NewOrderTicketGetListRequest = {
    OrderCode: string;
};
