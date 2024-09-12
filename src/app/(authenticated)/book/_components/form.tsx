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
} from "antd";
import { Store } from "antd/es/form/interface";
import { z } from "zod";
import { createZodSync } from "@/utils/zod-sync";
import { TBooks } from "../_modules/type";
import { Route } from "@/commons/routes";
import dayjs from "dayjs";
import { useCreateBook, useUpdateBook } from "../_hooks";

// Modify the birthdate schema to transform dayjs object to string
export const BookSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title cannot exceed 255 characters"),
  author_ids: z.array(z.number()).min(1, "At least one author is required"),
  isbn: z
    .string()
    .min(1, "ISBN is required")
    .max(13, "ISBN cannot exceed 13 characters"), // Adjust according to ISBN-13 standard
  published_date: z.coerce
    .date()
    .transform((date) => dayjs(date)?.format("YYYY-MM-DD")),
  quantity: z.number().min(0, "Quantity cannot be less than 0"),
  category_ids: z.array(z.number()).min(1, "At least one category is required"),
  description: z
    .string()
    .max(1000, "Description cannot exceed 1000 characters")
    .optional(),
  publisher_id: z.number().min(1, "Publisher ID is required"),
  page_count: z.number().min(0, "Page count cannot be less than 0"),
  language: z
    .string()
    .min(2, "Language is required")
    .max(2, "Language must be a 2-letter ISO code"),
});

const zodSync = createZodSync(BookSchema);

export const FormBook: React.FC<{
  data?: Partial<TBooks>;
  isUpdate?: boolean;
}> = ({ data, isUpdate = false }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { handleSubmit: createBook } = useCreateBook();
  const { handleSubmit: updateBook } = useUpdateBook();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        id: data.id,
        title: data.title,
        author_ids: data.authors?.map((author) => author.id),
        isbn: data.isbn,
        published_date: dayjs(data.published_date),
        quantity: data.quantity,
        category_ids: data.categories?.map((category) => category.id),
        description: data.description,
        publisher_id: data.publisher?.id,
        page_count: data.page_count,
        language: data.language,
      });
    }
  }, [data, form]);

  const onFinish = async (values: Store) => {
    const formValue = BookSchema.safeParse({
      ...values,
      id: data?.id,
    });
    await form.validateFields();
    setIsLoading(true);
    try {
      if (formValue.success) {
        if (isUpdate) {
          // updateBook({ ...formValue.data });
        } else {
          // createBook({ ...formValue.data });
        }
        router.push(Route.BOOK);
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
    router.push(Route.BOOK);
  };

  return (
    <Page
      title={isUpdate ? "Edit Book" : "Create Book"}
      breadcrumbs={[
        { label: "Dashboard", path: Route.DASHBOARD },
        { label: "Book", path: Route.BOOK },
        {
          label: isUpdate ? "Edit Book" : "Create Book",
          path: isUpdate ? Route.BOOK_EDIT : Route.BOOK_CREATE,
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
                Title
              </Typography.Title>
              <Form.Item
                name="title"
                rules={[zodSync]}
                validateTrigger="onBlur"
                required
              >
                <Input
                  placeholder="Enter book title"
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
                ISBN
              </Typography.Title>
              <Form.Item name="isbn" rules={[zodSync]} required>
                <Input
                  placeholder="Enter ISBN"
                  disabled={isLoading}
                  maxLength={13}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Typography.Title level={5}>
                <Typography.Text type="danger" style={{ marginRight: "5px" }}>
                  *
                </Typography.Text>
                Published Date
              </Typography.Title>
              <Form.Item name="published_date" rules={[zodSync]} required>
                <DatePicker
                  placeholder="Select published date"
                  style={{ width: "100%" }}
                  disabled={isLoading}
                  onChange={(date) => {
                    form.setFieldsValue({ published_date: date });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Typography.Title level={5}>
                <Typography.Text type="danger" style={{ marginRight: "5px" }}>
                  *
                </Typography.Text>
                Quantity
              </Typography.Title>
              <Form.Item name="quantity" rules={[zodSync]} required>
                <Input
                  placeholder="Enter quantity"
                  disabled={isLoading}
                  type="number"
                  min={0}
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
                  maxLength={1000}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Typography.Title level={5}>
                <Typography.Text type="danger" style={{ marginRight: "5px" }}>
                  *
                </Typography.Text>
                Language
              </Typography.Title>
              <Form.Item name="language" rules={[zodSync]} required>
                <Input
                  placeholder="Enter language (e.g., 'en', 'fr')"
                  disabled={isLoading}
                  maxLength={2}
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

export default FormBook;
