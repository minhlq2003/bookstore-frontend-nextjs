"use client";

import { Button, Form, message } from "antd";
import { useRouter } from "next/navigation";
import CategoryForm, { CategoryFormValues } from "./CategoryForm";
import { PlusCircleIcon } from "lucide-react";
import React from "react";
import { createCategory } from "@/modules/services/categoryService";

interface AddCategoryProps {
  refreshData: () => void;
}

export default function AddCategory({ refreshData }: AddCategoryProps) {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: CategoryFormValues) => {
    try {
      // cal api
      createCategory(values)
      message.success("Danh mục đã được thêm thành công!");
      form.resetFields();
      router.push("/admin/categories");
      refreshData();
    } catch {
      message.error("Thêm danh mục thất bại. Vui lòng thử lại.");
    }
  };

  const onFinishFailed = () => {
    message.error("Vui lòng kiểm tra lại thông tin.");
  };

  return (
    <div className="min-h-[85vh] w-1/2 bg-white dark:bg-gray-900 flex flex-col items-center justify-start rounded-lg shadow-sm gap-4 px-4">
      <div className="w-full max-w-2xl">
        <CategoryForm
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        />
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => onFinish(form.getFieldsValue())}
          icon={<PlusCircleIcon />}
        >
          Thêm danh mục
        </Button>
      </div>
    </div>
  );
}
