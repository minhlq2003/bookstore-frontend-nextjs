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
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  HomeOutlined,
  SaveOutlined,
  SelectOutlined,
  EyeOutlined,
  EyeInvisibleOutlined
} from "@ant-design/icons";
import { getToken } from "@/lib/HttpClient";
import { useRouter } from "next/navigation";
import {
  changePassword,
  getProfile,
  addNewAddress,
  updateAddress,
  deleteAddress,
  updateUser,
} from "@/modules/services/userServices";
import { User, Address, UserResponse } from "@/constant/types";
import Media from "@/modules/media/pages/Media";
import AddNewMedia from "@/modules/media/pages/AddNewMedia";
import { TrashIcon } from "lucide-react";

const { Title, Text } = Typography;

interface ModalSelectMediaProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMedia: (mediaUrl: string) => void;
}

const ModalSelectMedia: React.FC<ModalSelectMediaProps> = ({ isOpen, onClose, onSelectMedia }) => {
  const { t } = useTranslation("common");
  const [ isChooseMedia, setIsChooseMedia ] = useState(true);

  return (
    <Modal
      open={ isOpen }
      title={ <span className="ml-4">{ t("Change your avatar") }</span> }
      onCancel={ onClose }
      style={ { top: 20 } }
      width="95%"
      footer={ null }
    >
      <div className="ml-4 mt-5">
        <Button
          onClick={ () => setIsChooseMedia(true) }
          className="mr-2"
          type={ isChooseMedia ? "primary" : "default" }
        >
          { t("Select Media") }
        </Button>
        <Button
          onClick={ () => setIsChooseMedia(false) }
          type={ !isChooseMedia ? "primary" : "default" }
        >
          { t("Upload Media") }
        </Button>
      </div>
      <div>
        { isChooseMedia ? (
          <Media isOpenModal={ true } onSelectMedia={ onSelectMedia } />
        ) : (
          <AddNewMedia
            isOpenModal={ true }
            setChooseMedia={ (value) => {
              setIsChooseMedia(value);
            } }
          />
        ) }
      </div>
    </Modal>
  );
};


