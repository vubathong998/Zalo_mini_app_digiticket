import { OptionItem } from 'constants/categories';
import { BookingPaymentStatusEnum } from './Booking/BookingEnum';

type PaymentStatusType = Array<
    OptionItem<BookingPaymentStatusEnum, { color?: string; icon?: string }>
>;
export const PAYMENT_STATUS: PaymentStatusType = [
    {
        label: 'Chờ thanh toán',
        value: BookingPaymentStatusEnum.WaitPayment,
        color: 'text-sm text-warning',
        icon: 'ti ti-wallet-off',
    },
    {
        label: 'Thanh toán thất bại',
        value: BookingPaymentStatusEnum.NotFinish,
        color: 'text-sm text-danger',
        icon: 'ti ti-credit-card',
    },
    {
        label: 'Thanh toán thành công',
        value: BookingPaymentStatusEnum.PaymentOk,
        color: 'text-sm text-success',
        icon: 'ti ti-credit-card',
    },
    {
        label: 'Ghi nợ',
        value: BookingPaymentStatusEnum.Liabilities,
        color: 'text-sm text-warning',
        icon: 'ti ti-credit-card',
    },
];

export const getPaymentStatus = (status: BookingPaymentStatusEnum) => {
    return PAYMENT_STATUS.find((o) => o.value === status);
};
