"use client";

import { Page, Section } from "admiral";
import { Button, Descriptions, Divider, Space, Typography } from "antd";
import { FC, ReactElement } from "react";
import { TAuthors } from "../../_modules/type";
import { Route, route } from "@/commons/routes";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useGetDetailAuthor } from "../../_hooks";
import { useParams } from "next/navigation";
import dayjs from "dayjs";

const DetailAuthorModule: FC = (): ReactElement => {
  const params = useParams();
  const detailAuthor = useGetDetailAuthor(params.id.toString()).data;
  return (
    <Page
      title="Author Details"
      topActions={
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            href={route(Route.AUTHOR_EDIT, { id: params.id.toString() })}
          >
            Edit Author
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            // href={`${Route.AUTHOR_DELETE}/${author?.id}`}
          >
            Delete Author
          </Button>
        </Space>
      }
      breadcrumbs={[
        { label: "Dashboard", path: Route.DASHBOARD },
        { label: "Author", path: Route.AUTHOR },
        { label: "Author Details", path: Route.AUTHOR_DETAIL },
      ]}
    >
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Name" span={2}>
          {detailAuthor?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Birthdate">
          {dayjs(detailAuthor?.birthdate).format("DD MMMM YYYY")}
        </Descriptions.Item>
        <Descriptions.Item label="Biography" span={2}>
          {detailAuthor?.biography}
        </Descriptions.Item>
        <Descriptions.Item label="Nationality">
          {detailAuthor?.nationality}
        </Descriptions.Item>
        <Descriptions.Item label="Books">
          {detailAuthor?.books?.map((book) => (
            <div key={book.id}>{book.title}</div>
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

export default DetailAuthorModule;
