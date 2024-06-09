import { TicketStatusEnum } from 'models/Ticket/TicketEnum';

export const TICKET_STATUS: Array<{
    label: string;
    value: TicketStatusEnum;
    color?: string;
    icon: string;
}> = [
    {
        label: 'Khoá',
        value: TicketStatusEnum.Block,
        color: 'grey-9300',
        icon: '',
    },
    {
        label: 'Đã phát hành',
        value: TicketStatusEnum.Available,
        color: 'primary',
        icon: '',
    },
    {
        label: 'Đã huỷ',
        value: TicketStatusEnum.Cancel,
        color: 'danger',
        icon: '',
    },
    {
        label: 'Đã giữ hàng',
        value: TicketStatusEnum.Hold,
        color: 'info',
        icon: '',
    },
    {
        label: 'Đã xuất',
        value: TicketStatusEnum.Issue,
        color: 'success',
        icon: '',
    },
    {
        label: 'Sẵn sàng sử dụng',
        value: TicketStatusEnum.OnHand,
        color: 'success',
        icon: '',
    },
];

export const getTicketStatus = (
    status: TicketStatusEnum,
): {
    label: string;
    value: TicketStatusEnum | -1;
    color?: string;
    icon: string;
} => {
    const currentStatus = TICKET_STATUS.find((o) => o.value === status);
    if (currentStatus) {
        return currentStatus;
    }
    return {
        label: 'Đã sử dụng',
        value: -1,
        color: 'dark',
        icon: '',
    };
};
