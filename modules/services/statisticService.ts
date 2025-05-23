import {
  ListOrderFromUserResponse,
  ListOrdersResponse,
  OrderResponse,
  OrderStatusUpdateResponse,
} from "@/constant/types";
import { HttpClient } from "@/lib/HttpClient";

const API_PREFIX_PATH = "/statistics";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5002";

const http = new HttpClient(BASE_URL);

export const getUserStatistics = async () =>
  http.get(`${API_PREFIX_PATH}/users`);

export const getOrderStatistics = async () =>
  http.get(`${API_PREFIX_PATH}/orders`);

export const getOrderByYears = async (year: number) =>
  http.get(`${API_PREFIX_PATH}/orders/${year}`);

export const getSaleStatistics = async () =>
  http.get(`${API_PREFIX_PATH}/sales`);

export const getSalesByYears = async (year: number) =>
  http.get(`${API_PREFIX_PATH}/sales/${year}`);

export const getBookStatistics = async (period: string) =>
  http.get(`${API_PREFIX_PATH}/top-books/${period}`);
