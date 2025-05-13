"use client";

import { Post } from "@/constant/types";
import { CameraOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance, Input, Modal } from "antd";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ModalSelectMedia from "../media/pages/ModalSelectMedia";

const CKEditorComponent = dynamic(() => import("../../lib/ckeditor"), {
  ssr: false,
});

const removeAccents = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[âÂ]/g, "a")
    .replace(/[êÊ]/g, "e")
    .replace(/[.,:"'<>?`!@#$%^&*();/\\]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
};

const isValidJson = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

export interface PostFormProps {
  form: FormInstance;
  onFinish: (values: Post) => void;
  uploadedImages: string;
  setUploadedImages: React.Dispatch<React.SetStateAction<string>>;
}
const PostForm: React.FC<PostFormProps> = ({
  form,
  onFinish,
  uploadedImages,
  setUploadedImages,
}) => {
  const { t } = useTranslation("common");
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ isEditableSlug, setIsEditableSlug ] = useState(true);

  const handleSubmit = () => {
    const formData = form.getFieldsValue();
    onFinish(formData);
  };

  const handleOpenModal = (modalMetaImage: boolean) => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectMedia = (media: string) => {
    setIsModalOpen(false);
    setUploadedImages(media);
    console.log("add", media);
    console.log("upload images: ", uploadedImages);
  };

  const handleNameBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const nameValue = e.target.value.trim();
    if (!nameValue) {
      form.setFields([ { name: "slug", errors: [] } ]);
      return;
    }

    const slugValue = removeAccents(nameValue);

    form.setFieldsValue({ slug: slugValue });
    form.setFields([ { name: "slug", errors: [] } ]);
  };

  return (
    <Form
      form={ form }
      className="flex flex-col w-[77%]"
      name="basic"
      initialValues={ { remember: true } }
      onFinish={ handleSubmit }
      autoComplete="off"
      layout="vertical"
    >
      <div className="border border-[#d9d9d9] p-4 rounded-md mb-4">
        <Form.Item
          name="title"
          label={ t("Title") }
          rules={ [ { required: true, message: t("Please enter article name!") } ] }
          className="mt-4"
        >
          <Input
            placeholder={ t("Title") }
            className="custom-input"
            onBlur={ handleNameBlur }
          />
        </Form.Item>
        <div className="flex w-full">
          <Form.Item
            className="w-1/2 mr-4"
            name="slug"
            label={ t("Slug") }
            extra={
              <span className="text-sm">
                { t("May not need to be entered (automatically render by name)") }
              </span>
            }
          >
            <Input
              disabled={ isEditableSlug }
              placeholder={ t("slug") }
              className="custom-input"
            />
          </Form.Item>
          <Button
            className="self-center mb-2"
            icon={ <EditOutlined /> }
            color={ !isEditableSlug ? "primary" : "default" }
            variant="outlined"
            onClick={ () => setIsEditableSlug(!isEditableSlug) }
          >
            { t("Edit") }
          </Button>
        </div>
        <Form.Item>
          <Button
            icon={ <CameraOutlined /> }
            onClick={ () => handleOpenModal(false) }
          >
            { t("Add media to content") }
          </Button>
        </Form.Item>

        <Form.Item name="content">
          <div className="">
            <CKEditorComponent
              value={ form.getFieldValue("content") }
              onChange={ (data: string) => {
                form.setFieldsValue({ content: data });
              } }
            />
          </div>
        </Form.Item>

        <Form.Item name="excerpt" label={ t("Excerpt") }>
          <Input className="custom-input" />
        </Form.Item>
      </div>

      {/* <span className="text-base font-medium pt-2 pb-2">{t("SEO")}</span> */ }

      {/* <div className="grid grid-cols-2 gap-x-5 gap-y-2 p-5 border rounded-[10px]">
        <Form.Item
          name="metaTitle"
          label={
            <span className="text-base font-medium p">{t("Meta Title")}</span>
          }
        >
          <Input className="custom-input py-2" />
        </Form.Item>

        <Form.Item
          name="keywords"
          label={
            <span className="text-base font-medium">{t("Meta Keywords")}</span>
          }
        >
          <Input className="custom-input py-2" />
        </Form.Item>

        <Form.Item
          name="metaDescription"
          label={
            <span className="text-base font-medium">
              {t("Meta Description")}
            </span>
          }
        >
          <Input.TextArea className="custom-input py-2" rows={5} />
        </Form.Item>

        <Form.Item
          name="structuredData"
          label={
            <span className="text-base font-medium">
              {t("Structured Data")}
            </span>
          }
          rules={[
            {
              validator: (_, value) => {
                if (value && !isValidJson(value)) {
                  return Promise.reject(new Error(t("Invalid JSON format!")));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.TextArea
            className="custom-input py-2"
            rows={5}
            placeholder={t('@example: {"id": "string"}')}
          />
        </Form.Item>

        <Form.Item
          name="metaRobots"
          label={
            <span className="text-base font-medium">{t("Meta Robots")}</span>
          }
        >
          <Input className="custom-input py-2" />
        </Form.Item>

        <Form.Item
          name="metaViewport"
          label={
            <span className="text-base font-medium">{t("Meta Viewport")}</span>
          }
        >
          <Input className="custom-input py-2" />
        </Form.Item>
      </div> */}

      <ModalSelectMedia
        isOpen={ isModalOpen }
        onClose={ handleCloseModal }
        onSelectMedia={ handleSelectMedia }
      />
    </Form>
  );
};

export default PostForm;
