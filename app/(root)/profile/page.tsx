"use client";

import React, { useEffect, useState, useCallback } from "react";
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
  Typography,
  Modal,
  List,
  Popconfirm,
  Card,
  Divider,
} from "antd";
import {
  UserOutlined,
  UploadOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { getToken } from "@/lib/HttpClient";
import { useRouter } from "next/navigation";
import { userServices } from "@/modules/services/userServices";
import { Address, UserProfile } from "@/constant/types";
const { Title, Text } = Typography;

interface AddressFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onFinish: (values: Omit<Address, "id" | "user_id">) => void;
  initialValues?: Partial<Address>;
  loading: boolean;
}

const AddressFormModal: React.FC<AddressFormModalProps> = ({
  visible,
  onCancel,
  onFinish,
  initialValues,
  loading,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues && visible) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, visible, form]);

  const handleFormFinish = (values: Omit<Address, "id" | "user_id">) => {
    onFinish(values);
    // form.resetFields();
  };

  return (
    <Modal
      title={initialValues ? "Cập nhật địa chỉ" : "Thêm địa chỉ mới"}
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel} disabled={loading}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => form.submit()}
        >
          {initialValues ? "Cập nhật" : "Thêm mới"}
        </Button>,
      ]}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormFinish}
        initialValues={initialValues || {}}
      >
        <Form.Item
          name="receiver_name"
          label="Tên người nhận"
          rules={[{ required: true, message: "Vui lòng nhập tên người nhận!" }]}
        >
          <Input placeholder="Nguyễn Văn A" />
        </Form.Item>
        <Form.Item
          name="receiver_phone"
          label="Số điện thoại"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            {
              pattern: /^[0-9]{10,11}$/,
              message: "Số điện thoại không hợp lệ!",
            },
          ]}
        >
          <Input placeholder="09xxxxxxxx" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Địa chỉ chi tiết"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
        >
          <Input.TextArea
            rows={3}
            placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const UserProfilePage = () => {
  const [profileForm] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [avatarFile, setAvatarFile] = useState<RcFile | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addressLoading, setAddressLoading] = useState(false);

  const fetchUserProfileAndAddresses = useCallback(async () => {
    setLoading(true);
    const token = getToken();
    if (!token) {
      message.error("Vui lòng đăng nhập để xem thông tin.");
      router.push("/signin");
      setLoading(false);
      return;
    }
    try {
      const response = await userServices.getProfile();
      if (response.user) {
        const fetchedUser = response.user as any;
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
          id: fetchedUser.id,
          username: fetchedUser.username,
          email: fetchedUser.email,
          name: fetchedUser.name,
          avatar: fetchedUser.avatar,
          firstName: (fetchedUser as any).firstName || firstName,
          lastName: (fetchedUser as any).lastName || lastName,
          addresses: fetchedUser.addresses || [],
        };

        setUserProfile(profileData);
        setAddresses(profileData.addresses);
        profileForm.setFieldsValue({
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
      if (
        error.message.includes("Token không tồn tại") ||
        error.message.includes("401") ||
        error.message.includes("403")
      ) {
        message.error(
          "Phiên đăng nhập hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại."
        );
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        router.push("/signin");
      } else {
        message.error(
          error.message || "Có lỗi xảy ra khi tải thông tin người dùng."
        );
      }
    } finally {
      setLoading(false);
    }
  }, [profileForm, router]);

  useEffect(() => {
    fetchUserProfileAndAddresses();
  }, [fetchUserProfileAndAddresses]);

  const handleAvatarChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.originFileObj) {
      const file = info.file.originFileObj as RcFile;
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
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

  const onProfileFinish = async (values: any) => {
    if (!userProfile) return;
    setSaving(true);
    let profileUpdatedSuccessfully = false;

    try {
      if (values.newPassword) {
        if (values.newPassword) {
          if (!values.currentPassword) {
            message.error(
              "Vui lòng nhập mật khẩu hiện tại để thay đổi mật khẩu mới."
            );
            setSaving(false);
            return;
          }
          try {
            await userServices.changePassword({
              currentPassword: values.currentPassword,
              newPassword: values.newPassword,
            });
            profileForm.setFieldsValue({
              currentPassword: "",
              newPassword: "",
              confirmNewPassword: "",
            });
            message.success("Đổi mật khẩu thành công!");
            profileUpdatedSuccessfully = true;
          } catch (error: any) {
            message.error(error.message || "Đổi mật khẩu thất bại.");
            console.error("Change password error:", error);
          }
        }
      }

      if (avatarFile) {
        const uploadResponse = await userServices.uploadAvatar(
          userProfile.id,
          avatarFile
        );
        if (uploadResponse.attachment && uploadResponse.attachment.fileUrl) {
          setAvatarPreview(uploadResponse.attachment.fileUrl);
          setUserProfile((prev) => ({
            ...prev!,
            avatar: uploadResponse.attachment.fileUrl,
          }));
          setAvatarFile(null);
          message.success("Cập nhật ảnh đại diện thành công!");
          profileUpdatedSuccessfully = true;
        } else if (uploadResponse.avatarUrl) {
          setAvatarPreview(uploadResponse.avatarUrl);
          setUserProfile((prev) => ({
            ...prev!,
            avatar: uploadResponse.avatarUrl,
          }));
          setAvatarFile(null);
          message.success("Cập nhật ảnh đại diện thành công!");
          profileUpdatedSuccessfully = true;
        } else {
          message.error(
            uploadResponse.message ||
            "Upload ảnh đại diện thành công nhưng không nhận được URL mới."
          );
        }
      }

      if (profileUpdatedSuccessfully) {
      } else if (!values.newPassword && !avatarFile) {
        message.info("Không có thông tin cá nhân nào được thay đổi.");
      }
    } catch (error: any) {
      message.error(error.message || "Lỗi cập nhật thông tin cá nhân.");
    } finally {
      setSaving(false);
    }
  };

  const handleShowAddAddressModal = () => {
    setEditingAddress(null);
    setIsAddressModalVisible(true);
  };

  const handleShowEditAddressModal = (address: Address) => {
    setEditingAddress(address);
    setIsAddressModalVisible(true);
  };

  const handleAddressModalCancel = () => {
    setIsAddressModalVisible(false);
    setEditingAddress(null);
  };

  const handleAddressFormFinish = async (
    values: Omit<Address, "id" | "user_id">
  ) => {
    if (!userProfile) return;
    setAddressLoading(true);
    try {
      if (editingAddress) {
        const response = await userServices.updateAddress(editingAddress.id, {
          ...values,
        });
        message.success("Cập nhật địa chỉ thành công!");
      } else {
        const response = await userServices.addAddress({
          address: values.address,
          receiverName: values.receiver_name,
          receiverPhone: values.receiver_phone,
          userId: userProfile.id,
        });
        message.success("Thêm địa chỉ mới thành công!");
      }
      await fetchUserProfileAndAddresses();
      setIsAddressModalVisible(false);
      setEditingAddress(null);
    } catch (error: any) {
      message.error(error.message || "Có lỗi xảy ra với thông tin địa chỉ.");
    } finally {
      setAddressLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId: number) => {
    setAddressLoading(true);
    try {
      await userServices.deleteAddress(addressId);
      message.success("Xóa địa chỉ thành công!");
      await fetchUserProfileAndAddresses();
    } catch (error: any) {
      message.error(error.message || "Lỗi khi xóa địa chỉ.");
    } finally {
      setAddressLoading(false);
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
        Không thể tải thông tin. Vui lòng{" "}
        <a href="/signin" className="text-blue-600 hover:underline">
          đăng nhập
        </a>
        .
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
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md max-w-4xl mx-auto mb-8">
        <Title level={3} style={{ marginBottom: "24px", textAlign: "center" }}>
          Thông Tin Cá Nhân
        </Title>
        <Row gutter={[24, 24]}>
          <Col
            xs={24}
            md={8}
            className="flex flex-col items-center text-center mb-6 md:mb-0"
          >
            <Avatar
              size={150}
              src={avatarPreview || undefined}
              icon={!avatarPreview && <UserOutlined />}
              className="mb-4 border-2 border-gray-200 shadow-sm"
            />
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Chọn Ảnh Đại Diện</Button>
            </Upload>
            <p className="text-xs text-gray-500 mt-1">
              JPG/PNG/GIF, <br className="md:hidden" /> nhỏ hơn 2MB
            </p>

            {(userProfile.firstName || userProfile.lastName) && (
              <Title level={5} className="mt-4 mb-0">
                {`${userProfile.firstName || ""} ${userProfile.lastName || ""
                  }`.trim()}
              </Title>
            )}
            {!userProfile.firstName &&
              !userProfile.lastName &&
              userProfile.name && (
                <Title level={5} className="mt-4 mb-0">
                  {userProfile.name}
                </Title>
              )}
            <p className="text-gray-600">{userProfile.email}</p>
          </Col>
          <Col xs={24} md={16}>
            <Form
              form={profileForm}
              layout="vertical"
              onFinish={onProfileFinish}
              initialValues={{
                username: userProfile.username,
                email: userProfile.email,
              }}
            >
              <Title level={4} className="mb-4">
                Thông tin tài khoản
              </Title>
              <Form.Item label="Tên người dùng" name="username">
                <Input readOnly className="bg-gray-100" />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input readOnly className="bg-gray-100" />
              </Form.Item>

              <Title level={4} className="mt-6 mb-4">
                Thay đổi mật khẩu
              </Title>
              <Form.Item
                label="Mật khẩu hiện tại"
                name="currentPassword"
                tooltip="Cần thiết nếu bạn muốn đặt mật khẩu mới."
              >
                <Input.Password placeholder="Mật khẩu hiện tại" />
              </Form.Item>
              <Form.Item
                label="Mật khẩu mới"
                name="newPassword"
                rules={[
                  { min: 6, message: "Mật khẩu mới phải có ít nhất 6 ký tự." },
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
                      if (
                        !getFieldValue("newPassword") ||
                        !value ||
                        getFieldValue("newPassword") === value
                      ) {
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

              <Form.Item className="mt-6">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={saving}
                  size="large"
                  block
                >
                  Lưu Thay Đổi
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Title level={3} className="!mb-0">
            Sổ Địa Chỉ
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleShowAddAddressModal}
          >
            Thêm địa chỉ mới
          </Button>
        </div>
        {addressLoading && addresses.length === 0 && (
          <div className="text-center py-4">
            <Spin />
          </div>
        )}
        {!addressLoading && addresses.length === 0 && (
          <Text className="block text-center text-gray-500">
            Bạn chưa có địa chỉ nào. Hãy thêm địa chỉ mới!
          </Text>
        )}
        <List
          grid={{ gutter: 16, xs: 1, sm: 1, md: 2 }}
          dataSource={addresses}
          renderItem={(item) => (
            <List.Item>
              <Card
                title={
                  <>
                    <HomeOutlined className="mr-2" /> {item.receiver_name}
                  </>
                }
                bordered
                className="shadow-sm hover:shadow-md transition-shadow"
                actions={[
                  <Button
                    type="link"
                    icon={<EditOutlined />}
                    key="edit"
                    onClick={() => handleShowEditAddressModal(item)}
                  >
                    Sửa
                  </Button>,
                  <Popconfirm
                    title="Xóa địa chỉ này?"
                    description="Bạn có chắc muốn xóa địa chỉ này không?"
                    onConfirm={() => handleDeleteAddress(item.id)}
                    okText="Xóa"
                    cancelText="Hủy"
                    placement="topRight"
                  >
                    <Button
                      type="link"
                      danger
                      icon={<DeleteOutlined />}
                      key="delete"
                    >
                      Xóa
                    </Button>
                  </Popconfirm>,
                ]}
              >
                <p>
                  <strong>Người nhận:</strong> {item.receiver_name}
                </p>
                <p>
                  <strong>Điện thoại:</strong> {item.receiver_phone}
                </p>
                <p>
                  <strong>Địa chỉ:</strong> {item.address}
                </p>
              </Card>
            </List.Item>
          )}
        />
      </div>

      <AddressFormModal
        visible={isAddressModalVisible}
        onCancel={handleAddressModalCancel}
        onFinish={handleAddressFormFinish}
        initialValues={editingAddress || undefined}
        loading={addressLoading}
      />
    </div>
  );
};

export default UserProfilePage;
