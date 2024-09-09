export type Resp<T> = T;

export type TPaginationResponse<T, M = TPaginationMeta> = {
  data: T;
  meta: M;
};

export type TPaginationMeta = {
  page: number;
  current_page: number;
  per_page: number;
  total: number;
  total_page: number;
};

export type TIndexQueryParams = {
  search?: string;
  order?: string;
  sort_by?: string;
};

export type TApiResponseError = {
  error_message: string;
};
export type TParseApiErrorResponse = Omit<TApiResponseError, "errors"> & {
  errors: string;
};
