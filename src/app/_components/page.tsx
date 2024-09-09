"use client";

import { Page } from "admiral";
import { List, Typography } from "antd";

const { Title, Text, Link } = Typography;
const data = [
  "Buatlah 5 CRUD dalam 1 hari kerja atau 8 jam",
  <span key={1}>
    Lihatlah dokumentasi api pada{" "}
    <Link href="https://23pkaphzeu.apidog.io" target="_blank">
      https://23pkaphzeu.apidog.io
    </Link>
  </span>,
  "Implementasikan API pada aplikasi",
  "Good luck!",
];

export default function DashboardPage() {
  return (
    <Page title="Dashboard">
      <Title level={5}>Guide Training</Title>
      <List
        dataSource={data}
        renderItem={(item, i) => (
          <List.Item>
            <Text mark>[{i + 1}]</Text> {item}
          </List.Item>
        )}
      />
    </Page>
  );
}
