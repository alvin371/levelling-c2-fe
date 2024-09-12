"use client";

import { Page, Section } from "admiral";
import { Button, Descriptions, Divider, Space, Tag, Typography } from "antd";
import { FC, ReactElement } from "react";
import { Route, route } from "@/commons/routes";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useGetDetailUser } from "../_hooks";
import { useParams } from "next/navigation";
import dayjs from "dayjs";

const DetailUserModule: FC = (): ReactElement => {
  const params = useParams();
  const detailUser = useGetDetailUser(params.id.toString()).data;
  return (
    <Page
      title="User Details"
      topActions={
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            href={route(Route.AUTHOR_EDIT, { id: params.id.toString() })}
          >
            Edit User
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            // href={`${Route.AUTHOR_DELETE}/${author?.id}`}
          >
            Delete User
          </Button>
        </Space>
      }
      breadcrumbs={[
        { label: "Dashboard", path: Route.DASHBOARD },
        { label: "User", path: Route.USER },
        { label: "User Details", path: Route.USER_DETAIL },
      ]}
    >
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Name" span={2}>
          {detailUser?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Email" span={2}>
          {detailUser?.email}
        </Descriptions.Item>
        <Descriptions.Item label="Membership Date">
          {dayjs(detailUser?.membership_date).format("DD MMM YYYY")}
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={2}>
          {detailUser?.status === "Active" ? (
            <Tag color="green">{detailUser?.status}</Tag>
          ) : (
            <Tag color="red">{detailUser?.status}</Tag>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Borrowings" span={2}>
          {detailUser?.borrowings?.map((borrowing) => (
            <div key={borrowing.id}>{borrowing.book_title}</div>
          ))}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Typography.Text type="secondary">
        For more details, contact support or view related resources.
      </Typography.Text>
    </Page>
  );
};

export default DetailUserModule;
