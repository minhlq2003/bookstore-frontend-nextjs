import { User } from "@/constant/types";
import { HttpClient } from "@/lib/HttpClient";

const API_PREFIX_PATH = "/user";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_USERSERVICE_URL ?? "http://localhost:5003";

const http = new HttpClient(BASE_URL);

export const getUserById = (id: string) =>
  http.get<User>(`${API_PREFIX_PATH}/user/${id}`);

export const changePassword = 
