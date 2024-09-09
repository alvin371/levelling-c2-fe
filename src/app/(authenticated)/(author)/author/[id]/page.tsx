"use client";

import { Page, Section } from "admiral";
import { Button, Descriptions } from "antd";
import { FC, ReactElement } from "react";
import { TAuthors } from "../../_modules/type";
import { Route } from "@/commons/routes";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const DetailAuthorModule: FC<{ data?: TAuthors }> = ({
  data,
}): ReactElement => {
  return (
    <Page
      title="Detail Author"
      topActions={
        <>
          <Button
            type="primary"
            icon={<EditOutlined />}
            href={Route.AUTHOR_CREATE}
          >
            Edit Author
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            href={`${Route.AUTHOR_EDIT}${data?.id}`}
          >
            Delete Author
          </Button>
        </>
      }
      breadcrumbs={[
        { label: "Dashboard", path: Route.DASHBOARD },
        { label: "Author", path: Route.AUTHOR },
        { label: "Detail Author", path: Route.AUTHOR_DETAIL },
      ]}
    >
      <Section title="Detail Author">
        <Descriptions bordered column={2}>
          <Descriptions.Item span={2} label="Name">
            {data?.name}
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};

export default DetailAuthorModule;
