import { ListFilter } from 'models/dynamicFilterInterface';

export type GetListTicketRequest = ListFilter & {
    PromotionId?: string;
    Status?: number;
    OrderTicketId: string;
    OrderCode: string;
};
