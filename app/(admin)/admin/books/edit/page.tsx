"use client";

import { Button, Form, message, Space, Spin } from "antd";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircleIcon } from "lucide-react";
import { Book } from "@/constant/types";
import { getBookById, updateBook } from "@/modules/services/bookService";
import { useTranslation } from "react-i18next";
import { image } from "@heroui/theme";
import BookForm from "@/modules/book/BookForm";
import { toast } from "sonner";

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
    const dataPayload = {
      ...values,
      price: Number(values.price),
      weight: Number(values.weight),
      images: uploadedImages,
    };

    try {
      if (id) {
        await updateBook(id, dataPayload);
      } else {
        toast.error("Invalid book ID. Please try again.");
      }
      toast.success("Book updated successfully!");
      form.resetFields();
      router.push("/admin/books");
    } catch {
      toast.error("Failed to update book. Please try again.");
    }
  };

  useEffect(() => {
    if (id) {
      handleFetchBook(id);
    }
  }, [id, handleFetchBook]);

  useEffect(() => {
    form.setFieldsValue(book);
    const images = book?.book_images?.map((values) => values.url) || [];
    setUploadedImages(images);
  }, [book, form]);

  return (
    <div className="min-h-[85vh] bg-white dark:bg-gray-900 flex flex-col items-center justify-start rounded-lg shadow-sm gap-4 px-4 pt-10">
      {loading ? (
        <div className="flex items-center justify-center min-h-[500px]">
          <Spin size="large" />
        </div>
      ) : (
        <div className="w-full">
          <h1 className="ml-[10px] text-3xl font-bold pb-6">
            {t("Edit Book")}
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
