"use client";

import { Button, Form, message, Space, Spin } from "antd";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import BookForm from "../BookForm";
import { useSearchParams } from "next/navigation";
import { CheckCircleIcon } from "lucide-react";
import { Book } from "@/constant/types";
import { getBookById, updateBook } from "@/modules/services/bookService";
import { useTranslation } from "react-i18next";

const EditBook = () => {
  const { t } = useTranslation("common");
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState<Book | null>(null);
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleFetchBook = useCallback(async (id: string) => {
    setLoading(true);
    const res = await getBookById(id);
    setBook(res?.data || null);

    setLoading(false);
  }, []);

  const onFinish = async (values: Book) => {
    //const slug = values.title.trim().replace(/\s+/g, "-").toLowerCase();
    const dataPayload = {
      title: values.title,
      author: values.author,
      price: Number(values.price),
      pages: values.pages,
      //publishedDate: values.publishedDate,
      categoryId: values.category,
      publisherId: values.publisher,
      discountCode: values.discount,
      //bookImages: uploadedImages.map((url) => ({ url })),
      description: values.description,
      size: values.size,
      weight: Number(values.weight),
      //slug: slug,
    };

    try {
      if (id) {
        await updateBook(id, dataPayload);
      } else {
        message.error("Invalid book ID. Please try again.");
      }
      message.success("Book updated successfully!");
      form.resetFields();
      router.push("/admin/books");
    } catch {
      message.error("Failed to update book. Please try again.");
    }
  };

  useEffect(() => {
    if (id) {
      handleFetchBook(id);
    }
  }, [id, handleFetchBook]);

  useEffect(() => {
    form.setFieldsValue(book);
    console.log("book", book);
  }, [book, form]);

  return (
    <div className="min-h-[85vh] bg-white dark:bg-gray-900 flex flex-col items-center justify-start rounded-lg shadow-sm gap-4 px-4 pt-10">
      {loading ? (
        <div className="flex items-center justify-center min-h-[500px]">
          <Spin size="large" />
        </div>
      ) : (
        <div className="p-4 w-full">
          <Space>
            <Title level={2}> {t("Edit Book")} </Title>
          </Space>
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
            icon={<CheckCircleIcon />}
          >
            {t("Save Change")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditBook;
