import { MediaData, MediaResponse } from "@/constant/types";
import { HttpClient } from "@/lib/HttpClient";
import { AxiosRequestHeaders } from "axios";

const API_PREFIX_BOOK_PATH = "/user";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5001";

const http = new HttpClient(BASE_URL);

export const getMedia = async (params?: { page?: number; limit?: number }) => {
  const response = await http.get<MediaResponse>(
    `${API_PREFIX_BOOK_PATH}/uploads`,
    {
      params,
    }
  );
  return response;
};

export const uploadMedia = (data: FormData, id: number)  =>
  http.post<MediaData>(`${API_PREFIX_BOOK_PATH}/upload/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    } as AxiosRequestHeaders,
  });

export const deleteMedia = (id: number) => {
  http.delete(`${API_PREFIX_BOOK_PATH}/upload/delete/${id}`);
};

export const updateMedia = (id: number, data: MediaData) => {
  http.post(`${API_PREFIX_BOOK_PATH}/upload/${id}`, data);
};
