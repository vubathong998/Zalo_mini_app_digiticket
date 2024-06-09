export type ClassificationModel = {
    Id: string;
    ParentId: string;
    Name: string;
    DisplayName: string;
    Description: string;
    Active: boolean;
    HasChildren: boolean;
    HasParent: boolean;
    Location: string;
    Path: string;
    Depth: number;
    Parent: Array<ClassificationModel>;
    Children: Array<ClassificationModel>;
};