const AdminProfilePage = () => {
  const [ profileForm ] = Form.useForm();
  const [ addressForm ] = Form.useForm<Omit<Address, "id" | "user_id">>();
  const { t } = useTranslation("common");
  const router = useRouter();

  const [ loading, setLoading ] = useState(true);
  const [ saving, setSaving ] = useState(false);
  const [ adminProfile, setAdminProfile ] = useState<User | null>(null);
  const [ avatarPreview, setAvatarPreview ] = useState<string | null>(null);
  const originalProfileRef = useRef<User | null>(null);

  const [ isAvatarModalOpen, setIsAvatarModalOpen ] = useState(false);
  const [ newSelectedAvatarUrl, setNewSelectedAvatarUrl ] = useState<string | null>(null);


  const fetchAdminProfile = useCallback(async () => {
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
        setAdminProfile(fetchedUser);
        originalProfileRef.current = { ...fetchedUser };

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
          t(error.message) || t("An error occurred while loading user information.")
        );
      }
    } finally {
      setLoading(false);
    }
  }, [ profileForm, router, t ]);

  useEffect(() => {
    fetchAdminProfile();
  }, [ fetchAdminProfile ]);


  const onAdminProfileFinish = async (values: any) => {
    if (!adminProfile || !originalProfileRef.current) return;

    setSaving(true);
    let hasChanges = false;
    const successMessages: string[] = [];

    const original = originalProfileRef.current;

    const profileInfoChanged =
      values.name !== original.name ||
      values.username !== original.username ||
      values.email !== original.email;

    const avatarChanged = newSelectedAvatarUrl !== null && newSelectedAvatarUrl !== original.avatar;

    if (profileInfoChanged || avatarChanged) {
      try {
        const avatarToSend = avatarChanged ? newSelectedAvatarUrl : original.avatar;
        const updateResponse = await updateUser(
          Number(adminProfile.id),
          values.username,
          values.name,
          values.email,
          avatarToSend
        );

        if (updateResponse && updateResponse.data) {
          const updatedUser = updateResponse.data as User;
          setAdminProfile(updatedUser);
          originalProfileRef.current = { ...updatedUser };
          profileForm.setFieldsValue({
            username: updatedUser.username,
            email: updatedUser.email,
            name: updatedUser.name,
          });
          setAvatarPreview(updatedUser.avatar);
          if (avatarChanged) setNewSelectedAvatarUrl(updatedUser.avatar);

          if (profileInfoChanged) successMessages.push(t("Profile information updated successfully!"));
          if (avatarChanged) successMessages.push(t("Profile image updated successfully!"));
          hasChanges = true;
        } else {
          throw new Error((updateResponse as any)?.message || t("Failed to update profile information."));
        }
      } catch (error: any) {
        message.error(t(error.message) || t("An error occurred while updating profile information."));
      }
    }

    if (values.newPassword) {
      if (!values.currentPassword) {
        message.error(t("Please enter your current password to change your password."));
        setSaving(false);
        return;
      }
      try {
        await changePassword(
          Number(adminProfile.id),
          values.currentPassword,
          values.newPassword
        );
        profileForm.setFieldsValue({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        successMessages.push(t("Password changed successfully!"));
        hasChanges = true;
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || t("Failed to change password.");
        message.error(t(errorMessage));
        console.error("Change password error:", error);
      }
    }

    if (successMessages.length > 0) {
      message.success(successMessages.join(" "));
    } else if (!hasChanges) {
      message.info(t("No information has been changed."));
    }
    setSaving(false);
  };

  const handleOpenAvatarModal = () => {
    setIsAvatarModalOpen(true);
  };

  const handleCloseAvatarModal = () => {
    setIsAvatarModalOpen(false);
  };

  const handleSelectAvatarMedia = (mediaUrl: string) => {
    setNewSelectedAvatarUrl(mediaUrl);
    setAvatarPreview(mediaUrl);
    setIsAvatarModalOpen(false);
  };

  const handleCancelAvatarSelection = () => {
    setNewSelectedAvatarUrl(originalProfileRef.current?.avatar || null);
    setAvatarPreview(originalProfileRef.current?.avatar || null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Spin size="large" />
      </div>
    );
  }

  if (!adminProfile) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>{ t("Unable to load user information.") }</p>
        <Button type="link" onClick={ () => router.push("/signin") }>
          { t("Please log in again") }
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md max-w-4xl mx-auto mb-8">
        <Title
          level={ 3 }
          style={ { marginBottom: "24px", textAlign: "center" } }
        >
          { t("Admin Profile") }
        </Title>
        <Row gutter={ [ 24, 24 ] } align="top">
          <Col
            xs={ 24 }
            md={ 8 }
            className="flex flex-col items-center text-center mb-6 md:mb-0"
          >
            <Avatar
              size={ 150 }
              src={ avatarPreview || adminProfile.avatar || undefined }
              icon={ !(avatarPreview || adminProfile.avatar) && <UserOutlined /> }
              className="mb-4 border-2 border-gray-200 shadow-sm"
            />
            <Button
              icon={ <SelectOutlined /> }
              onClick={ handleOpenAvatarModal }
              className="mb-1"
            >
              { avatarPreview ? t("Change Avatar") : t("Select Avatar") }
            </Button>
            { newSelectedAvatarUrl && newSelectedAvatarUrl !== originalProfileRef.current?.avatar && (
              <Button
                type="link"
                danger
                size="small"
                onClick={ handleCancelAvatarSelection }
                icon={ <TrashIcon size={ 14 } className="mr-1" /> }
                style={ { fontSize: '12px', padding: '0 8px' } }
                className="mt-1"
              >
                { t("Cancel") }
              </Button>
            ) }
            <p className="text-xs text-gray-500 mt-1">
              { t("Choose from library or upload JPG/PNG/GIF file, must be less than 2MB") }
            </p>

            { adminProfile.name && (
              <Title level={ 5 } className="mt-4 mb-0">
                { adminProfile.name }
              </Title>
            ) }
            <Text className="text-gray-600">{ adminProfile.email }</Text>
          </Col>

          <Col xs={ 24 } md={ 16 }>
            <Form
              form={ profileForm }
              name="profileForm"
              layout="vertical"
              onFinish={ onAdminProfileFinish }
              autoComplete="off"
              className="w-full"
            >
              <Title level={ 4 } className="mb-4">
                { t("Account Information") }
              </Title>
              <Form.Item
                label={ t("Display Name") }
                name="name"
                rules={ [
                  { required: true, message: t("Please enter display name!") },
                ] }
              >
                <Input placeholder={ t("Enter the name you want to display") } />
              </Form.Item>
              <Form.Item
                label={ t("Username") }
                name="username"
                rules={ [
                  { required: true, message: t("Please enter username!") },
                ] }
              >
                <Input placeholder={ t("Enter your username") } />
              </Form.Item>
              <Form.Item
                label={ t("Email") }
                name="email"
                rules={ [
                  { required: true, message: t("Please enter your email!") },
                  { type: "email", message: t("Invalid email!") },
                ] }
              >
                <Input placeholder={ t("Enter email address") } />
              </Form.Item>

              <Divider />

              <Title level={ 4 } className="mt-6 mb-4">
                { t("Change Password (Optional)") }
              </Title>
              <Form.Item
                label={ t("Current Password") }
                name="currentPassword"
                tooltip={ t(
                  "Enter your current password if you want to set a new password."
                ) }
              >
                <Input.Password
                  iconRender={ (visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />) }
                  placeholder={ t("Leave blank if you do not want to change your password.") }
                />
              </Form.Item>
              <Form.Item
                label={ t("New Password") }
                name="newPassword"
                rules={ [
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value && value.length < 6) {
                        return Promise.reject(
                          new Error(t("New password must be at least 6 characters."))
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ] }
                tooltip={ t(
                  "New password must be at least 6 characters. You can leave it blank if you do not want to change your password."
                ) }
              >
                <Input.Password
                  iconRender={ (visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />) }
                  placeholder={ t("Leave blank if you do not want to change your password.") } />
              </Form.Item>
              <Form.Item
                name="confirmNewPassword"
                label={ t("Confirm new password") }
                dependencies={ [ "newPassword" ] }
                hasFeedback
                rules={ [
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const newPassword = getFieldValue("newPassword");
                      if (!newPassword) {
                        return Promise.resolve();
                      }
                      if (!value) {
                        return Promise.reject(
                          new Error(t("Please confirm new password!"))
                        );
                      }
                      if (newPassword === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(t("Confirmation password does not match!"))
                      );
                    },
                  }),
                ] }
              >
                <Input.Password
                  iconRender={ (visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />) }
                  placeholder={ t("Re-enter new password") } />
              </Form.Item>

              <Form.Item className="mt-6">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={ saving }
                  size="large"
                  icon={ <SaveOutlined /> }
                  block
                >
                  { t("Save Changes") }
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>

      <ModalSelectMedia
        isOpen={ isAvatarModalOpen }
        onClose={ handleCloseAvatarModal }
        onSelectMedia={ handleSelectAvatarMedia }
      />

    </div>
  );
};

export default AdminProfilePage;
