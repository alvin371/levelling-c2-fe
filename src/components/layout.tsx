"use client";

import {
  ClockCircleOutlined,
  MailOutlined,
  NotificationOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Typography } from "antd";
import { LayoutWithHeader, Page, UserAvatar } from "admiral";
import Link from "next/link";

const { Title } = Typography;

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <LayoutWithHeader
      header={{
        brandLogo: <Title level={5}>Training</Title>,
        menu: (
          <>
            <MailOutlined />
            <ClockCircleOutlined />
            <NotificationOutlined />
            <UserAvatar
              info={{ fullname: "John Doe", roles: [{ name: "Admin" }] }}
            />
          </>
        ),
      }}
      sidebar={{
        defaultOpenKeys: ["sub1"],
        defaultSelectedKeys: ["1"],
        menu: [
          {
            key: "1",
            label: <Link href="/">Dashboard</Link>,
          },
        ],
        theme: "light",
        width: 200,
      }}
    >
      {children}
    </LayoutWithHeader>
  );
};

export default Layout;
