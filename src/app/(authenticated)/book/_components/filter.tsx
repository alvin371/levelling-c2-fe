"use client";
import { TFilter } from "@/utils/table-filter";
import { SortAscendingOutlined } from "@ant-design/icons";
import { TFilterItem } from "admiral/table/filter-collection/factory";
import { SelectProps } from "antd";

export const filterSort = ({
  options,
  searchParams,
}: {
  options: SelectProps["options"];
  searchParams?: Record<string, TFilter>;
}): TFilterItem => {
  return {
    name: "sort",
    label: "Sort",
    title: "Sort",
    type: "Group",
    icon: <SortAscendingOutlined />,
    cols: 2,
    filters: [
      {
        label: "Field",
        name: "sort_by",
        placeholder: "Select Field",
        type: "Select",
        value: searchParams?.sort_by,
        options,
      },
      {
        label: <div style={{ visibility: "hidden" }}>Order</div>,
        name: "order",
        type: "Select",
        placeholder: "Select Order",
        value: searchParams?.order,
        options: [
          { label: "Ascending", value: "asc" },
          { label: "Descending", value: "desc" },
        ],
      },
    ],
    maxWidth: 600,
  };
};
