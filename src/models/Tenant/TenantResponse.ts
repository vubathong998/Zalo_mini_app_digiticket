export type TenantItem = {
    Active: boolean;
    ClientId: string;
    ClientSecret: string;
    Code: string;
    CreationTime: string;
    CreatorUserId: number;
    Descriptions?: string;
    Id: number;
    IsMultiToken: boolean;
    Logo?: string;
    Name: string;
    Type: number;
    Url?: string;
};
export type GetListTenantResponse = Array<TenantItem>;
