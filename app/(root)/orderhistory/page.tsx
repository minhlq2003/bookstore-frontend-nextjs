"use client";
import { OrderFromUserResponse, User } from "@/constant/types";
import { addToCart } from "@/modules/services/cartService";
import {
  getAllOrdersFromUser,
  updateOrderStatus,
} from "@/modules/services/orderService";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
const page = () => {
  const { t } = useTranslation("common");
  const [ordersFiltered, setOrdersFiltered] = useState("all");
  const [orders, setOrders] = useState<OrderFromUserResponse[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orderDetailsModal, setOrderDetailsModal] = useState(false);
  const [orderDetailsId, setOrderDetailsId] = useState<number | null>(null);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      const fetchOrders = async (userId: number, search?: string) => {
        setLoading(true);
        try {
          const response = await getAllOrdersFromUser(userId, {
            search: search,
            sortBy: "id",
            sortOrder: "desc",
          });
          if (response?.success) {
            setOrders(response.data);
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      };
      if (ordersFiltered === "all") {
        fetchOrders(user.id);
      } else {
        fetchOrders(user.id, ordersFiltered);
      }
    }
  }, [user, ordersFiltered, reload]);

  const ordersFilteredList = orders.filter(
    (order) => order.id === orderDetailsId
  );

  const handleCancelOrder = async (orderId: number, status: string) => {
    try {
      const response = await updateOrderStatus(orderId, status);
      if (response?.success) {
        toast.success(t("Cancelled order successfully"));
        setReload((prev) => !prev);
      }
    } catch (error) {
      toast.error("Error updating order status");
    }
  };

  const handleAddToCart = async (
    userId: number,
    bookId: number,
    quantity: number
  ) => {
    if (!bookId || !user) return;
    try {
      const response = await addToCart(userId, bookId, quantity);
      if (response?.success) {
        setReload((prev) => !prev);
      } else {
        toast.error("Failed to add items to cart");
      }
    } catch (err) {
      toast.error("Error adding items to cart");
    }
  };
  return (
    <div className="max-w-[1200px] mx-auto h-auto flex flex-col gap-10 py-20 px-5">
      <div>
        <h1 className="text-2xl font-bold">
          {t("Your order")}{" "}
          <span className="bg-gray-200 p-1 rounded-md">{orders?.length}</span>
        </h1>
      </div>
      <div className="flex items-center justify-between bg-gray-200 p-2 rounded-md overflow-x-auto">
        <div className="flex gap-2 md:gap-5 ">
          <button
            className={`w-[100px] h-[30px] rounded-md ${
              ordersFiltered === "all"
                ? "bg-white text-customblue"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setOrdersFiltered("all")}
          >
            {t("All")}
          </button>
          <button
            className={`w-[100px] h-[30px] rounded-md ${
              ordersFiltered === "pending"
                ? "bg-white text-customblue"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setOrdersFiltered("pending")}
          >
            {t("Pending")}
          </button>
          <button
            className={`w-[100px] h-[30px] rounded-md ${
              ordersFiltered === "processing"
                ? "bg-white text-customblue"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setOrdersFiltered("processing")}
          >
            {t("Processing")}
          </button>
          <button
            className={`w-[100px] h-[30px] rounded-md ${
              ordersFiltered === "delivered"
                ? "bg-white text-customblue"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setOrdersFiltered("delivered")}
          >
            {t("Delivered")}
          </button>
          <button
            className={`w-[100px] h-[30px] rounded-md ${
              ordersFiltered === "cancelled"
                ? "bg-white text-customblue"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setOrdersFiltered("cancelled")}
          >
            {t("Cancelled")}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-10 items-center justify-center w-full">
        {loading ? (
          <p className="text-base lg:text-xl text-black">Loading...</p>
        ) : (
          <>
            {orders.length === 0 ? (
              <p className="text-base lg:text-xl text-black">
                Don&apos;t have any orders
              </p>
            ) : (
              orders.map((order: OrderFromUserResponse) => (
                <div
                  key={order.id}
                  className="w-full bg-gray-200 border-l-4 border-gray-200 h-auto flex flex-col gap-5 p-5 rounded-md hover:border-l-4 hover:border-customblue hover:shadow-md"
                >
                  <div>
                    {order.status === "pending" ||
                    order.status === "processing" ||
                    order.status === "shipped" ? (
                      <div className="relative flex items-center gap-2">
                        <div className="relative top-0 left-0 size-3 rounded-full bg-customblue ">
                          <div className="absolute inset-0 rounded-full bg-customblue z-20 animate-ping [animation-duration:2s]"></div>
                          <div className="absolute inset-0 rounded-full bg-customblue z-10"></div>
                        </div>
                        <p className="text-base">
                          {t("Estimated delivery in 3-4 days")}
                        </p>
                      </div>
                    ) : (
                      <p
                        className={`text-base ${
                          order.status === "delivered"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {t(`${order.status}`).charAt(0).toUpperCase() +
                          t(`${order.status}`).slice(1)}
                      </p>
                    )}
                    <div className="w-full h-1 bg-white border border-gray-200" />
                  </div>
                  <div className="w-full flex flex-col md:flex-row items-center justify-between gap-1">
                    <div className="flex w-full gap-1 h-[150px] md:h-[110px]">
                      <div className="flex flex-col justify-center gap-5 bg-white rounded-sm h-full w-full p-2">
                        {order.order_items.slice(0, 1).map((item) => (
                          <div
                            className="flex items-center gap-2 w-full"
                            key={item.id}
                          >
                            <Image
                              src={item.book_image}
                              alt="Item"
                              width={50}
                              height={50}
                              className="object-cover"
                            />
                            <div>
                              <p className="text-base md:text-lg font-medium">
                                {item.book_title}
                              </p>
                              <p className="text-black font-bold text-sm md:text-base">
                                <span className="text-black/80 font-normal">
                                  {t("Quantity")}:
                                </span>{" "}
                                {item.quantity}
                              </p>
                              <p className="text-black font-bold text-sm md:text-base">
                                <span className="text-black/80 font-normal">
                                  {t("Price")}:
                                </span>{" "}
                                ${item.price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col items-center justify-center bg-white w-[200px] h-full rounded-sm p-2">
                        <p className="text-base font-medium">{t("Total")}</p>
                        <p className="text-xl font-bold text-customblue">
                          ${order.total}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full md:w-auto md:flex-col justify-between h-[50px] md:h-[110px]">
                      <button
                        onClick={() => (
                          setOrderDetailsModal(true),
                          setOrderDetailsId(order.id)
                        )}
                        className="w-[47%] md:w-[250px] text-xs md:text-base rounded-sm p-3 bg-customblue text-white hover:bg-blue-900"
                      >
                        {t("View order details")}
                      </button>
                      {(order.status === "pending" ||
                        order.status === "processing" ||
                        order.status === "shipped") && (
                        <button
                          onClick={() =>
                            handleCancelOrder(order.id, "cancelled")
                          }
                          className="w-[47%] md:w-[250px] text-xs md:text-base rounded-sm p-3 bg-white text-customblue border border-customblue hover:bg-customblue hover:text-white"
                        >
                          {t("Cancel order")}
                        </button>
                      )}
                      {(order.status === "delivered" ||
                        order.status === "cancelled") && (
                        <button
                          onClick={() => {
                            if (!user) return;
                            order.order_items.forEach((item) =>
                              handleAddToCart(
                                user.id,
                                item.book_id,
                                item.quantity
                              )
                            );
                            toast.success("Add all items to cart");
                          }}
                          className="w-[30%] md:w-[250px] text-xs md:text-base rounded-sm p-3 bg-white text-customblue border border-customblue hover:bg-customblue hover:text-white"
                        >
                          {t("Buy again")}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>

      {orderDetailsModal && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-5 w-[70%] max-w-[800px]">
            <h2 className="text-base lg:text-xl font-bold mb-4">
              {t("Order Details")}
            </h2>
            <div className="flex flex-col text-sm lg:text-base text-black/70">
              <div className="flex gap-5">
                <p>
                  {t("Created Date")}:{" "}
                  <span className="text-black font-medium">
                    {new Date(
                      ordersFilteredList[0].created_at
                    ).toLocaleDateString("en-GB")}
                  </span>{" "}
                </p>
                <p>
                  {t("Updated Date")}:{" "}
                  <span className="text-black font-medium">
                    {new Date(
                      ordersFilteredList[0].created_at
                    ).toLocaleDateString("en-GB")}{" "}
                  </span>
                </p>
              </div>
              <div>
                <p>
                  {t("Status")}:{" "}
                  <span className="text-customblue font-bold">
                    {t(`${ordersFilteredList[0].status}`)
                      .charAt(0)
                      .toUpperCase() +
                      t(`${ordersFilteredList[0].status}`).slice(1)}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 pt-4">
              {ordersFilteredList?.map((order) => (
                <div key={order.id} className="flex flex-col gap-5 pb-4">
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2 bg-gray-200 p-2 rounded-md shadow-md max-h-[300px] overflow-auto">
                      <h1 className="text-base lg:text-xl font-bold text-black">
                        {t("Order Items")}
                      </h1>
                      {order.order_items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between bg-white p-2 rounded-md shadow-md"
                        >
                          <div className="flex items-center gap-2">
                            <Image
                              src={item.book_image}
                              alt="Item"
                              width={70}
                              height={70}
                              className="w-[50px] h-[50px] lg:w-[70px] lg:h-[70px] object-cover"
                            />
                            <div className="flex flex-col">
                              <p className="text-sm lg:text-base font-medium">
                                {item.book_title}
                              </p>
                              <p className="text-sm lg:text-base text-gray-600">
                                {t("Quantity")}: {item.quantity}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm lg:text-base font-bold text-customblue">
                            {t("Price")}: ${item.price}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2 bg-gray-200 p-2 rounded-md shadow-md">
                      <h1 className="text-base lg:text-xl font-bold text-black">
                        {t("Order Summary")}
                      </h1>
                      <div className="flex items-center justify-between">
                        <div className="text-sm lg:text-base text-black">
                          <p>{t("Subtotal")}:</p>
                          <p>{t("Discount")}:</p>
                          <p>{t("Transfer Fee")}:</p>
                          <p className="text-base lg:text-xl text-customblue font-bold">
                            {t("Total")} ({order.order_items.length}{" "}
                            {t("items")}):
                          </p>
                        </div>
                        <div className="flex flex-col items-end text-sm lg:text-base text-black">
                          <p>${order.total}</p>
                          <p>$0.00</p>
                          <p>$0.00</p>
                          <p className="text-base lg:text-xl text-customblue font-bold">
                            ${order.total}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 items-end justify-end mt-2">
                    <button
                      onClick={() => {
                        if (!user) return;
                        order.order_items.forEach((item) =>
                          handleAddToCart(user.id, item.book_id, item.quantity)
                        );
                        toast.success("Add all items to cart");
                      }}
                      className="w-[30%] lg:w-[20%] h-[40px] rounded-md bg-customblue text-white text-sm lg:text-base "
                    >
                      {t("Buy again")}
                    </button>
                    <button
                      onClick={() => setOrderDetailsModal(false)}
                      className="w-[30%] lg:w-[20%] h-[40px] rounded-md bg-red-500 text-white text-sm lg:text-base "
                    >
                      {t("Close")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
