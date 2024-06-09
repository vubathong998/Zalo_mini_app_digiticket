import { ObjectConfigTypeEnum, TagTypeEnum } from './ConfigTagsEnum';

export type ConfigTagsModel = {
    Code: string;
    Name: string;
    ParentId: string;
    Type: TagTypeEnum;
    ValueType: any;
    ObjectConfigType: ObjectConfigTypeEnum;
    Value: string;
    ValueOptions?: string;
    Description: string;
    Color: string;
    Icon: string;
    IsDisplay: boolean;
    IsFilterParam: boolean;
    IsCompareParam: boolean;
    Id: string;
    Depth: number;
    LanguageCode: 'vi-VN' | 'en-US';
    Status: 0 | 1;
    ChildTags: Array<ConfigTagsModel> | null;
    CreatedDate: string;
    CreatedByName: string;
    LastEditedDate: string;
    LastEditedByName: string;
};
