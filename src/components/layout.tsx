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
          {
            key: "2",
            label: <Link href="/author">Author</Link>,
          },
          {
            key: "3",
            label: <Link href="/book">Book</Link>,
          },
          {
            key: "4",
            label: <Link href="/category">Category</Link>,
          },
          {
            key: "5",
            label: <Link href="/borrowing">Borrowing</Link>,
          },
          {
            key: "6",
            label: <Link href="/user">User</Link>,
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
