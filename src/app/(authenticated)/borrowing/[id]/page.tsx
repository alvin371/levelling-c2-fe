"use client";

import { Page, Section } from "admiral";
import { Button, Descriptions, Divider, Space, Tag, Typography } from "antd";
import { FC, ReactElement } from "react";
import { Route, route } from "@/commons/routes";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useGetDetailBorrowing } from "../_hooks";
import { useParams } from "next/navigation";
import dayjs from "dayjs";

const DetailBorrowingModule: FC = (): ReactElement => {
  const params = useParams();
  const detailBorrowing = useGetDetailBorrowing(params.id.toString()).data;
  return (
    <Page
      title="Borrowing Details"
      topActions={
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            href={route(Route.AUTHOR_EDIT, { id: params.id.toString() })}
          >
            Edit Borrowing
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            // href={`${Route.AUTHOR_DELETE}/${author?.id}`}
          >
            Delete Borrowing
          </Button>
        </Space>
      }
      breadcrumbs={[
        { label: "Dashboard", path: Route.DASHBOARD },
        { label: "Borrowing", path: Route.BORROWING },
        { label: "Borrowing Details", path: Route.BORROWING_DETAIL },
      ]}
    >
      <Descriptions bordered column={2}>
        <Descriptions.Item label="User" span={2}>
          {detailBorrowing?.user.name}
        </Descriptions.Item>
        <Descriptions.Item label="Book" span={2}>
          {detailBorrowing?.book.title}
        </Descriptions.Item>
        <Descriptions.Item label="Borrowed Date">
          {dayjs(detailBorrowing?.borrowed_date).format("DD MMM YYYY")}
        </Descriptions.Item>
        <Descriptions.Item label="Return Date">
          {dayjs(detailBorrowing?.return_date).format("DD MMM YYYY")}
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={2}>
          <Tag color="green">{detailBorrowing?.status}</Tag>
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Typography.Text type="secondary">
        For more details, contact support or view related resources.
      </Typography.Text>
    </Page>
  );
};

export default DetailBorrowingModule;
