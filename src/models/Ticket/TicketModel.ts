import { TicketStatusEnum } from './TicketEnum';

export type TicketModel = {
    SerialNumber: string;
    CheckCode: string;
    QRCode: string;
    Id: string;
    Status: TicketStatusEnum;
    StatusName: string;
    FromDate: string;
    ToDate: string;
    TicketOTA: {
        Password: string | null;
    };
};
