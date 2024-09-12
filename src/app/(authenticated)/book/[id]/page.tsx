"use client";

import { Page, Section } from "admiral";
import { Button, Descriptions, Divider, Space, Typography } from "antd";
import { FC, ReactElement } from "react";
import { TBooks } from "../_modules/type";
import { Route, route } from "@/commons/routes";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useGetDetailBook } from "../_hooks";
import { useParams } from "next/navigation";
import dayjs from "dayjs";

const DetailAuthorModule: FC = (): ReactElement => {
  const params = useParams();
  const detailAuthor = useGetDetailBook(params.id.toString()).data;
  return (
    <Page
      title="Books Details"
      topActions={
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            href={route(Route.BOOK_EDIT, { id: params.id.toString() })}
          >
            Edit Books
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            // href={`${Route.AUTHOR_DELETE}/${author?.id}`}
          >
            Delete Books
          </Button>
        </Space>
      }
      breadcrumbs={[
        { label: "Dashboard", path: Route.DASHBOARD },
        { label: "Books", path: Route.BOOK },
        { label: "Books Details", path: Route.BOOK_DETAIL },
      ]}
    >
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Title" span={2}>
          {detailAuthor?.title}
        </Descriptions.Item>
        <Descriptions.Item label="Authors">
          {detailAuthor?.authors?.map((author) => (
            <div key={author.id}>{author.name}</div>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="ISBN" span={2}>
          {detailAuthor?.isbn}
        </Descriptions.Item>
        <Descriptions.Item label="Published Date">
          {dayjs(detailAuthor?.published_date).format("DD MMM YYYY")}
        </Descriptions.Item>
        <Descriptions.Item label="Quantity">
          {detailAuthor?.quantity}
        </Descriptions.Item>
        <Descriptions.Item label="Categories">
          {detailAuthor?.categories?.map((category) => (
            <div key={category.id}>{category.name}</div>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Description" span={2}>
          {detailAuthor?.description}
        </Descriptions.Item>
        <Descriptions.Item label="Publisher">
          {detailAuthor?.publisher?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Page Count">
          {detailAuthor?.page_count}
        </Descriptions.Item>
        <Descriptions.Item label="Language">
          {detailAuthor?.language}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Typography.Text type="secondary">
        For more details, contact support or view related resources.
      </Typography.Text>
    </Page>
  );
};

export default DetailAuthorModule;
