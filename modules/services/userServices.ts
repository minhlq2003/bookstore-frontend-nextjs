import {
  User,
  UserProfileResponse,
  ChangePasswordPayload,
  ApiErrorResponse,
  Address,
  AddressApiResponse,
  GetAllAddressesResponse,
} from "@/constant/types";
import { HttpClient, getToken } from "@/lib/HttpClient";

const API_PREFIX_PATH = "/user";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_USERSERVICE_URL ?? "http://localhost:5003";

const http = new HttpClient(BASE_URL);

export const getUserById = (id: string) =>
  http.get<User>(`${API_PREFIX_PATH}/user/${id}`);

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorData: ApiErrorResponse;
    try {
      errorData = await response.json();
    } catch (e) {
      throw new Error(response.statusText || `Yêu cầu thất bại với mã lỗi ${response.status}`);
    }
    throw new Error(errorData.message || `Yêu cầu thất bại với mã lỗi ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export const userServices = {
  /**
   * Lấy thông tin hồ sơ của người dùng hiện tại.
   */
  getProfile: async (): Promise<UserProfileResponse> => {
    const token = getToken();
    if (!token) {
      throw new Error("Token không tồn tại. Vui lòng đăng nhập lại.");
    }

    const response = await fetch(`${BASE_URL}/user/profile`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return handleResponse<UserProfileResponse>(response);
  },

  /**
   * Thay đổi mật khẩu người dùng.
   */
  changePassword: async (payload: ChangePasswordPayload): Promise<any> => {
    const token = getToken();
    if (!token) {
      throw new Error("Token không tồn tại. Vui lòng đăng nhập lại.");
    }

    const response = await fetch(`${BASE_URL}/user/change-password`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return handleResponse<any>(response);
  },

  /**
   * Upload ảnh đại diện cho người dùng.
   * @param userId ID của người dùng.
   * @param file File ảnh cần upload.
   */
  uploadAvatar: async (userId: string | number, file: File): Promise<any> => {
    const token = getToken();
    if (!token) {
      throw new Error("Token không tồn tại. Vui lòng đăng nhập lại.");
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${BASE_URL}/user/upload/${userId}`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    });
    return handleResponse<any>(response);
  },

  /**
  * Lấy tất cả địa chỉ của một người dùng dựa trên userId.
  */
  getUserAddresses: async (userId: string | number): Promise<GetAllAddressesResponse> => {
    const token = getToken();
    if (!token) {
      throw new Error("Token không tồn tại. Vui lòng đăng nhập lại.");
    }
    const response = await fetch(`${BASE_URL}/user/alladdress/${userId}`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return handleResponse<GetAllAddressesResponse>(response);
  },

  /**
   * Thêm địa chỉ mới cho người dùng hiện tại.
   */
  addAddress: async (payload: {
    address: string;
    receiverName: string;
    receiverPhone: string;
    userId: string | number;
  }): Promise<AddressApiResponse> => {
    const token = getToken();
    if (!token) {
      throw new Error("Token không tồn tại. Vui lòng đăng nhập lại.");
    }
    const response = await fetch(`${BASE_URL}/user/addnewaddress`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return handleResponse<AddressApiResponse>(response);
  },

  /**
  * Cập nhật một địa chỉ đã có.
  */
  updateAddress: async (addressId: number, payload: Partial<Address>): Promise<AddressApiResponse> => {
    const token = getToken();
    if (!token) {
      throw new Error("Token không tồn tại. Vui lòng đăng nhập lại.");
    }
    const response = await fetch(`${BASE_URL}/user/updateaddress/${addressId}`, {
      method: "PUT",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return handleResponse<AddressApiResponse>(response);
  },

  /**
  * Xóa một địa chỉ.
  */
  deleteAddress: async (addressId: number): Promise<AddressApiResponse> => {
    const token = getToken();
    if (!token) {
      throw new Error("Token không tồn tại. Vui lòng đăng nhập lại.");
    }
    const response = await fetch(`${BASE_URL}/user/deleteaddress/${addressId}`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
    });
    return handleResponse<AddressApiResponse>(response);
  },
};
