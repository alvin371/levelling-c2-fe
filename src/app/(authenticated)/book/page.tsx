"use client";

import { Route, route } from "@/commons/routes";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionTable, DataTable, Page } from "admiral";
import { Button, Modal } from "antd";
import { ColumnType } from "antd/es/table";
import { useFilter } from "@/utils/table-filter";
import RowActionButtons from "admiral/table/row-action-button";
import { useDeleteBook, useGetListBooks } from "./_hooks";
import { TBooks } from "./_modules/type";
import { filterSort } from "./_components/filter";

const BookClient = () => {
  const { implementDataTable, setFilter, filter } = useFilter();

  const { isPending, handleSubmit } = useDeleteBook();
  const { data, isLoading } = useGetListBooks(filter);

  const columns: ColumnType<TBooks>[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Author",
      key: "author",
      render: (value, record) => {
        return record.authors.map((author) => author.name).join(", ");
      },
    },
    {
      title: "Category",
      key: "category",
      render: (value, record) => {
        return record.categories.map((category) => category.name).join(", ");
      },
    },
    {
      title: "Publisher",
      key: "publisher",
      render: (value, record) => {
        return record.publisher.name;
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
                title: "Detail Book",
                href: `${Route.BOOK}/${record.id}`,
              },
              {
                type: "edit",
                title: "Edit Book",
                href: route(Route.BOOK_EDIT, { id: recordId! }),
              },
              {
                type: "delete",
                title: "Delete Book",
                onClick: () => {
                  Modal.confirm({
                    title: "Delete Book",
                    okType: "danger",
                    content:
                      "Data that has been deleted cannot be restored. Are you sure you want to delete this Book?",
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
      title="List Books"
      topActions={
        <>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            href={Route.BOOK_CREATE}
          >
            Create Book
          </Button>
        </>
      }
      breadcrumbs={[
        { label: "Dashboard", path: Route.DASHBOARD },
        { label: "Book", path: Route.BOOK_CREATE },
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

export default BookClient;
