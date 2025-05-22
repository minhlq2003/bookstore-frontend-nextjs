import {
  Form,
  Input,
  InputNumber,
  Select,
  FormInstance,
  Modal,
  Button,
} from "antd";
import React, { useEffect, useState } from "react";

import { TrashIcon } from "lucide-react";
import { Book, Category, Discount, Publisher } from "@/constant/types";
import Media from "@/modules/media/pages/Media";
import MediaUpload from "@/modules/media/pages/AddNewMedia";
import { useTranslation } from "react-i18next";
import ModalSelectMedia from "@/modules/media/pages/ModalSelectMedia";
import { getAllDiscount, getAllPublishers } from "../services/bookService";
import { getCategories } from "../services/categoryService";

const { TextArea } = Input;

const BookForm: React.FC<{
  form: FormInstance;
  onFinish: (values: Book) => void;
  uploadedImages: string[];
  setUploadedImages: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ form, onFinish, uploadedImages, setUploadedImages }) => {
  const { t } = useTranslation("common");
  const [categories, setCategories] = useState<Category[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChooseMedia, setIsChooseMedia] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<string>("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectMedia = (media: string) => {
    setSelectedMedia(media);
    setIsModalOpen(false);
    setUploadedImages([...uploadedImages, media]);
  };

  const fetchData = async () => {
    const categoriesData = await getCategories({ limit: 1000 });
    const publishersData = await getAllPublishers();
    const discountsData = await getAllDiscount();

    setCategories(categoriesData?.data ?? []);
    setPublishers(publishersData ?? []);
    setDiscounts(discountsData ?? []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = () => {
    onFinish(form.getFieldsValue());
  };
  const handleRemoveImage = (index: number) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      <Form
        form={form}
        name="bookForm"
        onFinish={handleSubmit}
        autoComplete="off"
        layout="vertical"
        className="w-full"
      >
        <div className="border border-[#d9d9d9] p-4 rounded-md">
          <div className="flex flex-row justify-between">
            <Form.Item
              name="title"
              label="Tên sách"
              rules={[{ required: true, message: "Vui lòng nhập tên sách!" }]}
              style={{ width: "60%" }}
            >
              <Input placeholder="Nhập tên sách" className="custom-input" />
            </Form.Item>

            <Form.Item
              name="author"
              label="Tác giả"
              rules={[
                { required: true, message: "Vui lòng nhập tên tác giả!" },
              ]}
              style={{ width: "35%" }}
            >
              <Input placeholder="Nhập tên tác giả" className="custom-input" />
            </Form.Item>
          </div>

          <div className="flex flex-row justify-between">
            <Form.Item
              name="description"
              label="Mô tả"
              style={{ width: "60%" }}
            >
              <TextArea
                rows={5}
                placeholder="Nhập mô tả sách"
                className="custom-textarea"
              />
            </Form.Item>

            <div className="flex flex-col" style={{ width: "35%" }}>
              <Form.Item
                name="price"
                label="Giá"
                rules={[{ required: true, message: "Vui lòng nhập giá sách!" }]}
                className="w-full"
              >
                <InputNumber
                  min={1}
                  placeholder="Nhập giá sách"
                  className="custom-input w-full"
                />
              </Form.Item>

              <div className="flex flex-row justify-between">
                <Form.Item
                  name="pages"
                  label="Số trang"
                  style={{ width: "45%" }}
                >
                  <InputNumber
                    min={1}
                    placeholder="Nhập số trang"
                    className="custom-input w-full"
                  />
                </Form.Item>

                <Form.Item
                  name="publish_year"
                  label="Năm xuất bản"
                  style={{ width: "45%" }}
                >
                  <InputNumber
                    min={1900}
                    max={new Date().getFullYear()}
                    placeholder="Nhập năm xuất bản"
                    className="custom-input w-full"
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between border border-[#d9d9d9] p-4 rounded-md mt-4">
          <Form.Item
            name="category_id"
            label="Danh mục"
            // rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
            style={{ width: "30%" }}
          >
            <Select placeholder="Chọn danh mục">
              {categories.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="publisher_id"
            label="Nhà xuất bản"
            // rules={[{ required: true, message: "Vui lòng chọn nhà xuất bản!" }]}
            style={{ width: "30%" }}
          >
            <Select placeholder="Chọn nhà xuất bản">
              {publishers.map((publisher) => (
                <Select.Option key={publisher.id} value={publisher.id}>
                  {publisher.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="discount_id"
            label="Giảm giá"
            style={{ width: "30%" }}
          >
            <Select placeholder="Chọn mức giảm giá">
              {discounts.map((discount) => (
                <Select.Option key={discount.id} value={discount.id}>
                  {discount.code}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="flex flex-row justify-between border border-[#d9d9d9] p-4 rounded-md mt-4 ">
          <Form.Item label={t("Images")} style={{ width: "30%" }}>
            <div className="flex flex-col gap-2">
              <Button
                type="primary"
                onClick={handleOpenModal}
                className="w-full"
              >
                {t("Add image")}
              </Button>
              {uploadedImages.map((url, index) => (
                <div key={index} className="flex items-center justify-between">
                  <img
                    src={url}
                    alt={`Uploaded ${index}`}
                    className="w-16 h-16 object-cover"
                  />
                  <TrashIcon
                    onClick={() => handleRemoveImage(index)}
                    className="cursor-pointer text-red-500"
                  />
                </div>
              ))}
            </div>
          </Form.Item>

          <Form.Item name="size" label="Kích thước" style={{ width: "30%" }}>
            <Input
              placeholder="Nhập kích thước (ví dụ: 20x30cm)"
              className="custom-input"
            />
          </Form.Item>

          <Form.Item name="weight" label="Khối lượng" style={{ width: "30%" }}>
            <Input
              placeholder="Nhập khối lượng (ví dụ: 500g)"
              className="custom-input"
            />
          </Form.Item>
        </div>

        <p className="my-2 font-semibold text-lg">{t("SEO")}</p>

        <div className="flex flex-col p-4 border rounded-[10px] mb-4">
          <div className="flex flex-row w-full justify-between gap-10">
            <Form.Item
              name="meta_title"
              label={<p className="">{t("Meta Title")}</p>}
              className="w-1/2"
            >
              <Input className="custom-input" />
            </Form.Item>

            <Form.Item
              className="w-1/2"
              name="keywords"
              label={<p className="">{t("Meta Keywords")}</p>}
            >
              <Input className="custom-input" />
            </Form.Item>
          </div>

          <Form.Item
            name="meta_desc"
            className=""
            label={<p className="">{t("Meta Description")}</p>}
          >
            <Input.TextArea className="custom-input" rows={5} />
          </Form.Item>
        </div>
      </Form>
      <ModalSelectMedia
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelectMedia={handleSelectMedia}
      />
    </div>
  );
};

export default BookForm;
