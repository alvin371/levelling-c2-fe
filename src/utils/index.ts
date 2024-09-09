import { TPaginationMeta, TPaginationResponse } from "@/commons/types/api";
import { TablePaginationConfig } from "antd";

export const makeSource = <T>(data?: TPaginationResponse<T>) => {
  return {
    data: data,
    meta: paginationTransform(data?.meta),
  };
};
export const paginationTransform = (
  t?: TPaginationMeta
): TablePaginationConfig => {
  return {
    current: t?.page,
    pageSize: t?.per_page,
    total: t?.total_page,
  };
};
