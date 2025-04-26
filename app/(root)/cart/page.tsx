"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove, faSpinner } from "@fortawesome/free-solid-svg-icons";
import apiClient from "@/lib/apiClient";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import Link from "next/link";

interface BookInfoForCart {
  title: string;
  price: string;
  image?: string;
  slug?: string;
}

interface CartItemType {
  id: number;
  user_id: number;
  book_id: number;
  quantity: number;
  created_at: string;
  updated_at: string;

  book?: BookInfoForCart;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  total?: number;
  orderId?: number;
}

const CartPage = () => {
  const { t } = useTranslation("common");
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingItemId, setUpdatingItemId] = useState<number | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const userId = 1;

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get<ApiResponse<CartItemType[]>>(
          `/cart/items?userId=${userId}`
        );
        if (response.data.success && response.data.data) {
          setCartItems(response.data.data);
        } else {
          setError(response.data.message || t("error.fetchCartFailed"));
        }

        await new Promise((resolve) => setTimeout(resolve, 500));
        setCartItems([
          {
            id: 101,
            user_id: userId,
            book_id: 1,
            quantity: 2,
            created_at: "",
            updated_at: "",
            book: {
              title: "The Great Gatsby",
              price: "10.99",
              image: "https://picsum.photos/100/150?1",
              slug: "the-great-gatsby",
            },
          },
          {
            id: 102,
            user_id: userId,
            book_id: 2,
            quantity: 1,
            created_at: "",
            updated_at: "",
            book: {
              title: "CHASING NEW HORIZONS",
              price: "25.00",
              image: "https://picsum.photos/100/150?2",
              slug: "chasing-new-horizons",
            },
          },
        ]);
      } catch (err) {
        console.error("Failed to fetch cart items:", err);
        setError(t("error.fetchCartFailed"));
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchCart();
    } else {
      setLoading(false);
      setCartItems([]);
    }
  }, [userId, t]);

  const handleUpdateQuantity = async (
    itemId: number,
    currentQuantity: number,
    change: number
  ) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }

    setUpdatingItemId(itemId);
    try {
      const response = await apiClient.post<ApiResponse<CartItemType>>(
        `/cart/updatequantity/${itemId}`,
        {
          finalQuantity: newQuantity,
        }
      );

      if (response.data.success && response.data.data) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId
              ? {
                ...item,
                quantity: response.data?.data?.quantity ?? newQuantity,
              }
              : item
          )
        );
        notification.success({ message: t("success.quantityUpdated") });
      } else {
        notification.error({
          message: t("error.updateQuantityFailed"),
          description: response.data.message,
        });
      }
    } catch (err) {
      console.error("Failed to update quantity:", err);
      notification.error({ message: t("error.updateQuantityFailed") });
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleRemoveItem = async (itemId: number) => {
    setUpdatingItemId(itemId);
    try {
      const response = await apiClient.post<ApiResponse<null>>(
        `/cart/removecartitem/${itemId}`
      );

      if (response.data.success) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.id !== itemId)
        );
        notification.success({ message: t("success.itemRemoved") });
      } else {
        notification.error({
          message: t("error.removeItemFailed"),
          description: response.data.message,
        });
      }
    } catch (err) {
      console.error("Failed to remove item:", err);
      notification.error({ message: t("error.removeItemFailed") });
    } finally {
      setUpdatingItemId(null);
    }
  };

  const { subtotal, total } = useMemo(() => {
    const calculatedSubtotal = cartItems.reduce((sum, item) => {
      const price = parseFloat(item.book?.price || "0");
      return sum + price * item.quantity;
    }, 0);

    const shippingFee = 0;
    const calculatedTotal = calculatedSubtotal + shippingFee;

    return {
      subtotal: calculatedSubtotal,
      total: calculatedTotal,
    };
  }, [cartItems]);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const response = await apiClient.post<ApiResponse<any>>(
        "/cart/checkout",
        { userId }
      );
      if (response.data.success) {
        notification.success({
          message: t("success.checkoutComplete"),
          description: t("success.orderPlaced", {
            orderId: response.data.data?.orderId,
          }),
        });

        setCartItems([]);
      } else {
        notification.error({
          message: t("error.checkoutFailed"),
          description: response.data.message,
        });
      }
    } catch (err) {
      console.error("Checkout failed:", err);
      notification.error({ message: t("error.checkoutFailed") });
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        {t("loadingCart")}...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-red-500">
        {error}{" "}
        <button
          onClick={() => window.location.reload()}
          className="mt-2 text-blue-500 underline"
        >
          {t("retry")}
        </button>{" "}
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto min-h-screen py-10 md:py-20 lg:py-24 px-4 md:px-0 bg-[#F8F8F8]">
      {" "}
      { }
      <h1 className=" text-center text-xl md:text-2xl lg:text-3xl py-3 text-gray-800 font-bold uppercase mb-6 md:mb-10">
        {t("shoppingCart")}
      </h1>
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>{t("cartEmpty")}</p>
          <Link
            href="/"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            {t("continueShopping")}
          </Link>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 lg:gap-10">
          { }
          <div className="border rounded-lg p-3 md:p-4 shadow-md w-full bg-white flex-grow">
            {" "}
            { }
            { }
            { }
            { }
            <div className="divide-y divide-gray-200">
              {" "}
              { }
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center justify-between py-4 gap-3"
                >
                  <div className="flex items-center gap-3 text-xs lg:text-base w-full sm:w-auto">
                    { }
                    <Image
                      src={item.book?.image || "/images/book-placeholder.png"}
                      alt={item.book?.title || "Book"}
                      width={64}
                      height={96}
                      className="w-16 h-24 object-cover rounded"
                    />
                    <div className="flex-grow w-[100px] sm:w-[140px] lg:w-[200px] overflow-hidden">
                      {" "}
                      { }
                      <Link
                        href={`/book/${item.book_id}`}
                        className="font-medium hover:text-blue-600 line-clamp-2"
                      >
                        {" "}
                        { }
                        {item.book?.title || t("bookTitleUnavailable")}
                      </Link>
                      <p className="text-gray-600 mt-1">
                        ${parseFloat(item.book?.price || "0").toFixed(2)}
                      </p>
                    </div>
                  </div>

                  { }
                  <div className="flex items-center gap-2 my-2 sm:my-0">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity, -1)
                      }
                      disabled={updatingItemId === item.id}
                      aria-label="Decrease quantity"
                      className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
                    >
                      −
                    </button>
                    <span className="font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity, 1)
                      }
                      disabled={updatingItemId === item.id}
                      aria-label="Increase quantity"
                      className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>

                  { }
                  <p className="text-blue-600 font-semibold w-20 text-right">
                    $
                    {(
                      parseFloat(item.book?.price || "0") * item.quantity
                    ).toFixed(2)}
                  </p>

                  { }
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    disabled={updatingItemId === item.id}
                    aria-label={t("removeItem")}
                    className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50 w-8 h-8 flex items-center justify-center"
                  >
                    {updatingItemId === item.id ? (
                      <FontAwesomeIcon
                        icon={faSpinner}
                        spin
                        className="size-5"
                      />
                    ) : (
                      <FontAwesomeIcon icon={faRemove} className="size-5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          { }
          <div className="py-4 px-5 text-black rounded-lg md:w-[300px] lg:w-[350px] bg-white border shadow-md flex-shrink-0">
            {" "}
            { }
            <h2 className="text-lg font-semibold border-b pb-3 mb-4">
              {t("orderSummary")}
            </h2>
            <div className="mt-3 flex flex-col gap-2 text-sm lg:text-base">
              <div className="flex justify-between">
                <span className="text-gray-600">{t("subtotal")}:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              { }
              <div className="flex justify-between text-gray-600">
                <span>{t("shipping")}:</span>
                <span>{t("free")}</span> { }
              </div>
              <hr className="my-3" />
              <div className="flex justify-between font-bold text-lg lg:text-xl my-2">
                <span>{t("total")}:</span>
                <span className="text-darkblue">${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut || cartItems.length === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full h-10 md:h-11 lg:h-12 rounded-lg mt-5 transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCheckingOut ? (
                <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
              ) : null}
              {t("proceedToCheckout")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
