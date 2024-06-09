import { OptionItem } from 'constants/categories';

import filter from 'lodash/filter';

type PaymentMethodType = Array<OptionItem<PaymentMethodEnum, { color?: string; icon?: string }>>;

export enum PaymentMethodEnum {
    BANK_TRANSFER = 1,
    ATM_CARD = 2,
    VISA = 3,
    MASTERCARD = 4,
    JCB = 5,
    QR = 6,
    MEMBER_TOPUP = 7,
    DISTRIBUTOR_TOPUP = 8,
    MEMBERCARD = 9,
    CASH = 10,
}

export const PAYMENT_METHODS: PaymentMethodType = [
    {
        label: 'Tiền mặt',
        value: PaymentMethodEnum.CASH,
    },
    {
        label: 'Chuyển khoản ngân hàng',
        value: PaymentMethodEnum.BANK_TRANSFER,
    },
    {
        label: 'Thẻ thanh toán nội địa',
        value: PaymentMethodEnum.ATM_CARD,
    },
    {
        label: 'Thẻ thanh toán quốc tế Visa',
        value: PaymentMethodEnum.VISA,
    },
    {
        label: 'Thẻ thanh toán quốc tế Mastercard',
        value: PaymentMethodEnum.MASTERCARD,
    },
    {
        label: 'Thẻ thanh toán quốc tế JCB',
        value: PaymentMethodEnum.JCB,
    },
    {
        label: 'Mã QR',
        value: PaymentMethodEnum.QR,
    },
    {
        label: 'Số dư tài khoản thành viên',
        value: PaymentMethodEnum.MEMBER_TOPUP,
    },
    {
        label: 'Thanh toán dịch vụ được nạp qua thẻ thành viên',
        value: PaymentMethodEnum.MEMBERCARD,
    },
    {
        label: 'Sử dụng số dư đại lý đã topup vào hệ thống',
        value: PaymentMethodEnum.DISTRIBUTOR_TOPUP,
    },
];

export const getPaymentMethodOptions = (data?: Array<PaymentMethodEnum>) => {
    if (data && data.length > 0) {
        return filter(PAYMENT_METHODS, (o) => data.includes(o.value));
    }
    return PAYMENT_METHODS;
};
