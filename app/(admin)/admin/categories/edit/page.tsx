"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Form, message } from "antd";
import Title from "antd/es/typography/Title";
import CategoryForm, { CategoryFormValues } from "../CategoryForm";
import { CheckCircleIcon } from "lucide-react";

export default function EditCategory() {
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("id");

  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (categoryId) {
      //   setLoading(true);
    }
  }, [categoryId]);

  const onFinish = async (values: CategoryFormValues) => {
    try {
      message.success("Danh mục đã được cập nhật thành công!");
      router.push("/admin/categories");
    } catch {
      message.error("Cập nhật danh mục thất bại. Vui lòng thử lại.");
    }
  };

  const onFinishFailed = () => {
    message.error("Vui lòng kiểm tra lại thông tin.");
  };

  if (!categoryId) {
    return (
      <div className=" flex items-center justify-center">
        <p>Không tìm thấy danh mục để chỉnh sửa.</p>
      </div>
    );
  }

  return (
    <div className="min-h-full w-full bg-white dark:bg-gray-900 flex flex-col items-start justify-start rounded-lg shadow-sm gap-4 px-4 pt-10">
      <div className="w-1/2">
        <Title level={2} className="m-0">
          Chỉnh sửa danh mục
        </Title>
        {!loading && category ? (
          <CategoryForm
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          />
        ) : (
          <p>Đang tải...</p>
        )}
      </div>
      <Button
        type="primary"
        htmlType="submit"
        onClick={() => onFinish(form.getFieldsValue())}
        icon={<CheckCircleIcon />}
      >
        Lưu thay đổi
      </Button>
    </div>
  );
}
