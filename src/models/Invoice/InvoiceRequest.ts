import { PaymentMethodEnum } from 'models/paymentMethod';
import { TransactionPaymentStatusEnum, TransactionTypeStringEnum } from 'models/transaction';

export type GetInvoiceExternalDataRequest = {
    [key in TransactionTypeStringEnum]: string;
};
export type GetInvoiceDetailRequest = {
    TransactionCode: string;
};
export type InvoiceUpdatePaymentMethodRequest = {
    TransactionCode: string;
    PaymentMethod: PaymentMethodEnum;
    // Source: TransactionTypeStringEnum;
};
export type InvoiceUpdatePaymentStatusRequest = {
    TransactionCode: string;
    PaymentStatus: TransactionPaymentStatusEnum;
};

export type InvoicePayRequest = {
    TransactionCode: Array<string>;
    BalanceCode: string;
};

export type GetListBankAccountRequest = {
    Code: string;
};
