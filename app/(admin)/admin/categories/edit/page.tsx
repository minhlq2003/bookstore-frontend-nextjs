"use client";

import React, { useCallback, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Form, message } from "antd";
import Title from "antd/es/typography/Title";
import CategoryForm from "../CategoryForm";
import { CheckCircleIcon } from "lucide-react";
import { Category } from "@/constant/types";
import {
  getCategoryById,
  updateCategory,
} from "@/modules/services/categoryService";

export default function EditCategory() {
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetchCategory = useCallback(
    async (id: string) => {
      setLoading(true);
      const res = await getCategoryById(id);
      setCategory(res?.data || null);
      setLoading(false);
    },
    [form]
  );

  const onFinish = async (values: Category) => {
    const dataPayload = {
      id: values.id,
      name: values.name,
      slug: values.slug,
      description: values.description,
    };

    try {
      if (id) {
        await updateCategory(id, dataPayload);
      } else {
        message.error("Invalid category id. Please try again.");
      }
      message.success("Category updated successfully!");
      form.resetFields();
      router.push("/admin/categories");
    } catch {
      message.error("Failed to update category. Please try again.");
    }
  };

  const onFinishFailed = () => {
    message.error("Vui lòng kiểm tra lại thông tin.");
  };

  useEffect(() => {
    if (id) {
      handleFetchCategory(id);
    }
  }, [id, handleFetchCategory]);

  useEffect(() => {
    form.setFieldsValue(category);
  }, [category, form]);

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
