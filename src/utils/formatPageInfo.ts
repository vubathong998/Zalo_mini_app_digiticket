import {
    BaseAxiosResponse,
    PaginationInterface
} from "../models/globalInterface";

export const formatPageInfo = (
  arrayResponse: BaseAxiosResponse<any>
): PaginationInterface => {
  return {
    currentPage: arrayResponse.Data.PageIndex,
    hasNextPage: true,
    hasPreviousPage: arrayResponse.Data.PageIndex !== 1,
    lastPage: Math.ceil(arrayResponse.Data.Total / arrayResponse.Data.PageSize),
    length: arrayResponse.Data.Total,
    perPage: arrayResponse.Data.PageSize,
    nextPage: arrayResponse.Data.PageIndex + 1,
    previousPage: arrayResponse.Data.PageIndex - 1 || 1,
  };
};
