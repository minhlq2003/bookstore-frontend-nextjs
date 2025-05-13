"use client";

import { Button, Form, message } from "antd";
import Title from "antd/es/typography/Title";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { Post } from "@/constant/types";
import { createPost } from "@/modules/services/postService";
import { useTranslation } from "react-i18next";
import PostForm from "@/modules/post/PostForm";

export default function AddPost() {
  const { t } = useTranslation("common");
  const [form] = Form.useForm();
  const [uploadedImage, setUploadedImage] = useState<string>("");

  const onFinish = async (values: Post) => {
    const slug = values.title?.trim().replace(/\s+/g, "-").toLowerCase() || "";

    const dataPayload: Post = {
      title: values.title,
      slug,
      content: values.content,
      category: values.category,
      status: values.status ?? false,
      image: uploadedImage,
    };

    try {
      await createPost(dataPayload);
      message.success(t("Post added successfully!"));
      form.resetFields();
      setUploadedImage("");
    } catch {
      message.error(t("Failed to add post. Please try again."));
    }
  };

  return (
    <div className="min-h-[85vh] bg-white dark:bg-gray-900 flex flex-col items-center justify-start rounded-lg shadow-sm gap-4 px-4 pt-10">
      <div className="w-full">
        <h1 className="ml-[10px] text-3xl font-bold pb-6">
          {t("Create Post")}
        </h1>

        <PostForm
          form={form}
          onFinish={onFinish}
          uploadedImages={uploadedImage}
          setUploadedImages={setUploadedImage}
        />

        <Button
          type="primary"
          htmlType="submit"
          onClick={() => onFinish(form.getFieldsValue())}
          icon={<PlusCircleIcon />}
        >
          {t("Add Post")}
        </Button>
      </div>
    </div>
  );
}
