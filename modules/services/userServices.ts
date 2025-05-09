import {
  User,
  UserProfileResponse,
  ChangePasswordPayload,
  GetAddressResponse,
  Address,
  AddressResponse,
} from "@/constant/types";
import { HttpClient } from "@/lib/HttpClient";

const API_PREFIX_PATH = "/user";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_USERSERVICE_URL ?? "http://localhost:5003";

const http = new HttpClient(BASE_URL);

export const getUserById = (id: string) =>
  http.get<User>(`${API_PREFIX_PATH}/${id}`);

export const getProfile = (): Promise<UserProfileResponse> => {
  return http.get<UserProfileResponse | null>(`${API_PREFIX_PATH}/profile`).then(response => {
    if (!response) {
      throw new Error("Failed to fetch user profile");
    }
    return response;
  });
};

export const changePassword = (payload: ChangePasswordPayload) => {
  return http.post<any>(`${API_PREFIX_PATH}/change-password`, payload);
};

export const uploadAvatar = (userId: string | number, file: File): Promise<any> => {
  const formData = new FormData();
  formData.append("file", file);

  return http.post<any>(`${API_PREFIX_PATH}/upload/${userId}`, formData);
};

export const getUserAddresses = (userId: string | number) => {
  http.get<GetAddressResponse>(`${API_PREFIX_PATH}/alladdress/${userId}`);
};

export const addAddress = (payload: {
  address: string;
  receiverName: string;
  receiverPhone: string;
  userId: string | number;
}) => {
  http.post<AddressResponse>(`${API_PREFIX_PATH}/addnewaddress`, payload);
};

export const updateAddress = (addressId: number, payload: Partial<Omit<Address, 'id' | 'user_id'>>) => {
  http.put<AddressResponse>(`${API_PREFIX_PATH}/updateaddress/${addressId}`, payload);
};

export const deleteAddress = (addressId: number) => {
  http.post<AddressResponse>(`${API_PREFIX_PATH}/deleteaddress/${addressId}`);
};
