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
  updateUser
} from "@/modules/services/userServices";
import {
  User,
  UserResponse,
  Address,
} from "@/constant/types";
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
  const [ form ] = Form.useForm();

  useEffect(() => {
    if (initialValues && visible) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [ initialValues, visible, form ]);

  const handleFormFinish = (values: Omit<Address, "id" | "user_id">) => {
    onFinish(values);
  };

  return (
    <Modal
      title={ initialValues ? "Cập nhật địa chỉ" : "Thêm địa chỉ mới" }
      open={ visible }
      onCancel={ onCancel }
      footer={ [
        <Button key="back" onClick={ onCancel } disabled={ loading }>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={ loading }
          onClick={ () => form.submit() }
        >
          { initialValues ? "Cập nhật" : "Thêm mới" }
        </Button>,
      ] }
      destroyOnClose
    >
      <Form
        form={ form }
        layout="vertical"
        onFinish={ handleFormFinish }
        initialValues={ initialValues || {} }
      >
        <Form.Item
          name="receiver_name"
          label="Tên người nhận"
          rules={ [ { required: true, message: "Vui lòng nhập tên người nhận!" } ] }
        >
          <Input placeholder="Nguyễn Văn A" />
        </Form.Item>
        <Form.Item
          name="receiver_phone"
          label="Số điện thoại"
          rules={ [
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            {
              pattern: /^[0-9]{10,11}$/,
              message: "Số điện thoại không hợp lệ!",
            },
          ] }
        >
          <Input placeholder="09xxxxxxxx" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Địa chỉ chi tiết"
          rules={ [ { required: true, message: "Vui lòng nhập địa chỉ!" } ] }
        >
          <Input.TextArea
            rows={ 3 }
            placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const UserProfilePage: React.FC<{
  onFinish: (values: User) => void;
  uploadedImage: string;
  setUploadedImage: React.Dispatch<React.SetStateAction<string>>;
}> = ({ onFinish, uploadedImage, setUploadedImage }) => {
  const [ profileForm ] = Form.useForm();
  const { t } = useTranslation("common");
  const router = useRouter();
  const [ loading, setLoading ] = useState(true);
  const [ saving, setSaving ] = useState(false);
  const [ userProfile, setUserProfile ] = useState<User | null>(null);
  const [ avatarFile, setAvatarFile ] = useState<RcFile | null>(null);
  const [ avatarPreview, setAvatarPreview ] = useState<string | null>(null);
  const originalProfileRef = useRef<User | null>(null);

  const [ addresses, setAddresses ] = useState<Address[]>([]);
  const [ isAddressModalVisible, setIsAddressModalVisible ] = useState(false);
  const [ editingAddress, setEditingAddress ] = useState<Address | null>(null);
  const [ addressLoading, setAddressLoading ] = useState(false);

  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ isChooseMedia, setIsChooseMedia ] = useState(true);
  const [ selectedMedia, setSelectedMedia ] = useState<string>("");
  const [ selectedMediaUrl, setSelectedMediaUrl ] = useState<string | null>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectMedia = (mediaUrl: string) => {
    setSelectedMediaUrl(mediaUrl);
    setAvatarPreview(mediaUrl);
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    onFinish(profileForm.getFieldsValue());
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImage("");
  };

  const fetchUserProfileAndAddresses = useCallback(async () => {
    setLoading(true);
    const token = getToken();
    if (!token) {
      message.error("Vui lòng đăng nhập để xem thông tin.");
      router.push("/signin");
      return;
    }
    try {
      const response: UserResponse | null = await getProfile();

      if (response && response.user) {
        const fetchedUser = response.user as User;

        setUserProfile(fetchedUser);
        originalProfileRef.current = fetchedUser;
        setAddresses(fetchedUser.addresses || []);

        profileForm.setFieldsValue({
          username: fetchedUser.username,
          email: fetchedUser.email,
          name: fetchedUser.name,
        });

        if (fetchedUser.avatar) {
          setAvatarPreview(fetchedUser.avatar);
        }
      } else {
        message.error("Không tìm thấy thông tin người dùng hoặc dữ liệu không hợp lệ.");
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
  }, [ profileForm, router ]);

  useEffect(() => {
    fetchUserProfileAndAddresses();
  }, [ fetchUserProfileAndAddresses ]);

  const handleAvatarChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.originFileObj) {
      const file = info.file.originFileObj as RcFile;
      const isJpgOrPngOrGif = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
      if (!isJpgOrPngOrGif) {
        message.error('Bạn chỉ có thể tải lên file JPG/PNG/GIF!');
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Hình ảnh phải nhỏ hơn 2MB!');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => setAvatarPreview(e.target?.result as string);
      reader.readAsDataURL(file);

      setAvatarFile(file);
    }
  };


  const onProfileFinish = async (values: any) => {
    if (!userProfile || !originalProfileRef.current) return;

    setSaving(true);
    let hasChanges = false;
    let messages: string[] = [];

    const original = originalProfileRef.current;

    const profileChanged =
      values.name !== original.name ||
      values.username !== original.username ||
      values.email !== original.email;

    // 1. Kiểm tra thay đổi thông tin cơ bản và Avatar URL
    const avatarChanged = selectedMediaUrl !== null && selectedMediaUrl !== original.avatar;
    if (profileChanged || avatarChanged) {
      try {
        const avatarToSend = avatarChanged ? selectedMediaUrl : undefined;

        const updateResponse = await updateUser(
          Number(userProfile.id),
          values.username,
          values.name,
          values.email,
          avatarToSend
        );

        if (updateResponse && updateResponse.user) {
          messages.push("Cập nhật thông tin cá nhân thành công!");
          if (avatarChanged) messages.push("Cập nhật ảnh đại diện thành công!");
          hasChanges = true;
          const updatedUser = updateResponse.user as User;
          setUserProfile(updatedUser);
          originalProfileRef.current = { ...updatedUser };
          setAvatarPreview(updatedUser.avatar);
          setSelectedMediaUrl(null);
        } else {
          throw new Error(updateResponse?.message || "Cập nhật thông tin thất bại.");
        }
      } catch (error: any) {
        message.error(error.message || "Lỗi khi cập nhật thông tin.");
      }
    }

    if (profileChanged) {
      try {
        const updateResponse = await updateUser(
          Number(userProfile.id),
          values.username,
          values.name,
          values.email,
          values.avatar
        );
        if (updateResponse && updateResponse.user) {
          messages.push("Cập nhật thông tin cá nhân thành công!");
          hasChanges = true;
          setUserProfile(updateResponse.user as User);
          originalProfileRef.current = updateResponse.user as User;
        } else {
          throw new Error(updateResponse?.message || "Cập nhật thông tin thất bại.");
        }
      } catch (error: any) {
        message.error(error.message || "Lỗi khi cập nhật thông tin cá nhân.");
      }
    }

    // 3. Thay đổi mật khẩu
    if (values.newPassword) {
      if (!values.currentPassword) {
        message.error("Vui lòng nhập mật khẩu hiện tại để đổi mật khẩu.");
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
        messages.push("Đổi mật khẩu thành công!");
        hasChanges = true;
      } catch (error: any) {
        message.error(error.message || "Đổi mật khẩu thất bại.");
        console.error("Change password error:", error);
      }
    }

    // Hiển thị thông báo
    if (messages.length > 0) {
      message.success(messages.join(" "));
    } else if (!hasChanges) {
      message.info("Không có thông tin nào được thay đổi.");
    }

    setSaving(false);
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

  const handleAddressFormFinish = async (values: Omit<Address, "id" | "user_id">) => {
    if (!userProfile) return;
    setAddressLoading(true);
    try {
      if (editingAddress) {
        await updateAddress(editingAddress.id, values);
        message.success("Cập nhật địa chỉ thành công!");
      } else {
        await addNewAddress(
          Number(userProfile.id),
          values.address,
          values.receiver_name,
          values.receiver_phone
        );
        message.success("Thêm địa chỉ mới thành công!");
      }
      setIsAddressModalVisible(false);
      setEditingAddress(null);
      await fetchUserProfileAndAddresses();
    } catch (error: any) {
      message.error(error.message || "Có lỗi xảy ra khi lưu thông tin địa chỉ.");
    } finally {
      setAddressLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId: number) => {
    setAddressLoading(true);
    try {
      await deleteAddress(addressId);
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
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Spin size="large" />
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Không thể tải thông tin người dùng.</p>
        <Button type="link" onClick={ () => router.push('/signin') }>
          Vui lòng đăng nhập lại
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Info Section */ }
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md max-w-4xl mx-auto mb-8">
        <Title level={ 3 } style={ { marginBottom: "24px", textAlign: "center" } }>
          Thông Tin Cá Nhân
        </Title>
        <Row gutter={ [ 24, 24 ] } align="top">
          <Col
            xs={ 24 }
            md={ 8 }
            className="flex flex-col items-center text-center mb-6 md:mb-0"
          >
            <Avatar
              size={ 150 }
              src={ avatarPreview || userProfile.avatar || undefined }
              icon={ !(avatarPreview || userProfile.avatar) && <UserOutlined /> }
              className="mb-4 border-2 border-gray-200 shadow-sm"
            />
            <Button icon={ <SelectOutlined /> } onClick={ handleOpenModal } className="mb-2">
              Chọn ảnh đại diện
            </Button>
            <p className="text-xs text-gray-500 mt-1">
              Chọn từ thư viện hoặc tải lên file JPG/PNG/GIF, phải nhỏ hơn 2MB
            </p>

            { selectedMediaUrl && (
              <Button
                type="dashed"
                danger
                size="small"
                onClick={ () => {
                  setSelectedMediaUrl(null);
                  setAvatarPreview(originalProfileRef.current?.avatar || null);
                } }
                icon={ <TrashIcon size={ 14 } /> }
                className="mt-1"
                style={ { fontSize: '12px', padding: '0 8px' } }
              >
                Hủy chọn
              </Button>
            ) }

            { userProfile.name && (
              <Title level={ 5 } className="mt-4 mb-0">{ userProfile.name }</Title>
            ) }
            <p className="text-gray-600">{ userProfile.email }</p>
          </Col>

          <Col xs={ 24 } md={ 16 }>
            <Form
              form={ profileForm }
              name="profileForm"
              layout="vertical"
              onFinish={ onProfileFinish }
              autoComplete="off"
              className="w-full"
            >
              <Title level={ 4 } className="mb-4">
                Thông tin tài khoản
              </Title>
              <Form.Item
                label="Tên hiển thị"
                name="name"
                rules={ [ { required: true, message: "Vui lòng nhập tên hiển thị!" } ] }
              >
                <Input placeholder="Nhập tên bạn muốn hiển thị" />
              </Form.Item>
              <Form.Item
                label="Tên tài khoản (Username)"
                name="username"
                rules={ [ { required: true, message: "Vui lòng nhập tên tài khoản!" } ] }
              >
                <Input placeholder="Nhập tên tài khoản" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={ [
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: 'email', message: 'Email không hợp lệ!' }
                ] }
              >
                <Input placeholder="Nhập địa chỉ email" />
              </Form.Item>

              <Divider />

              <Title level={ 4 } className="mt-6 mb-4">
                Thay đổi mật khẩu (Tùy chọn)
              </Title>
              <Form.Item
                label="Mật khẩu hiện tại"
                name="currentPassword"
                tooltip="Nhập mật khẩu hiện tại nếu bạn muốn đặt mật khẩu mới."
              >
                <Input.Password placeholder="Để trống nếu không đổi" />
              </Form.Item>
              <Form.Item
                label="Mật khẩu mới"
                name="newPassword"
                rules={ [
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value && value.length < 6) {
                        return Promise.reject(new Error('Mật khẩu mới phải có ít nhất 6 ký tự.'));
                      }
                      return Promise.resolve();
                    },
                  })
                ] }
                tooltip="Ít nhất 6 ký tự. Để trống nếu không muốn thay đổi."
              >
                <Input.Password placeholder="Để trống nếu không đổi" />
              </Form.Item>
              <Form.Item
                name="confirmNewPassword"
                label="Xác nhận mật khẩu mới"
                dependencies={ [ 'newPassword' ] }
                hasFeedback
                rules={ [
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const newPassword = getFieldValue('newPassword');
                      if (!newPassword) {
                        return Promise.resolve();
                      }
                      if (!value) {
                        return Promise.reject(new Error('Vui lòng xác nhận mật khẩu mới!'));
                      }
                      if (newPassword === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                    },
                  }),
                ] }
              >
                <Input.Password placeholder="Nhập lại mật khẩu mới" />
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
                  Lưu Thay Đổi
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Title level={ 3 } className="!mb-0">
            Sổ Địa Chỉ
          </Title>
          <Button
            type="primary"
            icon={ <PlusOutlined /> }
            onClick={ handleShowAddAddressModal }
          >
            Thêm địa chỉ mới
          </Button>
        </div>
        { addressLoading && addresses.length === 0 && (
          <div className="text-center py-4"><Spin /></div>
        ) }
        { !addressLoading && addresses.length === 0 && (
          <Text className="block text-center text-gray-500 py-4">
            Bạn chưa có địa chỉ nào. Hãy thêm địa chỉ mới!
          </Text>
        ) }
        <List
          grid={ { gutter: 16, xs: 1, sm: 1, md: 2 } }
          dataSource={ addresses }
          loading={ addressLoading && addresses.length > 0 }
          renderItem={ (item) => (
            <List.Item>
              <Card
                size="small"
                // bordered={ false }
                variant="outlined"
                className="shadow-sm hover:shadow-md transition-shadow border rounded-md"
                actions={ [
                  < Button
                    type="text"
                    key="edit"
                    icon={ < EditOutlined /> }
                    onClick={ () => handleShowEditAddressModal(item) }
                  >
                    Sửa
                  </Button>,
                  <Popconfirm
                    title="Xóa địa chỉ này?"
                    description="Hành động này không thể hoàn tác."
                    onConfirm={ () => handleDeleteAddress(item.id) }
                    okText="Xóa"
                    cancelText="Hủy"
                    placement="topRight"
                  >
                    <Button
                      type="text"
                      danger
                      icon={ <DeleteOutlined /> }
                      key="delete"
                    >
                      Xóa
                    </Button>
                  </Popconfirm>,
                ] }
              >
                <div className="font-semibold mb-1">
                  <HomeOutlined className="mr-2 text-gray-600" /> { item.receiver_name }
                </div>
                <p className="text-sm text-gray-700 mb-1 pl-5">
                  <span className="font-medium">Điện thoại:</span> { item.receiver_phone }
                </p>
                <p className="text-sm text-gray-700 pl-5">
                  <span className="font-medium">Địa chỉ:</span> { item.address }
                </p>
              </Card>
            </List.Item>
          ) }
        />
      </div>

      <AddressFormModal
        visible={ isAddressModalVisible }
        onCancel={ handleAddressModalCancel }
        onFinish={ handleAddressFormFinish }
        initialValues={ editingAddress ? {
          address: editingAddress.address,
          receiver_name: editingAddress.receiver_name,
          receiver_phone: editingAddress.receiver_phone
        } : undefined }
        loading={ addressLoading }
      />

      <Modal
        open={ isModalOpen }
        title={ <span className="ml-4">{ t("Select Media") }</span> }
        onCancel={ handleCloseModal }
        style={ { top: 20 } }
        width="90%"
        footer={ null }
      >
        <div className="ml-4 mt-5">
          <Button
            onClick={ () => setIsChooseMedia(true) }
            className="mr-2"
            style={ {
              backgroundColor: isChooseMedia ? "blue" : "initial",
              color: isChooseMedia ? "white" : "initial",
            } }
          >
            { t("Select Media") }
          </Button>
          <Button
            onClick={ () => setIsChooseMedia(false) }
            style={ {
              backgroundColor: !isChooseMedia ? "blue" : "initial",
              color: !isChooseMedia ? "white" : "initial",
            } }
          >
            { t("Upload Media") }
          </Button>
        </div>
        <div>
          { isChooseMedia ? (
            <Media isOpenModal={ true } onSelectMedia={ handleSelectMedia } />
          ) : (
            <MediaUpload isOpenModal={ true } setChooseMedia={ setIsChooseMedia } />
          ) }
        </div>
      </Modal>
    </div >
  );
};

export default UserProfilePage;
