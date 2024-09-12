"use client";
import {
  DataTablePagination,
  IDataTableProps,
} from "admiral/table/datatable/type";
import withQuery from "with-query";
import { everyEqual } from "./equal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export type TFilter = string | undefined;

function paramsToObject(entries: IterableIterator<[string, string]>) {
  const result: Record<string, TFilter> = {};
  // Forced assign type because weird error typescript
  for (let entry of entries as unknown as Array<[string, string]>) {
    const [key, value] = entry;
    result[key] = value;
  }
  return result;
}

const normalizePagination = (data?: DataTablePagination) => {
  if (!data) return;
  return {
    page: data.page,
    per_page: data.per_page,
  };
};

const normalize = (data: Record<string, unknown>): Record<string, TFilter> => {
  // Flatting data
  const cloneData: Record<string, TFilter> = Object.keys(data).reduce(
    (all, key) => {
      // check if the value is object then flatting it
      const dataKey = data[key];

      if (dayjs.isDayjs(dataKey)) {
        all[key] = dataKey.toISOString();
        // check if the value is date range then join it
      } else if (
        Array.isArray(dataKey) &&
        dayjs.isDayjs(dataKey[0]) &&
        dayjs.isDayjs(dataKey[1]) &&
        dataKey.length === 2
      ) {
        const startDate = dataKey[0].format("YYYY-MM-DD");
        const endDate = dataKey[1].format("YYYY-MM-DD");
        all[key] = `${startDate};${endDate}`;
        // check if the value is array then join it
      } else if (Array.isArray(dataKey)) {
        all[key] = dataKey.join(",");
        // check if the value is undefined or null then set it to undefined
      } else if (dataKey === undefined || dataKey === null) {
        all[key] = undefined;
      } else if (isObject(dataKey)) {
        const normalizedData = normalize(dataKey);
        Object.keys(normalizedData).forEach((valueKey) => {
          if (!all[valueKey]) all[valueKey] = normalizedData[valueKey];
        });
        // check if the value is else then convert it to string
      } else {
        all[key] = String(dataKey);
      }

      return all;
    },
    {} as Record<string, TFilter>
  );
  return cloneData;
};

export const useFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filter, _setFilter] = useState<Record<string, TFilter>>(
    paramsToObject(searchParams.entries()) || {}
  );

  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsNavigating(false);
    const values = paramsToObject(searchParams.entries());
    _setFilter(values);
  }, [pathname, searchParams]);

  const setFilter = async (
    data: Record<string, unknown>,
    cb?: (data: Record<string, TFilter>) => Record<string, TFilter>
  ) => {
    let cloneData = normalize(data);

    // Set page to 1 after every filter except page, per_page, sort_by and order
    const isResetPage = !(
      "page" in cloneData ||
      "per_page" in cloneData ||
      "sory_by" in cloneData ||
      "order" in cloneData
    );
    if (isResetPage) {
      cloneData.page = "1";
    }

    if (cb) {
      cloneData = cb(cloneData);
    }

    const isEquals = everyEqual(cloneData, filter);
    if (isEquals) return;

    setIsNavigating(true);
    _setFilter((old) => ({ ...old, ...cloneData }));

    const pathnameWithQuery = withQuery(pathname, { ...filter, ...cloneData });
    router.replace(pathnameWithQuery, { scroll: false });
  };

  const implementDataTable: IDataTableProps<any, any>["onChange"] = (
    customFilter,
    sorter,
    filters,
    pagination,
    _extra
  ) => {
    const cloneSort: Record<string, unknown> | undefined = structuredClone({
      ...sorter,
      column: {
        title: sorter?.column?.title,
        dataIndex: sorter?.column?.dataIndex,
        key: sorter?.column?.key,
        sorter: sorter?.column?.sorter,
      },
    });
    if (cloneSort?.sort) {
      cloneSort.sort_by = cloneSort.sort;
      delete cloneSort.sort;
    }
    setFilter({
      ...(customFilter || {}),
      ...(cloneSort || {}),
      ...(filters || {}),
      ...(normalizePagination(pagination) || {}),
    });
  };

  return {
    isNavigating,
    filter,
    setFilter,
    implementDataTable,
  };
};
