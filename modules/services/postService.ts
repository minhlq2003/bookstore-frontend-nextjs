import { Post, PostListResponse, PostResponse } from "@/constant/types";
import { HttpClient } from "@/lib/HttpClient";

const API_PREFIX_POST_PATH = "/user";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5003";

const http = new HttpClient(BASE_URL);

export const getPosts = async (params?: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
}) => {
  const response = await http.get<PostListResponse>(
    `${API_PREFIX_POST_PATH}/allpost`,
    { params }
  );
  return response;
};

export const getPostsByCategory = async (
  categorySlug?: string,
  params?: { page?: number; limit?: number }
) => {
  const response = await http.get<PostListResponse>(
    `${API_PREFIX_POST_PATH}/category/${categorySlug}`,
    { params }
  );
  return response;
};

export const getPostById = (id: string) =>
  http.get<PostResponse>(`${API_PREFIX_POST_PATH}/details/${id}`);

export const getPostBySlug = (id: string) =>
  http.get<PostResponse>(`${API_PREFIX_POST_PATH}/details/${id}`);

export const createPost = (data: Partial<Post>) =>
  http.post<PostResponse>(`${API_PREFIX_POST_PATH}/createpost`, data);

export const updatePost = (id: string, data: Partial<Post>) =>
  http.post<PostResponse>(`${API_PREFIX_POST_PATH}/updatepost/${id}`, data);

export const deletePost = (id: string) =>
  http.post<PostResponse>(`${API_PREFIX_POST_PATH}/deletepost/${id}`);
