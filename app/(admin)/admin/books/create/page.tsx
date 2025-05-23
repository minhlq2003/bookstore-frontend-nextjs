"use client";

import { Button, Form, message } from "antd";
import Title from "antd/es/typography/Title";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { Book } from "@/constant/types";
import { createBook } from "@/modules/services/bookService";
import { useTranslation } from "react-i18next";
import BookForm from "@/modules/book/BookForm";
import { toast } from "sonner";

export default function AddBook() {
  const { t } = useTranslation("common");
  const [form] = Form.useForm();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const onFinish = async (values: Book) => {
    //const slug = values.title.trim().replace(/\s+/g, "-").toLowerCase();

    const dataPayload = {
      ...values,
      title: values.title,
      author: values.author,
      price: values.price,
      genre: values.genre,
      publisher: values.publisher,
      publishedDate: values.publishedDate,
      discount: values.discount,
      //slug: slug,
      bookImages: uploadedImages?.map((url) => ({ url })),
    };

    try {
      await createBook(dataPayload);
      toast.success("Book added successfully!");
      form.resetFields();
    } catch {
      toast.error("Failed to add book. Please try again.");
    }
  };

  return (
    <div className="min-h-[85vh] bg-white dark:bg-gray-900 flex flex-col items-center justify-start rounded-lg shadow-sm gap-4 px-4 pt-10">
      <div className="w-full">
        <h1 className="ml-[10px] text-3xl font-bold pb-6">
          {t("Create Book")}
        </h1>

        <div className="flex justify-between">
          <BookForm
            form={form}
            onFinish={onFinish}
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
          />
        </div>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => onFinish(form.getFieldsValue())}
          icon={<PlusCircleIcon />}
        >
          {t("Add Book")}
        </Button>
      </div>
    </div>
  );
}
