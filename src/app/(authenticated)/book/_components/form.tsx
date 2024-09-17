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
  message,
  DatePicker,
  Select,
} from "antd";
import { Store } from "antd/es/form/interface";
import { z } from "zod";
import { createZodSync } from "@/utils/zod-sync";
import { TBooks } from "../_modules/type";
import { Route } from "@/commons/routes";
import dayjs from "dayjs";
import { useCreateBook, useUpdateBook } from "../_hooks";
import { authorOption, subCategoryOption } from "@/commons/enum";

export const BookSchema = z.object({
  id: z.number().optional(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title cannot exceed 255 characters"),
  author_ids: z.array(z.number()).min(1, "At least one author ID is required"),
  isbn: z
    .string()
    .min(1, "ISBN is required")
    .max(13, "ISBN cannot exceed 13 characters"),
  published_date: z.coerce
    .date()
    .transform((date) => dayjs(date).format("YYYY-MM-DD")),
  quantity: z.coerce.number().min(0, "Quantity cannot be less than 0"),
  category_ids: z.array(z.number()).min(1, "At least one category is required"),
  description: z
    .string()
    .max(1000, "Description cannot exceed 1000 characters")
    .optional(),
  publisher_id: z.coerce.number().min(1, "Publisher ID is required"),
  page_count: z.coerce.number().min(0, "Page count cannot be less than 0"),
  language: z.string(),
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
    const parsedValues = {
      ...values,
      quantity: Number(values.quantity),
      page_count: Number(values.page_count),
    };

    const formValue = BookSchema.safeParse({
      ...parsedValues,
      id: data?.id,
    });

    try {
      await form.validateFields();
      setIsLoading(true);

      if (formValue.success) {
        if (isUpdate) {
          await updateBook({ ...formValue.data });
        } else {
          await createBook({ ...formValue.data });
        }
        router.push(Route.BOOK);
      } else {
        message.error("Invalid data. Please check your inputs.");
        console.log("Validation Errors:", formValue.error?.issues);
      }
    } catch (error) {
      message.error("Validation failed. Please ensure all fields are correct.");
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
        { label: "Books", path: Route.BOOK },
        {
          label: isUpdate ? "Edit Book" : "Create Book",
          path: isUpdate ? Route.BOOK_EDIT : Route.BOOK_CREATE,
        },
      ]}
    >
      <Row
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "8px",
        }}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="Title" name="title" rules={[zodSync]} required>
                <Input
                  placeholder="Enter book title"
                  disabled={isLoading}
                  maxLength={255}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="ISBN" name="isbn" rules={[zodSync]} required>
                <Input
                  placeholder="Enter ISBN (max 13 characters)"
                  disabled={isLoading}
                  maxLength={13}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Published Date"
                name="published_date"
                rules={[zodSync]}
                required
              >
                <DatePicker
                  placeholder="Select published date"
                  style={{ width: "100%" }}
                  disabled={isLoading}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[zodSync]}
                required
              >
                <Input
                  type="number"
                  placeholder="Enter quantity"
                  min={0}
                  disabled={isLoading}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Description"
                name="description"
                rules={[zodSync]}
              >
                <Input.TextArea
                  placeholder="Enter description (optional)"
                  maxLength={1000}
                  disabled={isLoading}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Language"
                name="language"
                rules={[zodSync]}
                required
              >
                <Input
                  placeholder="Enter language code (e.g., 'en')"
                  disabled={isLoading}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Author"
                name="author_ids"
                rules={[zodSync]}
                required
              >
                <Select
                  placeholder="Select author"
                  disabled={isLoading}
                  options={authorOption.map((author) => ({
                    label: author.name,
                    value: author.id,
                  }))}
                  onChange={(value) => {
                    form.setFieldsValue({ author_ids: [value] });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Publisher id"
                name="publisher_id"
                rules={[zodSync]}
                required
              >
                <Input placeholder="Enter Publisher ID" disabled={isLoading} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Page Count"
                name="page_count"
                rules={[zodSync]}
                required
              >
                <Input
                  type="number"
                  placeholder="Enter number of pages"
                  min={0}
                  disabled={isLoading}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Category"
                name="category_ids"
                rules={[zodSync]}
                required
              >
                <Select
                  placeholder="Select category"
                  disabled={isLoading}
                  options={subCategoryOption.map((category) => ({
                    label: category.name,
                    value: category.id,
                  }))}
                  onChange={(value) => {
                    form.setFieldsValue({ category_ids: [value] });
                  }}
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
                {isUpdate ? "Update" : "Create"}
              </Button>
            </Space>
          </Row>
        </Form>
      </Row>
    </Page>
  );
};

export default FormBook;
