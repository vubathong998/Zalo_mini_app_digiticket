import { CategoryEnum } from 'models/Category/CategoryEnum';

export type OptionItem<T = any, E = any> = {
    label: string;
    value: T;
    disabled?: boolean;
} & E;

export const CATEGORIES: Array<
    OptionItem<CategoryEnum, { icon: string; isParent: boolean; Id: CategoryEnum }>
> = [
    {
        label: 'Tất cả',
        value: CategoryEnum.EMPTY,
        Id: CategoryEnum.EMPTY,
        icon: 'https://images.unsplash.com/photo-1678778012416-36b2443c332e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNhdGVnb3J5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        isParent: true,
    },
    {
        label: 'Vé máy bay',
        value: CategoryEnum.FLY,
        Id: CategoryEnum.FLY,
        icon: 'https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmxpZ2h0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        isParent: true,
    },
    {
        label: 'Ô tô',
        value: CategoryEnum.CAR,
        Id: CategoryEnum.CAR,
        icon: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        isParent: true,
    },
    {
        label: 'Xe sân bay',
        value: CategoryEnum.CAR1,
        Id: CategoryEnum.CAR1,
        icon: 'https://images.unsplash.com/photo-1562253260-523124cc8d9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWlycG9ydCUyMHRheGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        isParent: false,
    },
    {
        label: 'Xe riêng định tuyến',
        value: CategoryEnum.CAR2,
        Id: CategoryEnum.CAR2,
        icon: 'https://images.unsplash.com/photo-1610809589386-9ea41901eb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FyJTIwZHJpdmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        isParent: false,
    },
    {
        label: 'Xe khách',
        value: CategoryEnum.CAR3,
        Id: CategoryEnum.CAR3,
        icon: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YnVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        isParent: false,
    },
    {
        label: 'Xe riêng',
        value: CategoryEnum.CAR4,
        Id: CategoryEnum.CAR4,
        icon: 'ti ti-car',
        isParent: false,
    },
    {
        label: 'Xe tự lái',
        value: CategoryEnum.CAR5,
        Id: CategoryEnum.CAR5,
        icon: 'https://images.unsplash.com/photo-1484373030460-8de45ac8796d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmFtaWx5JTIwY2FyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        isParent: false,
    },
    {
        label: 'Lưu trú - Khách sạn',
        value: CategoryEnum.ACM,
        Id: CategoryEnum.ACM,
        icon: 'https://images.unsplash.com/photo-1554647286-f365d7defc2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGhvdGVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        isParent: true,
    },
    {
        label: 'Khách sạn/ Resort',
        value: CategoryEnum.ACM1,
        Id: CategoryEnum.ACM1,
        icon: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        isParent: false,
    },
    {
        label: 'Villa/ Căn hộ',
        value: CategoryEnum.ACM2,
        Id: CategoryEnum.ACM2,
        icon: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        isParent: false,
    },
    {
        label: 'Du thuyền',
        value: CategoryEnum.ACM3,
        Id: CategoryEnum.ACM3,
        icon: 'https://images.unsplash.com/photo-1559599746-8823b38544c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3J1aXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        isParent: false,
    },
    {
        label: 'Homestay/ Dorm',
        value: CategoryEnum.ACM4,
        Id: CategoryEnum.ACM4,
        icon: 'https://images.unsplash.com/photo-1520277739336-7bf67edfa768?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9ybWl0b3J5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        isParent: false,
    },
    {
        label: 'Vé sự kiện',
        value: CategoryEnum.EVT,
        Id: CategoryEnum.EVT,
        icon: 'https://images.unsplash.com/photo-1578575436955-ef29da568c6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGlja2V0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        isParent: true,
    },
    {
        label: 'Vé khu vui chơi',
        value: CategoryEnum.ENT,
        Id: CategoryEnum.ENT,
        icon: 'https://images.unsplash.com/photo-1518206075495-4e901709d372?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fG1vdmllJTIwdGlja2V0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        isParent: true,
    },
    {
        label: 'F&B',
        value: CategoryEnum.FoodAndBeverage,
        Id: CategoryEnum.FoodAndBeverage,
        icon: 'https://images.unsplash.com/photo-1594312153972-2447167966d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZCUyMGFuZCUyMGJldmVyYWdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        isParent: true,
    },
    {
        label: 'Thời trang',
        value: CategoryEnum.FAS,
        Id: CategoryEnum.FAS,
        icon: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        isParent: true,
    },
    {
        label: 'Thẻ thành viên',
        value: CategoryEnum.CRD,
        Id: CategoryEnum.CRD,
        icon: 'https://images.unsplash.com/photo-1599590984817-0c15f31b1fa5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVtYmVyJTIwY2FyZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        isParent: false,
    },
    {
        label: 'Evoucher',
        value: CategoryEnum.EVO,
        Id: CategoryEnum.EVO,
        icon: 'https://plus.unsplash.com/premium_photo-1683887064374-dc6dd77ece50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dm91Y2hlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        isParent: true,
    },
    {
        label: 'Combo',
        value: CategoryEnum.COB,
        Id: CategoryEnum.COB,
        icon: 'https://plus.unsplash.com/premium_photo-1676717962720-d9a812c8f8c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZHVjdHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        isParent: true,
    },
    {
        label: 'Thẻ nạp dịch vụ',
        value: CategoryEnum.CRS,
        Id: CategoryEnum.CRS,
        icon: 'https://images.unsplash.com/photo-1537724326059-2ea20251b9c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y3JlZGl0JTIwY2FyZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        isParent: false,
    },
    {
        label: 'Dịch vụ khác',
        value: CategoryEnum.OTH,
        Id: CategoryEnum.OTH,
        icon: '',
        isParent: true,
    },
];
