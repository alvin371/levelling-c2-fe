"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Page } from "admiral";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Space,
  Typography,
  message,
  notification,
} from "antd";
import { Store } from "antd/es/form/interface";
import { z } from "zod";
import { createZodSync } from "@/utils/zod-sync";
import { TAuthors } from "../_modules/type";
import { Route } from "@/commons/routes";

// Define the Zod schema
export const AuthorSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name cannot exceed 255 characters"),
  birthdate: z
    .string()
    .min(1, "Birthdate is required")
    .max(10, "Invalid date format"),
  biography: z
    .string()
    .min(1, "Biography is required")
    .max(1000, "Biography cannot exceed 1000 characters"),
  nationality: z
    .string()
    .min(1, "Nationality is required")
    .max(255, "Nationality cannot exceed 255 characters"),
});

const zodSync = createZodSync(AuthorSchema);

export const FormAuthor: React.FC<{
  data?: Partial<TAuthors>;
  isUpdate?: boolean;
}> = ({ data, isUpdate = false }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: Store) => {
    const formValue = AuthorSchema.safeParse(values);
    setIsLoading(true);
    try {
      if (formValue.success) {
        if (isUpdate) {
          //   await updateAuthor({ ...formValue.data });
        } else {
          //   await createAuthor({ ...formValue.data });
        }
        notification.success({
          message: `Author ${isUpdate ? "updated" : "created"} successfully`,
        });
        router.push("/authors"); // Update the route as needed
      }
    } catch (error) {
      message.error("Data not valid, please check your form");
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(Route.AUTHOR); // Update the route as needed
  };

  return (
    <Page
      title={isUpdate ? "Edit Author" : "Create Author"}
      breadcrumbs={[
        { label: "Authors", path: Route.AUTHOR },
        {
          label: isUpdate ? "Edit Author" : "Create Author",
          path: isUpdate ? Route.AUTHOR_CREATE : Route.AUTHOR_EDIT,
        },
      ]}
    >
      <Row
        style={{
          backgroundColor: "white",
          paddingTop: "40px",
          paddingBottom: "40px",
          borderRadius: "8px",
        }}
      >
        <Form
          form={form}
          onFinish={onFinish}
          style={{ width: "100%" }}
          initialValues={data}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Typography.Title level={5}>
                <Typography.Text type="danger" style={{ marginRight: "5px" }}>
                  *
                </Typography.Text>
                Name
              </Typography.Title>
              <Form.Item
                name="name"
                rules={[zodSync]}
                validateTrigger="onBlur"
                required
              >
                <Input
                  placeholder="Enter name"
                  disabled={isLoading}
                  maxLength={255}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Typography.Title level={5}>
                <Typography.Text type="danger" style={{ marginRight: "5px" }}>
                  *
                </Typography.Text>
                Birthdate
              </Typography.Title>
              <Form.Item
                name="birthdate"
                rules={[zodSync]}
                validateTrigger="onBlur"
                required
              >
                <Input
                  placeholder="Enter birthdate"
                  disabled={isLoading}
                  maxLength={10}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Typography.Title level={5}>
                <Typography.Text type="danger" style={{ marginRight: "5px" }}>
                  *
                </Typography.Text>
                Biography
              </Typography.Title>
              <Form.Item
                name="biography"
                rules={[zodSync]}
                validateTrigger="onBlur"
                required
              >
                <Input.TextArea
                  placeholder="Enter biography"
                  disabled={isLoading}
                  maxLength={1000}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Typography.Title level={5}>
                <Typography.Text type="danger" style={{ marginRight: "5px" }}>
                  *
                </Typography.Text>
                Nationality
              </Typography.Title>
              <Form.Item
                name="nationality"
                rules={[zodSync]}
                validateTrigger="onBlur"
                required
              >
                <Input
                  placeholder="Enter nationality"
                  disabled={isLoading}
                  maxLength={255}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end" style={{ marginTop: "20px" }}>
            <Space>
              <Button onClick={handleCancel} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" disabled={isLoading}>
                Save
              </Button>
            </Space>
          </Row>
        </Form>
      </Row>
    </Page>
  );
};
