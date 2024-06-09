export type AgentItem = {
    AllowSelect: number;
    Avatar: string;
    CloseTime: Array<string>;
    Code: string;
    CreatedBy: number;
    CreatedByName: string;
    CreatedDate: string;
    Description: string;
    Id: string;
    Images: string;
    LastEditedBy: number;
    LastEditedByName: string;
    LastEditedDate: string;
    Name: string;
    OpenTime: Array<string>;
    OwnerId: number;
    OwnerName: string;
    Place: string;
    PlaceDetail: null;
    PlaceId: string;
    ProfileData?: {
        Phone: string;
        Email: string;
        OpenTime: string;
        CloseTime: string;
    };
    Status: number;
    TenantId: number;
    WorkgroupId: number;
};

export type AgentDetailModel = {
    Code: string;
    Id: string;
    WorkgroupId: number;
    Name: string;
    Avatar: string;
};

export type ListAgentResponse = Array<AgentDetailModel>;
