"use client";

import { Route } from "@/commons/routes";
import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionTable, DataTable, Page, Tabs } from "admiral";
import { Button } from "antd";
import { useGetListAuthor } from "../_hooks";
import { ColumnType } from "antd/es/table";
import { TAuthors } from "../_modules/type";
import { useRouter } from "next/navigation";
import { useFilter } from "@/utils/table-filter";
const AuthorClient = () => {
  const router = useRouter();
  const { implementDataTable, setFilter, filter } = useFilter();

  const { data, isLoading } = useGetListAuthor(filter);

  const columns: ColumnType<TAuthors>[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Birthdate",
      dataIndex: "birthdate",
      key: "birthdate",
    },
    {
      title: "Biography",
      dataIndex: "biography",
      key: "biography",
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
      key: "nationality",
    },
  ];
  console.log(data?.meta, "data");
  return (
    <Page
      title="Author"
      topActions={
        <>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            href={Route.AUTHOR_CREATE}
          >
            Create Author
          </Button>
        </>
      }
      breadcrumbs={[
        { label: "Dashboard", path: Route.DASHBOARD },
        { label: "Author", path: Route.AUTHOR },
      ]}
      noStyle
      contentStyle={{ paddingTop: 20 }}
    >
      <ActionTable
        onSearch={(value) => setFilter({ search: value })}
        searchValue={filter.search}
        onFiltersChange={(values) => setFilter(values)}
        filters={[
          {
            label: "filter",
            name: "filter",
            type: "Group",
            icon: <FilterOutlined />,
            filters: [
              {
                label: "Status",
                name: "status",
                type: "Select",
                placeholder: "Choose Status",
                value: filter.status,
              },
            ],
          },
        ]}
      />
      <div
        style={{
          backgroundColor: "white",
          padding: "5px",
          marginTop: "10px",
        }}
      >
        <DataTable
          columns={columns}
          hideSearch
          source={{
            data: data?.data,
            meta: {
              total: data?.meta.total || 0,
              pageSize: data?.meta.per_page || 10,
              current: data?.meta.current_page || 1, // Correct field name for the current page
            },
          }}
          loading={isLoading}
          onChange={implementDataTable}
          search={filter.search}
        />
      </div>
    </Page>
  );
};

export default AuthorClient;
