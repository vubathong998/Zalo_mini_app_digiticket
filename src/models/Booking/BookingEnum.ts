export enum BookingTabEnum {
    GeneralInfo = 'GeneralInfo',
    Products = 'Products',
    Tickets = 'Tickets',
    CashFlow = 'CashFlow',
    Logs = 'Logs',
}

export enum BookingPaymentStatusEnum {
    NotFinish = -1,
    WaitPayment,
    PaymentOk,
    Liabilities,
}
export enum IssueStatusEnum {
    Pending = 1,
    Issued = 2,
}
export enum DeliveryStatusEnum {
    Processing = 0,
    PickingUp = 1,
    OutForDelivery = 2,
    DeliveryFail = 3,
    Delivered = 4,
    Cancelled = 5,
}
export enum OrderStatusEnum {
    NotFinish, // Chưa chọn hình thức thanh toán
    HoldOk, // Đã giữ hàng
    WaitPayment, // Chờ thanh toán
    Cancel, // Huỷ
    PaymentSuccess, // Thanh toán thành công
    IssueTicket, // Đã xuất vé
    Finish, // Đã hoàn thành cung cấp dịch vụ
    Continue, // Đã thanh toán 1 phần
}
export enum BookingTypeEnum {
    Retail = 1,
    Wholesale = 2,
}
