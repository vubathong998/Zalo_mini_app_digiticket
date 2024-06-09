export enum FilterItemTypeEnum {
    Number = 1,
    String = 2,
    Json = 3,
    Datetime = 4,
    Guid = 5,
    Dic = 6,
    List = 7,
    Boolean = 8,
    Date = 9,
}
export enum FilterOpt1QueryCompareEnum {
    Different = '<>',
    Equal = '=',
    GreaterOrEqual = '>=',
    LessOrEqual = '<=',
    In = 'IN',
    NotIn = 'NotIn',
}
export enum FilterOptJoinQueryEnum {
    And = 'AND',
    Or = 'OR',
}
export enum FilterOrderByEnum {
    DESC = 'desc',
    ASC = 'asc',
}
export interface DynamicFilterItem {
    Opt: FilterOptJoinQueryEnum;
    Opt1: FilterOpt1QueryCompareEnum;
    Name: string;
    Type: FilterItemTypeEnum;
    Values: string;
}
export type DynamicFilterList = Array<DynamicFilterItem>;
export type ListFilter = {
    CreateBy?: number;
    Filter?: DynamicFilterList;
    FieldName?: string;
    Keyword: string;
    Orderby: FilterOrderByEnum;
    PageIndex: number;
    PageSize: number;
};
export type SuggestionFilter = {
    keyword: string;
};
