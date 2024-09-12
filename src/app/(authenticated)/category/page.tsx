"use client";

import { Route, route } from "@/commons/routes";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionTable, DataTable, Page } from "admiral";
import { Button, Modal, Tag } from "antd";
import { ColumnType } from "antd/es/table";
import { useFilter } from "@/utils/table-filter";
import RowActionButtons from "admiral/table/row-action-button";
import { useDeleteCategories, useGetListCategories } from "./_hooks";
import { TCategories } from "./_modules/type";
import { filterSort } from "./_components/filter";

const AuthorClient = () => {
  const { implementDataTable, setFilter, filter } = useFilter();

  const { isPending, handleSubmit } = useDeleteCategories();
  const { data, isLoading } = useGetListCategories(filter);

  const columns: ColumnType<TCategories>[] = [
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
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Sub Categories",
      key: "subcategories",
      render: (value, record) => {
        return record.subcategories?.map((subcategory) => (
          <Tag key={subcategory.id}>{subcategory.name}</Tag>
        ));
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (value, record) => {
        const recordId = record?.id?.toString();
        return (
          <RowActionButtons
            actions={[
              {
                type: "view",
                title: "Detail Category",
                href: `${Route.CATEGORY}/${record.id}`,
              },
              {
                type: "edit",
                title: "Edit Category",
                href: route(Route.CATEGORY_EDIT, { id: recordId! }),
              },
              {
                type: "delete",
                title: "Delete Category",
                onClick: () => {
                  Modal.confirm({
                    title: "Delete Category",
                    okType: "danger",
                    content:
                      "Data that has been deleted cannot be restored. Are you sure you want to delete this category?",
                    icon: <DeleteOutlined />,
                    onOk: () => handleSubmit(recordId!),
                    okButtonProps: {
                      loading: isPending,
                    },
                  });
                },
              },
            ]}
          />
        );
      },
    },
  ];
  return (
    <Page
      title="List Category"
      topActions={
        <>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            href={Route.CATEGORY_CREATE}
          >
            Create Category
          </Button>
        </>
      }
      breadcrumbs={[
        { label: "Dashboard", path: Route.DASHBOARD },
        { label: "Category", path: Route.CATEGORY },
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
