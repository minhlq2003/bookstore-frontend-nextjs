import {
  Book,
  BookListResponse,
  BookResponse,
  Discount,
  DiscountListResponse,
  Publisher,
  PublisherListResponse,
} from "@/constant/types";
import { HttpClient } from "@/lib/HttpClient";

const API_PREFIX_BOOK_PATH = "/book";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5001";

const http = new HttpClient(BASE_URL);

export const getBooks = async (params?: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
}) => {
  const response = await http.get<BookListResponse>(
    `${API_PREFIX_BOOK_PATH}/all`,
    { params }
  );
  return response;
};

export const getBooksByCategory = async (
  categorySlug?: string,
  params?: { page?: number; limit?: number }
) => {
  const response = await http.get<BookListResponse>(
    `${API_PREFIX_BOOK_PATH}/category/${categorySlug}`,
    { params }
  );
  return response;
};

export const getAllPublishers = async () => {
  const response = await http.get<Publisher[]>(
    `${API_PREFIX_BOOK_PATH}/allpublishers`
  );
  return response;
};

export const getAllDiscount = async () => {
  const response = await http.get<Discount[]>(
    `${API_PREFIX_BOOK_PATH}/alldiscounts`
  );
  return response;
};

export const getBookById = (id: string) =>
  http.get<BookResponse>(`${API_PREFIX_BOOK_PATH}/details/${id}`);

export const createBook = (data: Partial<Book>) =>
  http.post<BookResponse>(`${API_PREFIX_BOOK_PATH}/createbook`, data);

export const updateBook = (id: string, data: Partial<Book>) =>
  http.post<BookResponse>(`${API_PREFIX_BOOK_PATH}/updatebook/${id}`, data);

export const deleteBook = (id: string) =>
  http.post<BookResponse>(`${API_PREFIX_BOOK_PATH}/deletebook/${id}`);
