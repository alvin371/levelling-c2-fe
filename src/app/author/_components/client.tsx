"use client";

import { DataTable, Page } from "admiral";
import { ColumnType } from "antd/es/table";

type TProps = {
  author: any;
};

const AuthorClient: React.FC<TProps> = (props) => {
  console.log(props.author);
  const columns: ColumnType<any>[] = [
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
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
  ];
  return (
    <Page title="Author">
      <DataTable
        columns={columns}
        source={{
          data: props.author,
          meta: {
            current: 1,
            total: 100,
            pageSize: 10,
          },
        }}
      />
    </Page>
  );
};

export default AuthorClient;
