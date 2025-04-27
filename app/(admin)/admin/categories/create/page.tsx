"use client";

import { Button, Form, message } from "antd";
import Title from "antd/es/typography/Title";
import CategoryForm from "../CategoryForm";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { Category } from "@/constant/types";
import { createCategory } from "@/modules/services/categoryService";

export default function AddCategory() {
  const [form] = Form.useForm();

  const onFinish = async (values: Category) => {
    const dataPayload = {
      id: values.id,
      name: values.name,
      slug: values.slug,
      description: values.description,
      createdAt: values.createdAt,
      updatedAt: values.updatedAt,
    };

    try {
      createCategory(dataPayload);
      message.success("Category added successfully!");
      form.resetFields();
    } catch {
      message.error("Failed to add category. Please try again.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 flex flex-col items-center justify-start rounded-lg shadow-sm gap-4 px-4 pt-10">
      <div className="w-full">
        <Title level={2} className="m-0">
          Thêm danh mục mới
        </Title>
        <div className="flex justify-between">
          <CategoryForm form={form} onFinish={onFinish} />
        </div>
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
