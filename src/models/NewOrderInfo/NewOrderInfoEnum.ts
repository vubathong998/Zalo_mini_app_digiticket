export enum NewOrderInfoInventoryStatus {
    // Chờ xuất kho
    Created = 1, // Tạo mới
    // Đã xuất kho
    Issued = 2, // Đã bán (Isue)
    // Đã sử dụng
    Used = 3, // Đã sử dụng
}

export enum NewOrderInfoTypeEnum {
    OnPost = 3,
    Voucher = 2,
    Delivery = 1,
}