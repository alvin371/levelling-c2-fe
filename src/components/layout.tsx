"use client";

import {
  ClockCircleOutlined,
  MailOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import { LayoutWithHeader, Page, UserAvatar } from "admiral";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Route } from "@/commons/routes";

const { Title } = Typography;

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const currentRoute = usePathname();

  // Define the sidebar menu items with their keys and paths
  const menuItems = [
    { key: "1", label: "Dashboard", path: Route.DASHBOARD },
    { key: "2", label: "Author", path: Route.AUTHOR },
    { key: "3", label: "Book", path: Route.BOOK },
    { key: "4", label: "Category", path: Route.CATEGORY },
    { key: "5", label: "Borrowing", path: Route.BORROWING },
    { key: "6", label: "User", path: Route.USER },
  ];

  // Find the key of the menu item that matches the current route
  const selectedKey =
    menuItems.find((item) => item.path === currentRoute)?.key || "1";

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
        defaultSelectedKeys: [selectedKey], // Use defaultSelectedKeys instead of selectedKeys
        menu: menuItems.map((item) => ({
          key: item.key,
          label: <Link href={item.path}>{item.label}</Link>,
        })),
        theme: "light",
        width: 200,
      }}
    >
      {children}
    </LayoutWithHeader>
  );
};

export default Layout;
