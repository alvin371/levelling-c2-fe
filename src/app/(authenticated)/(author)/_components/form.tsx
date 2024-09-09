"use client";
import { useState, useEffect } from "react";
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
  DatePicker,
} from "antd";
import { Store } from "antd/es/form/interface";
import { z } from "zod";
import { createZodSync } from "@/utils/zod-sync";
import { TAuthors } from "../_modules/type";
import { Route } from "@/commons/routes";
import dayjs from "dayjs";
import { useCreateAuthor, useUpdateAuthor } from "../_hooks";

// Modify the birthdate schema to transform dayjs object to string
export const AuthorSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name cannot exceed 255 characters"),
  birthdate: z.coerce
    .date()
    .transform((date) => dayjs(date)?.format("YYYY-MM-DD")),
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

  const { handleSubmit: createAuthor } = useCreateAuthor();
  const { handleSubmit: updateAuthor } = useUpdateAuthor();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        id: data.id,
        name: data.name,
        birthdate: data.birthdate ? dayjs(data.birthdate) : null,
        biography: data.biography,
        nationality: data.nationality,
      });
    }
  }, [data, form]);

  const onFinish = async (values: Store) => {
    const formValue = AuthorSchema.safeParse({
      ...values,
      id: data?.id,
    });
    await form.validateFields();
    setIsLoading(true);
    try {
      if (formValue.success) {
        if (isUpdate) {
          updateAuthor({ ...formValue.data });
        } else {
          createAuthor({ ...formValue.data });
        }
        router.push(Route.AUTHOR);
      } else {
        message.error("Invalid data");
      }
    } catch (error) {
      message.error("Data not valid");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(Route.AUTHOR);
  };

  return (
    <Page
      title={isUpdate ? "Edit Author" : "Create Author"}
      breadcrumbs={[
        { label: "Dashboard", path: Route.DASHBOARD },
        { label: "Author", path: Route.AUTHOR },
        {
          label: isUpdate ? "Edit Author" : "Create Author",
          path: isUpdate ? Route.AUTHOR_EDIT : Route.AUTHOR_CREATE,
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
        <Form form={form} onFinish={onFinish} style={{ width: "100%" }}>
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
              <Form.Item name="birthdate" rules={[zodSync]} required>
                <DatePicker
                  placeholder="Select birthdate"
                  style={{ width: "100%" }}
                  disabled={isLoading}
                  onChange={(date) => {
                    form.setFieldsValue({ birthdate: date });
                  }}
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
              <Form.Item name="biography" rules={[zodSync]} required>
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

export default FormAuthor;
