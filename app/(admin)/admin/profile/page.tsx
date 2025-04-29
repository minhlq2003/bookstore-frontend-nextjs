"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Images } from "@/constant/images";
import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Radio,
  Switch,
  Upload,
  message,
  Space,
} from "antd";
import type { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import type { GetProp, UploadProps } from "antd";

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  VerticalAlignTopOutlined,
  EditOutlined,
} from "@ant-design/icons";

import {
  profileData,
  platformSettings,
  conversationsData,
  projectsData,
} from "./data";
import styles from "./profile.module.css";

type TBase64 = (img: File, callback: (url: string) => void) => void;

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUserData({
            ...profileData,
            name: parsedUser.name || profileData.name,
            email: parsedUser.email || profileData.email,
            avatar: parsedUser.avatar || profileData.avatar,
          });
        } catch (e) {
          console.error("Failed to parse user data from localStorage", e);
          setUserData(profileData);
        }
      } else {
        setUserData(profileData);
      }
    };

    fetchUserData();
  }, []);

  const getBase64: TBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload: UploadProps["beforeUpload"] = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Bạn chỉ có thể tải lên file JPG/PNG!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Ảnh phải nhỏ hơn 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleUploadChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as File, () => {
        setLoading(false);
        message.success(`${info.file.name} file uploaded successfully`);
      });
    } else if (info.file.status === "error") {
      setLoading(false);
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const pencil = [<EditOutlined key="edit" />];

  const uploadButton = (
    <div className="ant-upload-text font-semibold text-dark text-center">
      <VerticalAlignTopOutlined
        style={{ fontSize: 20, color: "#000", marginBottom: 8 }}
      />
      <div>Tải lên dự án mới</div>
    </div>
  );

  if (!userData) {
    return <div>Đang tải thông tin người dùng...</div>;
  }

  const iconStyle = { fontSize: "20px" };

  return (
    <>
      <div
        className={`${styles.profileNavBg}`}
        style={{ backgroundImage: `url("/images/bg-profile.png")` }}
      ></div>

      <Card
        className={`w-full ${styles.cardProfileHead}`}
        bodyStyle={{ display: "none" }}
        bordered={false}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Space align="center" size={20}>
                <Avatar
                  size={74}
                  shape="square"
                  src={userData.avatar || Images.profileAvatar}
                />
                <div className="avatar-info">
                  <h4 className="font-semibold m-0 text-lg">{userData.name}</h4>
                  <p className="text-gray-500">{userData.role}</p>
                </div>
              </Space>
            </Col>
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Radio.Group defaultValue="a">
                <Radio.Button value="a">TỔNG QUAN</Radio.Button>
                <Radio.Button value="b">NHÓM</Radio.Button>
                <Radio.Button value="c">DỰ ÁN</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 24]} className="pt-6">
        <Col span={24} md={8} className="mb-6">
          <Card
            bordered={false}
            className="header-solid h-full"
            title={<h6 className="font-semibold m-0">Cài đặt Nền tảng</h6>}
          >
            <List
              className={`${styles.settingsList}`}
              itemLayout="horizontal"
              dataSource={platformSettings}
              renderItem={(item) => (
                <List.Item>
                  {item.type === "header" ? (
                    <h6 className="list-header text-xs text-gray-500 uppercase font-bold tracking-wider m-0 pt-4 pb-2">
                      {item.label}
                    </h6>
                  ) : (
                    <div className="flex justify-between items-center w-full">
                      <span>{item.label}</span>
                      <Switch defaultChecked={item.checked} />
                    </div>
                  )}
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col span={24} md={8} className="mb-6">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Thông tin Hồ sơ</h6>}
            className="header-solid h-full card-profile-information"
            extra={<Button type="link" icon={pencil[0]} />}
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <p className="text-gray-600 mt-4">{userData.bio}</p>
            <hr className="my-6 border-t border-gray-200" />
            <Descriptions title={userData.name} column={1}>
              <Descriptions.Item label="Họ và Tên">
                {userData.fullName}
              </Descriptions.Item>
              <Descriptions.Item label="Điện thoại">
                {userData.mobile}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {userData.email}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">
                {userData.location}
              </Descriptions.Item>
              <Descriptions.Item label="Mạng xã hội">
                <Space size="large">
                  <a
                    href={userData.social.twitter || "#!"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-400"
                  >
                    <TwitterOutlined style={iconStyle} />
                  </a>
                  <a
                    href={userData.social.facebook || "#!"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-600"
                  >
                    <FacebookOutlined style={iconStyle} />
                  </a>
                  <a
                    href={userData.social.instagram || "#!"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-pink-500"
                  >
                    <InstagramOutlined style={iconStyle} />
                  </a>
                </Space>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col span={24} md={8} className="mb-6">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Cuộc hội thoại</h6>}
            className="header-solid h-full"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <List
              className={`conversations-list`}
              itemLayout="horizontal"
              dataSource={conversationsData}
              split={false}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button type="link" size="small" key={`reply-button-${item.title}`}>
                      TRẢ LỜI
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        shape="square"
                        size={48}
                        src={
                          typeof item.avatar === "string"
                            ? item.avatar
                            : item.avatar.src
                        }
                      />
                    }
                    title={
                      <span className="font-semibold text-sm">
                        {item.title}
                      </span>
                    }
                    description={
                      <span className="text-xs text-gray-500">
                        {item.description}
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Card
        bordered={false}
        className="header-solid mb-6"
        title={
          <>
            <h6 className="font-semibold m-0">Dự án</h6>
            <p className="text-sm text-gray-500 m-0">
              Các dự án đã tham gia hoặc tạo
            </p>
          </>
        }
      >
        <Row gutter={[24, 24]}>
          {projectsData.map((p, index) => (
            <Col span={24} md={12} xl={6} key={index}>
              <Card
                bordered={false}
                className={`${styles.cardProject} hover:shadow-lg transition-shadow duration-300`}
                cover={
                  <div className="relative h-48">
                    <Image
                      alt={p.title}
                      src={p.img}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-md"
                    />
                  </div>
                }
              >
                <div className="absolute top-4 right-4 bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded">
                  {p.titlesub}
                </div>
                <div className="p-4">
                  <h5 className="font-semibold text-base mb-1">{p.title}</h5>
                  <p className="text-gray-600 text-sm mb-4 h-16 overflow-hidden">
                    {p.description}
                  </p>
                  <Row gutter={[6, 0]} className="card-footer" align="middle">
                    <Col span={12}>
                      <Button type="default" size="small">
                        XEM DỰ ÁN
                      </Button>
                    </Col>
                    <Col span={12} className="text-right">
                      <Avatar.Group maxCount={3} size="small">
                        {p.members.map((memberAvatar, memberIndex) => (
                          <Avatar
                            key={memberIndex}
                            src={
                              typeof memberAvatar === "string"
                                ? memberAvatar
                                : memberAvatar.src
                            }
                          />
                        ))}
                      </Avatar.Group>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}

          <Col span={24} md={12} xl={6}>
            <Upload
              name="project_avatar"
              listType="picture-card"
              className={`avatar-uploader ${styles.projectsUploader}`}
              showUploadList={false}
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              beforeUpload={beforeUpload}
              onChange={handleUploadChange}
            >
              {imageUrl ? (
                <div className="relative w-full h-full">
                  <Image
                    src={imageUrl}
                    alt="project-upload"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              ) : (
                uploadButton
              )}
            </Upload>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ProfilePage;
