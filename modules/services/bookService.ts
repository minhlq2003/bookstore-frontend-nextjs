/* -------- bookService.ts -------- */

import { Book, BookListResponse } from "@/constant/types";
import { HttpClient } from "@/lib/HttpClient";

const API_PREFIX_BOOK_PATH = "/book";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5001";

const http = new HttpClient(BASE_URL);

export const getBooks = async (params?: { page?: number; limit?: number }) => {
  const response = await http.get<BookListResponse>(
    `${API_PREFIX_BOOK_PATH}/all`,
    { params }
  );
  return response;
};

export const getBookById = (id: string) =>
  http.get<Book>(`${API_PREFIX_BOOK_PATH}/${id}`);

export const createBook = (data: Partial<Book>) =>
  http.post<Book>(`${API_PREFIX_BOOK_PATH}`, data);

export const updateBook = (id: string, data: Partial<Book>) =>
  http.put<Book>(`${API_PREFIX_BOOK_PATH}/${id}`, data);

export const deleteBook = (id: string) =>
  http.delete<void>(`${API_PREFIX_BOOK_PATH}/${id}`);
