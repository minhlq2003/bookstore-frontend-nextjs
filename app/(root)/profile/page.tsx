"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
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
  FormInstance,
} from "antd";
import {
  UserOutlined,
  UploadOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  HomeOutlined,
  SaveOutlined,
  SelectOutlined,
} from "@ant-design/icons";
import { TrashIcon } from "lucide-react";
import { getToken } from "@/lib/HttpClient";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { useRouter } from "next/navigation";
import {
  changePassword,
  getProfile,
  uploadAvatar,
  addNewAddress,
  updateAddress,
  deleteAddress,
  updateUser,
} from "@/modules/services/userServices";
import { User, UserResponse, Address } from "@/constant/types";
import Media from "@/modules/media/pages/Media";
import MediaUpload from "@/modules/media/pages/AddNewMedia";

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
  const [form] = Form.useForm<Omit<Address, "id" | "user_id">>();

  useEffect(() => {
    if (initialValues && visible) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, visible, form]);

  const handleFormFinish = (values: Omit<Address, "id" | "user_id">) => {
    onFinish(values);
  };

  return (
    <Modal
      title={initialValues ? "Edit an existing address" : "Add a new address"}
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => form.submit()}
        >
          {initialValues ? "Edit" : "Add"}
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
          label="Recipient's name"
          rules={[{ required: true, message: "Please enter recipient name!" }]}
        >
          <Input placeholder="Nguyễn Văn A" />
        </Form.Item>
        <Form.Item
          name="receiver_phone"
          label="Recipient's phone number"
          rules={[
            {
              required: true,
              message: "Please enter recipient's phone number!",
            },
            {
              pattern: /^[0-9]{10,11}$/,
              message: "Invalid phone number!",
            },
          ]}
        >
          <Input placeholder="09xxxxxxxx" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Recipient's detailed address"
          rules={[{ required: true, message: "Please enter address!" }]}
        >
          <Input.TextArea
            rows={3}
            placeholder="House number, street name, ward, district, province/city"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const UserProfilePage = () => {
  const [profileForm] = Form.useForm();
  const { t } = useTranslation("common");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [avatarFile, setAvatarFile] = useState<RcFile | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const originalProfileRef = useRef<User | null>(null);

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addressLoading, setAddressLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChooseMedia, setIsChooseMedia] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<string>("");
  const [selectedMediaUrl, setSelectedMediaUrl] = useState<string | null>(null);
  const [newSelectedAvatarUrl, setNewSelectedAvatarUrl] = useState<
    string | null
  >(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectMedia = (mediaUrl: string) => {
    setNewSelectedAvatarUrl(mediaUrl);
    setAvatarPreview(mediaUrl);
    setIsModalOpen(false);
  };

  const fetchUserProfileAndAddresses = useCallback(async () => {
    setLoading(true);
    const token = getToken();
    if (!token) {
      message.error(t("Please login to view information."));
      router.push("/signin");
      return;
    }
    try {
      const response: UserResponse | null = await getProfile();

      if (response && response.user) {
        const fetchedUser = response.user as User;

        setUserProfile(fetchedUser);
        originalProfileRef.current = { ...fetchedUser };
        setAddresses(fetchedUser.addresses || []);

        profileForm.setFieldsValue({
          username: fetchedUser.username,
          email: fetchedUser.email,
          name: fetchedUser.name,
        });
        setAvatarPreview(fetchedUser.avatar);
        setNewSelectedAvatarUrl(fetchedUser.avatar);
      } else {
        message.error(t("No user information found or invalid data."));
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        router.push("/signin");
      }
    } catch (error: any) {
      console.error("Fetch profile error:", error);
      if (
        error.message?.includes("401") ||
        error.message?.includes("403") ||
        error.message?.toLowerCase().includes("token")
      ) {
        message.error(
          t("Your session has expired or is invalid. Please log in again.")
        );
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        router.push("/signin");
      } else {
        message.error(
          t(error.message) ||
            t("An error occurred while loading user information.")
        );
      }
    } finally {
      setLoading(false);
    }
  }, [profileForm, router, t]);

  useEffect(() => {
    fetchUserProfileAndAddresses();
  }, [fetchUserProfileAndAddresses]);

  const onProfileFinish = async (values: any) => {
    if (!userProfile || !originalProfileRef.current) return;

    setSaving(true);
    let hasChanges = false;
    let messages: string[] = [];

    const original = originalProfileRef.current;

    const profileInfoChanged =
      values.name !== original.name ||
      values.username !== original.username ||
      values.email !== original.email ||
      values.avatar != original.avatar;

    const avatarChanged =
      newSelectedAvatarUrl !== null && newSelectedAvatarUrl !== original.avatar;
    if (profileInfoChanged || avatarChanged) {
      try {
        const avatarToSend = avatarChanged ? newSelectedAvatarUrl : undefined;

        const updateResponse = await updateUser(
          Number(userProfile.id),
          values.username,
          values.name,
          values.email,
          avatarToSend
        );

        if (updateResponse && updateResponse.user) {
          messages.push("Profile information updated successfully!");
          if (profileInfoChanged)
            messages.push("Profile information updated successfully!");
          if (avatarChanged)
            messages.push("Profile image updated successfully!");
          hasChanges = true;
          const updatedUser = updateResponse.user as User;
          setUserProfile(updatedUser);
          originalProfileRef.current = { ...updatedUser };
          setAvatarPreview(updatedUser.avatar);
          setNewSelectedAvatarUrl(null);
          profileForm.setFieldsValue(updatedUser);
        } else {
          throw new Error(
            updateResponse?.message || "Failed to update profile information."
          );
        }
      } catch (error: any) {
        message.error(
          t(error.message) ||
            t("An error occurred while updating profile information.")
        );
      }
    }

    if (profileInfoChanged) {
      try {
        const updateResponse = await updateUser(
          Number(userProfile.id),
          values.username,
          values.name,
          values.email,
          values.avatar
        );
        if (updateResponse && updateResponse.user) {
          messages.push("Profile information updated successfully!");
          hasChanges = true;
          setUserProfile(updateResponse.user as User);
          originalProfileRef.current = updateResponse.user as User;
        } else {
          throw new Error(
            updateResponse?.message || "Failed to update profile information."
          );
        }
      } catch (error: any) {
        message.error(
          error.message ||
            "An error occurred while loading profile information."
        );
      }
    }

    if (values.newPassword) {
      if (!values.currentPassword) {
        message.error(
          t("Please enter your current password to change your password.")
        );
        setSaving(false);
        return;
      }
      try {
        await changePassword(
          Number(userProfile.id),
          values.currentPassword,
          values.newPassword
        );
        profileForm.setFieldsValue({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        messages.push("Password changed successfully!");
        hasChanges = true;
      } catch (error: any) {
        message.error(t(error.message) || t("Failed to change password."));
        console.error("Change password error:", error);
      }
    }

    // Hiển thị thông báo
    if (messages.length > 0) {
      message.success(messages.join(" "));
    } else if (
      !hasChanges &&
      !profileInfoChanged &&
      !avatarChanged &&
      !values.newPassword
    ) {
      message.info("No information has been changed.");
    }

    setSaving(false);
  };

  const handleCancelAvatarSelection = () => {
    setNewSelectedAvatarUrl(null);
    setAvatarPreview(originalProfileRef.current?.avatar || null);
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
        updateAddress(editingAddress.id, values);
        message.success("Address updated successfully!");
      } else {
        await addNewAddress(
          Number(userProfile.id),
          values.address,
          values.receiver_name,
          values.receiver_phone
        );
        message.success("New address added successfully!");
      }
      setIsAddressModalVisible(false);
      setEditingAddress(null);
      await fetchUserProfileAndAddresses();
    } catch (error: any) {
      message.error(
        t(error.message) ||
          t("An error occurred while saving address information.")
      );
    } finally {
      setAddressLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId: number) => {
    setAddressLoading(true);
    try {
      await deleteAddress(addressId);
      message.success("Address deleted successfully!");
      await fetchUserProfileAndAddresses();
    } catch (error: any) {
      message.error(
        t(error.message) || t("An error occurred while deleting the address.")
      );
    } finally {
      setAddressLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Spin size="large" />
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Unable to load user information.</p>
        <Button type="link" onClick={() => router.push("/signin")}>
          Please log in again
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Info Section */}
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md max-w-4xl mx-auto mb-8">
        <Title level={3} style={{ marginBottom: "24px", textAlign: "center" }}>
          {t("User Personal Information")}
        </Title>
        <Row gutter={[24, 24]} align="top">
          <Col
            xs={24}
            md={8}
            className="flex flex-col items-center text-center mb-6 md:mb-0"
          >
            <Avatar
              size={150}
              src={avatarPreview || userProfile.avatar || undefined}
              icon={!(avatarPreview || userProfile.avatar) && <UserOutlined />}
              className="mb-4 border-2 border-gray-200 shadow-sm"
            />
            <Button
              icon={<SelectOutlined />}
              onClick={handleOpenModal}
              className="mb-1"
            >
              {avatarPreview ? "Change your avatar" : "Select avatar"}
            </Button>
            {newSelectedAvatarUrl &&
              newSelectedAvatarUrl !== originalProfileRef.current?.avatar && (
                <Button
                  type="link"
                  danger
                  size="small"
                  onClick={handleCancelAvatarSelection}
                  icon={<TrashIcon size={14} className="mr-1" />}
                  style={{ fontSize: "12px", padding: "0 8px" }}
                  className="mt-1"
                >
                  {t("Cancel")}
                </Button>
              )}
            <p className="text-xs text-gray-500 mt-1">
              {t(
                "Choose from library or upload JPG/PNG/GIF file, must be less than 2MB"
              )}
            </p>

            {selectedMediaUrl && (
              <Button
                type="dashed"
                danger
                size="small"
                onClick={() => {
                  setSelectedMediaUrl(null);
                  setAvatarPreview(originalProfileRef.current?.avatar || null);
                }}
                icon={<TrashIcon size={14} />}
                className="mt-1"
                style={{ fontSize: "12px", padding: "0 8px" }}
              >
                {t("Cancel")}
              </Button>
            )}

            {userProfile.name && (
              <Title level={5} className="mt-4 mb-0">
                {userProfile.name}
              </Title>
            )}
            <p className="text-gray-600">{userProfile.email}</p>
            <button
              className="bg-[#1677FF] p-2 rounded-md mt-2"
              onClick={() => router.push("/orderhistory")}
            >
              View Order History
            </button>
          </Col>

          <Col xs={24} md={16}>
            <Form
              form={profileForm}
              name="profileForm"
              layout="vertical"
              onFinish={onProfileFinish}
              autoComplete="off"
              className="w-full"
            >
              <Title level={4} className="mb-4">
                {t("Account Information")}
              </Title>
              <Form.Item
                label="Display Name"
                name="name"
                rules={[
                  { required: true, message: "Please enter display name!" },
                ]}
              >
                <Input placeholder="Enter the name you want to display" />
              </Form.Item>
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Please enter username!" }]}
              >
                <Input placeholder="Enter your username" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Invalid email!" },
                ]}
              >
                <Input placeholder="Enter email address" />
              </Form.Item>

              <Divider />

              <Title level={4} className="mt-6 mb-4">
                {t("Change Password (Optional)")}
              </Title>
              <Form.Item
                label="Current Password"
                name="currentPassword"
                tooltip="Enter your current password if you want to set a new password."
              >
                <Input.Password placeholder="Leave blank if you do not want to change your password." />
              </Form.Item>
              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value && value.length < 6) {
                        return Promise.reject(
                          new Error(
                            "New password must be at least 6 characters."
                          )
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
                tooltip="New password must be at least 6 characters. You can leave it blank if you do not want to change your password."
              >
                <Input.Password placeholder="Leave blank if you do not want to change your password." />
              </Form.Item>
              <Form.Item
                name="confirmNewPassword"
                label="Confirm new password"
                dependencies={["newPassword"]}
                hasFeedback
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const newPassword = getFieldValue("newPassword");
                      if (!newPassword) {
                        return Promise.resolve();
                      }
                      if (!value) {
                        return Promise.reject(
                          new Error("Please confirm new password!")
                        );
                      }
                      if (newPassword === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Confirmation password does not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Re-enter new password" />
              </Form.Item>

              <Form.Item className="mt-6">
                <Button
                  onClick={() => {
                    onProfileFinish(profileForm.getFieldsValue());
                  }}
                  type="primary"
                  htmlType="submit"
                  loading={saving}
                  size="large"
                  icon={<SaveOutlined />}
                  block
                >
                  {t("Save Changes")}
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Title level={3} className="!mb-0">
            User's Address Book
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleShowAddAddressModal}
          >
            {t("Add a new address")}
          </Button>
        </div>
        {addressLoading && addresses.length === 0 && (
          <div className="text-center py-4">
            <Spin />
          </div>
        )}
        {!addressLoading && addresses.length === 0 && (
          <Text className="block text-center text-gray-500 py-4">
            You don't have any addresses yet. Add a new one!
          </Text>
        )}
        <List
          grid={{ gutter: 16, xs: 1, sm: 1, md: 2 }}
          dataSource={addresses}
          loading={addressLoading && addresses.length > 0}
          renderItem={(item) => (
            <List.Item>
              <Card
                size="small"
                variant="outlined"
                className="shadow-sm hover:shadow-md transition-shadow border rounded-md"
                actions={[
                  <Button
                    type="text"
                    key="edit"
                    icon={<EditOutlined />}
                    onClick={() => handleShowEditAddressModal(item)}
                  >
                    Edit
                  </Button>,
                  <Popconfirm
                    title="Delete this address?"
                    description="This action cannot be undone."
                    onConfirm={() => handleDeleteAddress(item.id)}
                    okText="Delete"
                    cancelText="Cancel"
                    placement="topRight"
                  >
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      key="delete"
                    >
                      Delete
                    </Button>
                  </Popconfirm>,
                ]}
              >
                <div className="font-semibold mb-1">
                  <HomeOutlined className="mr-2 text-gray-600" />{" "}
                  {item.receiver_name}
                </div>
                <p className="text-sm text-gray-700 mb-1 pl-5">
                  <span className="font-medium">Telephone number</span>{" "}
                  {item.receiver_phone}
                </p>
                <p className="text-sm text-gray-700 pl-5">
                  <span className="font-medium">Address</span> {item.address}
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
        initialValues={
          editingAddress
            ? {
                address: editingAddress.address,
                receiver_name: editingAddress.receiver_name,
                receiver_phone: editingAddress.receiver_phone,
              }
            : undefined
        }
        loading={addressLoading}
      />

      <Modal
        open={isModalOpen}
        title={<span className="ml-4">{t("Change your avatar")}</span>}
        onCancel={handleCloseModal}
        style={{ top: 20 }}
        width="90%"
        footer={null}
      >
        {/* <div className="ml-4 mt-5">
          <Button
            onClick={() => setIsChooseMedia(true)}
            className="mr-2"
            style={{
              backgroundColor: isChooseMedia ? "blue" : "initial",
              color: isChooseMedia ? "white" : "initial",
            }}
          >
            {t("Select Media")}
          </Button>
          <Button
            onClick={() => setIsChooseMedia(false)}
            style={{
              backgroundColor: !isChooseMedia ? "blue" : "initial",
              color: !isChooseMedia ? "white" : "initial",
            }}
          >
            {t("Upload Media")}
          </Button>
        </div> */}

        <div>
          {/* { isChooseMedia ? (
            <Media isOpenModal={ true } onSelectMedia={ handleSelectMedia } />
          ) : (
            <MediaUpload isOpenModal={ true } setChooseMedia={ setIsChooseMedia } />
          ) } */}

          {isChooseMedia && (
            <MediaUpload isOpenModal={true} setChooseMedia={setIsChooseMedia} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default UserProfilePage;
