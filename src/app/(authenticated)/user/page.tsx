"use client";

import { Route, route } from "@/commons/routes";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionTable, DataTable, Page } from "admiral";
import { Button, Modal, Tag } from "antd";
import { ColumnType } from "antd/es/table";
import { useFilter } from "@/utils/table-filter";
import RowActionButtons from "admiral/table/row-action-button";
import { useDeleteUser, useGetListUser } from "./_hooks";
import { TUsers } from "./_modules/type";
import { filterSort } from "./_components/filter";

const UserClient = () => {
  const { implementDataTable, setFilter, filter } = useFilter();

  const { isPending, handleSubmit } = useDeleteUser();
  const { data, isLoading } = useGetListUser(filter);

  const columns: ColumnType<TUsers>[] = [
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Membership Date",
      dataIndex: "membership_date",
      key: "membership_date",
    },
    {
      title: "Status",
      render: (value, record) => {
        return record.status === "Active" ? (
          <Tag color="green">{record.status}</Tag>
        ) : (
          <Tag color="red">{record.status}</Tag>
        );
      },
      key: "status",
    },
    {
      title: "Borrowings",
      key: "borrowings",
      render: (value, record) => {
        return record.borrowings?.map((borrowing) => (
          <p key={borrowing.id}>{borrowing.book_title}</p>
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
                title: "Detail User",
                href: `${Route.USER}/${record.id}`,
              },
              {
                type: "edit",
                title: "Edit User",
                href: route(Route.USER, { id: recordId! }),
              },
              {
                type: "delete",
                title: "Delete User",
                onClick: () => {
                  Modal.confirm({
                    title: "Delete User",
                    okType: "danger",
                    content:
                      "Data that has been deleted cannot be restored. Are you sure you want to delete this user?",
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
      title="List User"
      topActions={
        <>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            href={Route.USER_CREATE}
          >
            Create User
          </Button>
        </>
      }
      breadcrumbs={[
        { label: "Dashboard", path: Route.DASHBOARD },
        { label: "User", path: Route.USER },
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
              { label: "Membership Date", value: "membership_date" },
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

export default UserClient;
