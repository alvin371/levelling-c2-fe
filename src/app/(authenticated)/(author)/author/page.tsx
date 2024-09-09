"use client";

import { Route, route } from "@/commons/routes";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionTable, DataTable, Page } from "admiral";
import { Button, Modal } from "antd";
import { useDeleteAuthor, useGetListAuthor } from "../_hooks";
import { ColumnType } from "antd/es/table";
import { TAuthors } from "../_modules/type";
import { useFilter } from "@/utils/table-filter";
import RowActionButtons from "admiral/table/row-action-button";
import { filterSort } from "../_components/filter";

const AuthorClient = () => {
  const { implementDataTable, setFilter, filter } = useFilter();

  const { isPending, handleSubmit } = useDeleteAuthor();
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
    {
      title: "Action",
      dataIndex: "id",
      render: (value, record) => (
        <RowActionButtons
          actions={[
            {
              type: "view",
              title: "Detail Author",
              href: `${Route.AUTHOR_DETAIL}${record.id}`,
            },
            {
              type: "edit",
              title: "Edit Author",
              href: route(Route.AUTHOR_EDIT, { id: record.id.toString() }),
            },
            {
              type: "delete",
              title: "Delete Author",
              onClick: () => {
                Modal.confirm({
                  title: "Delete Author",
                  okType: "danger",
                  content:
                    "Data that has been deleted cannot be restored. Are you sure you want to delete this author?",
                  icon: <DeleteOutlined />,
                  onOk: () => handleSubmit(record.id.toString()),
                  okButtonProps: {
                    loading: isPending,
                  },
                });
              },
            },
          ]}
        />
      ),
    },
  ];
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
          filterSort({
            options: [
              { label: "ID", value: "id" },
              { label: "Name", value: "name" },
              { label: "Birthdate", value: "birthdate" },
            ],
            searchParams: filter,
          }),
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
