import { OptionItem } from 'constants/categories';

export enum TransactionTypeEnum {
    Supplier = 1,
    Products = 2,
    Service = 3,
    GroupService = 4,
    Distributor = 5,
    Customner = 6,
    Vehicle = 7,
    Driver = 8,
    Route = 9,
    Schedule = 10,
    Orders = 11,
    PlaceOrEvent = 12,
    TicketSummary = 13,
    Ticket = 14,
    Member = 15,
    Booking = 16,
}
export enum TransactionTypeStringEnum {
    Supplier = 'supplier',
    Products = 'products',
    Service = 'service',
    GroupService = 'groupService',
    Distributor = 'distributor',
    Customner = 'customer',
    Vehicle = 'vehicle',
    Driver = 'driver',
    Route = 'route',
    Schedule = 'schedule',
    Orders = 'orders',
    PlaceOrEvent = 'placeOrEvent',
    TicketSummary = 'ticket-summary',
    Ticket = 'ticket',
    Member = 'member',
    Booking = 'booking',
}
export enum TransactionStatusEnum {
    Pending = 0,
    Approved = 1,
}
export enum TransactionPaymentStatusEnum {
    Created = 0,
    Paid = 1,
    Debt = 2,
}
export enum TransactionActiveEnum {
    InActive = 0,
    Active = 1,
}

type TransactionActiveType = Array<
    OptionItem<
        TransactionActiveEnum,
        {
            color?: string;
            icon?: string;
        }
    >
>;

type TransactionStatusType = Array<
    OptionItem<
        TransactionStatusEnum,
        {
            color?: string;
            icon?: string;
        }
    >
>;

export const TRANSACTION_STATUS: TransactionStatusType = [
    {
        label: 'Chờ duyệt',
        value: TransactionStatusEnum.Pending,
        icon: '',
        color: 'warning',
    },
    {
        label: 'Đã duyệt',
        value: TransactionStatusEnum.Approved,
        icon: '',
        color: 'success',
    },
];

export const TRANSACTION_ACTIVE: TransactionActiveType = [
    {
        label: 'Còn hiệu lực',
        value: TransactionActiveEnum.Active,
        icon: '',
        color: 'success',
    },
    {
        label: 'Hết hiệu lực',
        value: TransactionActiveEnum.InActive,
        icon: '',
        color: 'danger',
    },
];
