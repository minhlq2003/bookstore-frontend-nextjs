import { ListOrdersResponse, OrderResponse } from "@/constant/types";
import { HttpClient } from "@/lib/HttpClient";

const API_PREFIX_PATH = "/cart";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_CARTSERVICE_URL ?? "http://localhost:5002";

const http = new HttpClient(BASE_URL);

export const getOrders = async (params?: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}) => {
  const response = await http.get<ListOrdersResponse>(
    `${API_PREFIX_PATH}/orders`,
    {
      params,
    }
  );
  return response;
};

export const getOrderById = (id: string) =>
  http.get<OrderResponse>(`${API_PREFIX_PATH}/getorderinfo/${id}`);
