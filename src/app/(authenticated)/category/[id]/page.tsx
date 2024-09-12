"use client";

import { Page } from "admiral";
import { Button, Descriptions, Divider, Space, Typography } from "antd";
import { FC, ReactElement } from "react";
import { Route, route } from "@/commons/routes";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useGetDetailCategories } from "../_hooks";
import { useParams } from "next/navigation";
import dayjs from "dayjs";

const DetailCategoryModule: FC = (): ReactElement => {
  const params = useParams();
  const detailCategory = useGetDetailCategories(params.id.toString()).data;
  return (
    <Page
      title="Categories Details"
      topActions={
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            href={route(Route.CATEGORY_EDIT, { id: params.id.toString() })}
          >
            Edit Categories
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
        { label: "Category", path: Route.CATEGORY },
        { label: "Category Details", path: Route.CATEGORY_DETAIL },
      ]}
    >
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Name" span={2}>
          {detailCategory?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Description" span={2}>
          {detailCategory?.description}
        </Descriptions.Item>
        <Descriptions.Item label="Subcategories">
          {detailCategory?.subcategories?.map((subcategory) => (
            <div key={subcategory.id}>{subcategory.name}</div>
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

export default DetailCategoryModule;
