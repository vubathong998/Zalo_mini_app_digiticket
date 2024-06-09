export interface DynamicFilterItem {
  Opt: "AND" | "OR";
  Opt1: "<>" | "=" | ">=" | "<=";
  Name: string;
  Type: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  Values: string;
}
export type DynamicFilterList = Array<DynamicFilterItem>;

export type ListFilter = {
  CreateBy?: number;
  Filter: DynamicFilterList;
  FieldName?: string;
  Keyword: string;
  Orderby: "desc" | "asc";
  PageIndex: number;
  PageSize: number;
};

export type SuggestionFilter = {
  keyword: string;
};
