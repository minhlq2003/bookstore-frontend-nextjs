import { AddToCartResponse, CartListResponse, CheckoutResponse } from "@/constant/types";
import { HttpClient } from "@/lib/HttpClient";

const API_PREFIX_PATH = "/cart";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5002";

const http = new HttpClient(BASE_URL);

export const addToCart = (userId:number, bookId:number, quantity:number) =>
  http.post<AddToCartResponse>(`${API_PREFIX_PATH}/addcartitem`, {
    userId,bookId,quantity});

export const updateCartItemQuantity = (cartItemId:number, bookId:number, finalQuantity:number) => 
    http.post<AddToCartResponse>(`${API_PREFIX_PATH}/updatequantity/${cartItemId}`, {
        bookId,finalQuantity});

export const getCartItems = (userId:number) =>
  http.get<CartListResponse>(`${API_PREFIX_PATH}/getallcartitems/${userId}`);

export const deleteCartItem = (cartItemId:number) =>
  http.post<AddToCartResponse>(`${API_PREFIX_PATH}/removecartitem/${cartItemId}`);

export const checkout = (userId:number, address:String, paymentMethod:String, cartItemIds:number[]) =>
  http.post<CheckoutResponse>(`${API_PREFIX_PATH}/checkout`,{
    userId,
    address,
    paymentMethod,
    cartItemIds
  });