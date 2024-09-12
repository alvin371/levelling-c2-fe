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
  DatePicker,
  Select,
  Switch,
} from "antd";
import { Store } from "antd/es/form/interface";
import { z } from "zod";
import { createZodSync } from "@/utils/zod-sync";
import { TUsers } from "../_modules/type";
import { Route } from "@/commons/routes";
import dayjs from "dayjs";
import { useCreateUser, useUpdateUser } from "../_hooks";
import { bookOption } from "@/commons/enum";

export const UserSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name cannot exceed 255 characters"),
  email: z
    .string()
    .email("Invalid email format")
    .min(1, "Email is required")
    .max(255, "Email cannot exceed 255 characters"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(255, "Password cannot exceed 255 characters"),

  membership_date: z.coerce
    .date()
    .transform((date) => dayjs(date)?.format("YYYY-MM-DD")),
  status: z.boolean(),
  borrowings: z.array(z.number()),
});

const zodSync = createZodSync(UserSchema);

export const FormUser: React.FC<{
  data?: Partial<TUsers>;
  isUpdate?: boolean;
}> = ({ data, isUpdate = false }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { handleSubmit: createUser } = useCreateUser();
  const { handleSubmit: updateUser } = useUpdateUser();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        membership_date: data.membership_date
          ? dayjs(data.membership_date)
          : null,
        status: data.status,
        borrowings_ids: data.borrowings || [],
      });
    }
  }, [data, form]);

  const onFinish = async (values: Store) => {
    const formValue = UserSchema.safeParse({
      ...values,
      id: data?.id,
    });

    await form.validateFields();
    setIsLoading(true);

    try {
      if (formValue.success) {
        if (isUpdate) {
          updateUser({ ...formValue.data });
        } else {
          createUser({ ...formValue.data });
        }
        router.push(Route.USER);
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
    router.push(Route.USER);
  };

  return (
    <Page
      title={isUpdate ? "Edit User" : "Create User"}
      breadcrumbs={[
        { label: "Dashboard", path: Route.DASHBOARD },
        { label: "User", path: Route.USER },
        {
          label: isUpdate ? "Edit User" : "Create User",
          path: isUpdate ? Route.USER_EDIT : Route.USER_CREATE,
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
                Email
              </Typography.Title>
              <Form.Item
                name="email"
                rules={[zodSync]}
                validateTrigger="onBlur"
                required
              >
                <Input
                  placeholder="Enter email"
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
                Password
              </Typography.Title>
              <Form.Item
                name="password"
                rules={[zodSync]}
                validateTrigger="onBlur"
                required
              >
                <Input.Password
                  placeholder="Enter password"
                  disabled={isLoading}
                  maxLength={255}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Typography.Title level={5}>Membership Date</Typography.Title>
              <Form.Item name="membership_date" rules={[zodSync]} required>
                <DatePicker
                  placeholder="Select membership date"
                  style={{ width: "100%" }}
                  disabled={isLoading}
                  onChange={(date) => {
                    form.setFieldsValue({ membership_date: date });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Typography.Title level={5}>Status</Typography.Title>
              <Form.Item name="status" rules={[zodSync]} required>
                <Switch
                  checked={form.getFieldValue("status")}
                  onChange={(checked) =>
                    form.setFieldsValue({ status: checked })
                  }
                  disabled={isLoading}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Typography.Title level={5}>Borrowings</Typography.Title>
              <Form.Item
                name="borrowings"
                rules={[zodSync]}
                validateTrigger="onBlur"
                required
              >
                <Select
                  mode="multiple"
                  placeholder="Select borrowings"
                  disabled={isLoading}
                  options={bookOption.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
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

export default FormUser;
