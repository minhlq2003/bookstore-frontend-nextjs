"use client";

import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Spin,
  Avatar,
  Upload,
  Row,
  Col,
} from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { getToken } from "@/lib/HttpClient";
import { useRouter } from "next/navigation";
import { UserProfile } from "@/constant/types";
import { userServices } from "@/modules/services/userServices";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

const AdminProfilePage = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [avatarFile, setAvatarFile] = useState<RcFile | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      if (!getToken()) {
        message.error("Vui lòng đăng nhập để xem thông tin cá nhân.");
        router.push("/signin");
        setLoading(false);
        return;
      }

      try {
        const response = await userServices.getProfile();
        if (response.user) {
          const fetchedUser = response.user;
          let firstName = "";
          let lastName = "";
          if (fetchedUser.name) {
            const nameParts = fetchedUser.name.split(" ");
            if (nameParts.length > 1) {
              lastName = nameParts.pop() || "";
              firstName = nameParts.join(" ");
            } else {
              firstName = fetchedUser.name;
            }
          }

          const profileData: UserProfile = {
            ...fetchedUser,
            firstName: (fetchedUser as any).firstName || firstName,
            lastName: (fetchedUser as any).lastName || lastName,
          };

          setUserProfile(profileData);
          form.setFieldsValue({
            username: profileData.username,
            email: profileData.email,
          });
          if (profileData.avatar) {
            setAvatarPreview(profileData.avatar);
          }
        } else {
          message.error("Không tìm thấy thông tin người dùng.");
        }
      } catch (error: any) {
        if (error.message.includes("Token không tồn tại") || error.message.includes("401") || error.message.includes("403")) {
          message.error("Phiên đăng nhập hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          router.push("/signin");
        } else {
          message.error(error.message || "Có lỗi xảy ra khi tải thông tin người dùng.");
        }
        console.error("Fetch profile error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [form, router]);

  const handleAvatarChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.originFileObj) {
      const file = info.file.originFileObj as RcFile;
      const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("Bạn chỉ có thể tải lên file JPG/PNG!");
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Hình ảnh phải nhỏ hơn 2MB!");
        return;
      }
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setAvatarPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onFinish = async (values: any) => {
    if (!userProfile) return;
    setSaving(true);
    let profileUpdatedSuccessfully = false;

    try {
      if (values.newPassword) {
        if (!values.currentPassword) {
          message.error("Vui lòng nhập mật khẩu hiện tại để thay đổi mật khẩu mới.");
          setSaving(false);
          return;
        }
        try {
          await userServices.changePassword({
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
          });
          form.setFieldsValue({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
          message.success("Đổi mật khẩu thành công!");
          profileUpdatedSuccessfully = true;
        } catch (error: any) {
          message.error(error.message || "Đổi mật khẩu thất bại.");
          console.error("Change password error:", error);
        }
      }

      if (avatarFile) {
        try {
          const uploadResponse = await userServices.uploadAvatar(userProfile.id, avatarFile);
          if (uploadResponse.attachment && uploadResponse.attachment.fileUrl) {
            setAvatarPreview(uploadResponse.attachment.fileUrl);
            setUserProfile(prev => ({ ...prev!, avatar: uploadResponse.attachment.fileUrl }));
            setAvatarFile(null);
            message.success("Cập nhật ảnh đại diện thành công!");
            profileUpdatedSuccessfully = true;
          } else if (uploadResponse.avatarUrl) {
            setAvatarPreview(uploadResponse.avatarUrl);
            setUserProfile(prev => ({ ...prev!, avatar: uploadResponse.avatarUrl }));
            setAvatarFile(null);
            message.success("Cập nhật ảnh đại diện thành công!");
            profileUpdatedSuccessfully = true;
          }
          else {
            message.error(uploadResponse.message || "Upload ảnh đại diện thành công nhưng không nhận được URL mới.");
          }
        } catch (error: any) {
          message.error(error.message || "Upload ảnh đại diện thất bại.");
          console.error("Upload avatar error:", error);
        }
      }

      if (profileUpdatedSuccessfully) {
      } else if (!values.newPassword && !avatarFile) {
        message.info("Không có thông tin nào được thay đổi.");
      }

    } catch (error: any) {
      message.error(error.message || "Có lỗi không mong muốn xảy ra khi cập nhật hồ sơ.");
      console.error("Update profile general error:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <Spin size="large" />
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        Không thể tải thông tin người dùng hoặc bạn chưa đăng nhập.
        Vui lòng <a href="/signin" className="text-blue-600 hover:underline">đăng nhập</a> lại.
      </div>
    );
  }

  const uploadProps = {
    name: "avatarFile",
    showUploadList: false,
    beforeUpload: () => false,
    onChange: handleAvatarChange,
    accept: "image/png, image/jpeg, image/gif",
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Title level={3} style={{ marginBottom: "24px" }}>
        Hồ Sơ Của Tôi
      </Title>
      <Row gutter={24}>
        <Col xs={24} md={8} className="flex flex-col items-center mb-6 md:mb-0">
          <Avatar
            size={150}
            src={avatarPreview}
            icon={!avatarPreview && <UserOutlined />}
            className="mb-4 border"
          />
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Chọn Ảnh Đại Diện</Button>
          </Upload>
          <p className="text-xs text-gray-500 mt-1">JPG/PNG, nhỏ hơn 2MB</p>

          {(userProfile.firstName || userProfile.lastName) && (
            <Title level={5} className="mt-4 mb-0">{`${userProfile.firstName || ''} ${userProfile.lastName || ''}`.trim()}</Title>
          )}
          {!userProfile.firstName && !userProfile.lastName && userProfile.name && (
            <Title level={5} className="mt-4 mb-0">{userProfile.name}</Title>
          )}
          <p className="text-gray-600">{userProfile.email}</p>
        </Col>
        <Col xs={24} md={16}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              username: userProfile.username,
              email: userProfile.email,
              firstName: userProfile.firstName,
              lastName: userProfile.lastName,
            }}
          >
            <Title level={4} className="mb-4">Thông tin tài khoản</Title>
            <Form.Item label="Tên người dùng" name="username">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input disabled />
            </Form.Item>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Tên"
                  name="firstName"
                  rules={[{ message: "Vui lòng nhập tên của bạn!" }]}
                >
                  <Input placeholder="Tên" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Họ"
                  name="lastName"
                  rules={[{ message: "Vui lòng nhập họ của bạn!" }]}
                >
                  <Input placeholder="Họ" />
                </Form.Item>
              </Col>
            </Row>
            <Title level={4} className="mt-6 mb-4">Thay đổi mật khẩu</Title>
            <Form.Item
              label="Mật khẩu hiện tại"
              name="currentPassword"
              tooltip="Bỏ trống nếu không muốn thay đổi mật khẩu. Cần thiết nếu bạn muốn đặt mật khẩu mới."
            >
              <Input.Password placeholder="Mật khẩu hiện tại" />
            </Form.Item>
            <Form.Item
              label="Mật khẩu mới"
              name="newPassword"
              rules={[
                {
                  min: 6,
                  message: "Mật khẩu mới phải có ít nhất 6 ký tự.",
                },
              ]}
              tooltip="Bỏ trống nếu không muốn thay đổi mật khẩu."
            >
              <Input.Password placeholder="Mật khẩu mới (ít nhất 6 ký tự)" />
            </Form.Item>
            <Form.Item
              name="confirmNewPassword"
              label="Xác nhận mật khẩu mới"
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu xác nhận không khớp!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Xác nhận mật khẩu mới" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={saving} size="large" block>
                Cập nhật hồ sơ
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default AdminProfilePage;
