"use client";

import { UploadOutlined } from "@ant-design/icons";
import { Button, Image, List, message, Spin, Upload, UploadFile } from "antd";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { addMedia } from "../services/apiServices";
import { MediaData } from "@/constant/types";
import { useTranslation } from "react-i18next";

interface MediaUploadProps {
  isOpenModal?: boolean;
  setChooseMedia?: (value: boolean) => void;
}

const { Dragger } = Upload;

const MediaUpload: React.FC<MediaUploadProps> = ({
  isOpenModal,
  setChooseMedia,
}) => {
  const { t } = useTranslation("common");
  const [uploadedFiles, setUploadedFiles] = useState<MediaData[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUploadChange = async (info: { fileList: UploadFile[] }) => {
    setLoading(true);
    setFileList(info.fileList);

    const formData = new FormData();

    info.fileList.forEach((file) => {
      formData.append("files", file.originFileObj as Blob);
    });

    try {
      const response: MediaData[] = await addMedia(formData);
      if (setChooseMedia) {
        setChooseMedia(true);
      }
      setUploadedFiles((prev) => [...prev, ...response]);
      setFileList([]);

      message.success(t("Media uploaded successfully!"));
    } catch {
      message.error(t("Failed to upload media."));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (file: MediaData) => {
    router.push(`/admin/upload/edit?id=${file.id}`);
  };

  return (
    <div
      className="ml-4 h-[790px]"
      style={{ marginTop: isOpenModal ? "20px" : "0px" }}
    >
      {isOpenModal || (
        <div className="flex w-full mb-5 mt-4">
          <Title level={2}>{t("Upload New Media")}</Title>
          <Button
            onClick={() => router.push(`/admin/upload`)}
            className="ml-5 mt-1 bg-white text-blue-700 px-3 py-1 border-[1px] border-blue-700 rounded-[3px] hover:bg-blue-800 hover:text-white duration-300"
          >
            {t("Back to Library")}
          </Button>
        </div>
      )}

      <div style={{ height: isOpenModal ? "700px" : "200px" }}>
        {loading ? (
          <div
            className="h-full"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spin tip={t("Uploading...")} />
          </div>
        ) : (
          <Dragger
            multiple
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false}
            className="border-dashed border- border-gray-300 rounded-lg "
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">
              {t("Click or drag file to this area to upload")}
            </p>
            <p className="ant-upload-hint">
              {t("Support for a single or bulk upload.")}
            </p>
          </Dragger>
        )}
      </div>

      <div className="mt-10">
        {uploadedFiles.length > 0 && (
          <List
            bordered
            dataSource={uploadedFiles}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    key="edit"
                    type="link"
                    onClick={() => handleEdit(item)}
                  >
                    {t("Edit")}
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Image width={50} src={`${item.url}`} alt={item.name} />
                  }
                  title={item.name}
                />
              </List.Item>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default MediaUpload;
