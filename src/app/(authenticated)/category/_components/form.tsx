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
  Select,
} from "antd";
import { Store } from "antd/es/form/interface";
import { z } from "zod";
import { createZodSync } from "@/utils/zod-sync";
import { TCategories } from "../_modules/type";
import { Route } from "@/commons/routes";
import dayjs from "dayjs";
import { useCreateCategories, useUpdateCategories } from "../_hooks";
import { parentCategoryOption, subCategoryOption } from "@/commons/enum";

export const CategorySchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name cannot exceed 255 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description cannot exceed 1000 characters"),
  parent_category_id: z.number().optional(),
  sub_category_ids: z
    .array(z.number())
    .min(1, "At least one sub category is required"),
});

const zodSync = createZodSync(CategorySchema);

export const FormAuthor: React.FC<{
  data?: Partial<TCategories>;
  isUpdate?: boolean;
}> = ({ data, isUpdate = false }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { handleSubmit: createCategories } = useCreateCategories();
  const { handleSubmit: updateCategories } = useUpdateCategories();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        id: data.id,
        name: data.name,
        description: data.description,
        parent_category_id: data.parent_category_id,
        sub_category_ids: data.sub_category_ids || [],
      });
    }
  }, [data, form]);

  const onFinish = async (values: Store) => {
    const formValue = CategorySchema.safeParse({
      ...values,
      id: data?.id,
    });
    await form.validateFields();
    setIsLoading(true);
    try {
      if (formValue.success) {
        if (isUpdate) {
          updateCategories({ ...formValue.data });
        } else {
          createCategories({ ...formValue.data });
        }
        router.push(Route.CATEGORY);
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
                Description
              </Typography.Title>
              <Form.Item name="description" rules={[zodSync]} required>
                <Input.TextArea
                  placeholder="Enter description"
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
                Parent Category
              </Typography.Title>
              <Form.Item name="parent_category_id" rules={[zodSync]} required>
                <Select
                  placeholder="Select parent category"
                  disabled={isLoading}
                  options={parentCategoryOption.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Typography.Title level={5}>
                <Typography.Text type="danger" style={{ marginRight: "5px" }}>
                  *
                </Typography.Text>
                Sub Category
              </Typography.Title>
              <Form.Item
                name="sub_category_ids"
                rules={[zodSync]}
                validateTrigger="onBlur"
                required
              >
                <Select
                  mode="multiple"
                  placeholder="Select sub category"
                  disabled={isLoading}
                  options={subCategoryOption.map((item) => ({
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

export default FormAuthor;
