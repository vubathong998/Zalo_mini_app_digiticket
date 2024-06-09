import { OrderStatusEnum } from './Booking/BookingEnum';

export const ORDER_STATUS: Array<{
    label: string;
    value: OrderStatusEnum;
    color: string;
    icon: string;
}> = [
    {
        label: 'Chưa giữ hàng',
        value: OrderStatusEnum.NotFinish,
        color: 'grey-800',
        icon: 'ti ti-credit-card-off',
    },
    {
        label: 'Đã giữ hàng',
        value: OrderStatusEnum.HoldOk,
        color: 'primary',
        icon: 'ti ti-credit-card',
    },
    {
        label: 'Chờ thanh toán',
        value: OrderStatusEnum.WaitPayment,
        color: 'warning',
        icon: 'ti ti-credit-card-off',
    },
    {
        label: 'Đã huỷ',
        value: OrderStatusEnum.Cancel,
        color: 'danger',
        icon: 'ti ti-credit-card',
    },
    {
        label: 'Đã thạnh toán',
        value: OrderStatusEnum.PaymentSuccess,
        color: 'info',
        icon: 'ti ti-credit-card-off',
    },
    {
        label: 'Đã xuất vé',
        value: OrderStatusEnum.IssueTicket,
        color: 'success',
        icon: 'ti ti-credit-card',
    },
    {
        label: 'Đã hoàn thành',
        value: OrderStatusEnum.Finish,
        color: 'success',
        icon: 'ti ti-credit-card',
    },
    {
        label: 'Thanh toán một phần',
        value: OrderStatusEnum.Continue,
        color: 'warning',
        icon: 'ti ti-credit-card',
    },
];

export const getStatus = (status: OrderStatusEnum) => {
    return ORDER_STATUS.find((o) => o.value === status);
};
export const getActiveStatus = (status: boolean) => {
    if (!status) {
        return {
            label: 'Hết hiệu lực',
            value: OrderStatusEnum.Finish,
            color: 'success',
            icon: 'ti ti-credit-card',
        };
    }
    return null;
};
