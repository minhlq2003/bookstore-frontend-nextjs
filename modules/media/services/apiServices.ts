import { HttpClient } from "@/lib/HttpClient";
import { AxiosRequestConfig } from "axios";

export const API_PREFIX_POST_PATH = "/media";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5001";

const http = new HttpClient(BASE_URL);

export const fetchMediaAll = async () => {
  return await http.get(`${API_PREFIX_POST_PATH}/files`);
};

export const fetchMedia = async (
  page: number,
  pageSize: number,
  searchTerm?: string
) => {
  const params: AxiosRequestConfig["params"] = {
    populate: "*",
    sort: "createdAt:desc",
    pagination: {
      page,
      pageSize,
    },
    filters: {
      name: { $containsi: searchTerm },
    },
    limit: 200,
  };
  return await http.get(`${API_PREFIX_POST_PATH}/files`, { params });
};

export const fetchMediaId = async (id: number) => {
  const response = await http.get(`${API_PREFIX_POST_PATH}/files/${id}`);
  return response;
};

export const deleteMedia = async (id: number) => {
  return await http.delete(`${API_PREFIX_POST_PATH}/files/${id}`);
};
export const updateMedia = async (id: number, data: FormData) => {
  return await http.post(`${API_PREFIX_POST_PATH}?id=${id}`, data);
};
export const addMedia = async (data: FormData) => {
  return await http.post(`${API_PREFIX_POST_PATH}`, data);
};
