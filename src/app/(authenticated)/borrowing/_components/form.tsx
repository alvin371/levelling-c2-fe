"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Page } from "admiral";
import {
  Button,
  Col,
  Form,
  Row,
  Space,
  Typography,
  message,
  DatePicker,
  Select,
} from "antd";
import { Store } from "antd/es/form/interface";
import { z } from "zod";
import { createZodSync } from "@/utils/zod-sync";
import { Route } from "@/commons/routes";
import dayjs from "dayjs";
import { bookOption, userOption } from "@/commons/enum";
import { useCreateBorrowing, useUpdateBorrowing } from "../_hooks";
import { TBorrowing } from "../_modules/type";

export const BorrowingSchema = z.object({
  id: z.number().optional(),
  user_id: z.number().min(1, "User is required"),
  book_id: z.number().min(1, "Book is required"),
  borrowed_date: z.coerce
    .date()
    .transform((date) => dayjs(date).format("YYYY-MM-DD")),
  return_date: z.coerce
    .date()
    .transform((date) => dayjs(date).format("YYYY-MM-DD"))
    .refine((date) => dayjs(date).isAfter(dayjs()), {
      message: "Return date must be after today",
    }),
  status: z.enum(["Borrowed", "Returned"], {
    errorMap: () => ({ message: "Status is required" }),
  }),
});

const zodSync = createZodSync(BorrowingSchema);

export const FormAuthor: React.FC<{
  data?: Partial<TBorrowing>;
  isUpdate?: boolean;
}> = ({ data, isUpdate = false }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { handleSubmit: createBorrowing } = useCreateBorrowing();
  const { handleSubmit: updateBorrowing } = useUpdateBorrowing();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        id: data.id,
        name: data.user?.name,
        book: data.book?.title,
        borrowed_date: dayjs(data.borrowed_date),
        return_date: dayjs(data.return_date),
        status: data.status,
      });
    }
  }, [data, form]);

  const onFinish = async (values: Store) => {
    const formValue = BorrowingSchema.safeParse({
      ...values,
      id: data?.id,
    });
    await form.validateFields();
    setIsLoading(true);
    try {
      if (formValue.success) {
        if (isUpdate) {
          updateBorrowing({ ...formValue.data });
        } else {
          createBorrowing({ ...formValue.data });
        }
        router.push(Route.BORROWING);
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
    router.push(Route.BORROWING);
  };

  return (
    <Page
      title={isUpdate ? "Edit Borrowing" : "Create Borrowing"}
      breadcrumbs={[
        { label: "Dashboard", path: Route.DASHBOARD },
        { label: "Borrowing", path: Route.BORROWING },
        {
          label: isUpdate ? "Edit Borrowing" : "Create Borrowing",
          path: isUpdate ? Route.BOOK_EDIT : Route.BORROWING_CREATE,
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
                User
              </Typography.Title>
              <Form.Item
                name="user_id"
                rules={[zodSync]}
                validateTrigger="onBlur"
                required
              >
                <Select
                  options={userOption?.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                  placeholder="Select user"
                  disabled={isLoading}
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    form.setFieldsValue({ user_id: value });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Typography.Title level={5}>
                <Typography.Text type="danger" style={{ marginRight: "5px" }}>
                  *
                </Typography.Text>
                Book
              </Typography.Title>
              <Form.Item name="book_id" rules={[zodSync]} required>
                <Select
                  options={bookOption?.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                  placeholder="Select book"
                  disabled={isLoading}
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    form.setFieldsValue({ book_id: value });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Typography.Title level={5}>
                <Typography.Text type="danger" style={{ marginRight: "5px" }}>
                  *
                </Typography.Text>
                Borrowed Date
              </Typography.Title>
              <Form.Item name="borrowed_date" rules={[zodSync]} required>
                <DatePicker
                  style={{ width: "100%" }}
                  disabled={isLoading}
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Typography.Title level={5}>
                <Typography.Text type="danger" style={{ marginRight: "5px" }}>
                  *
                </Typography.Text>
                Return Date
              </Typography.Title>
              <Form.Item
                name="return_date"
                rules={[zodSync]}
                validateTrigger="onBlur"
                required
              >
                <DatePicker
                  style={{ width: "100%" }}
                  disabled={isLoading}
                  format="YYYY-MM-DD"
                  disabledDate={(current) => {
                    return current && current < dayjs().endOf("day");
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Typography.Title level={5}>
                <Typography.Text type="danger" style={{ marginRight: "5px" }}>
                  *
                </Typography.Text>
                Status
              </Typography.Title>
              <Form.Item
                name="status"
                rules={[zodSync]}
                validateTrigger="onBlur"
                required
              >
                <Select
                  options={[
                    { value: "Borrowed", label: "Borrowed" },
                    { value: "Returned", label: "Returned" },
                  ]}
                  placeholder="Select status"
                  disabled={isLoading}
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    form.setFieldsValue({ status: value });
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
