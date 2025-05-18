"use client";
import ModalCheckoutSuccess from "@/components/modal-checkout-success";
import { Address, CartResponse, User } from "@/constant/types";
import { checkout } from "@/modules/services/cartService";
import {
  addNewAddress,
  getAllAddressByUserId,
} from "@/modules/services/userServices";
import { faCheck, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const page = () => {
  const { t } = useTranslation("common");
  const [orderItems, setOrderItems] = useState<CartResponse[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [isOpenModalSuccess, setIsOpenModalSuccess] = useState(false);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        toast.error("Failed to parse user from localStorage");
      }
    }
  }, []);

  useEffect(() => {
    const tempOrder = localStorage.getItem("tempOrder");
    if (tempOrder) {
      try {
        const parsedOrder: CartResponse[] = JSON.parse(tempOrder);
        setOrderItems(parsedOrder);
      } catch (error) {
        toast.error("Failed to parse tempOrder from localStorage");
      }
    } else {
      toast.error("No tempOrder found in localStorage");
    }
  }, []);

  const getUserAddress = async (userId: number) => {
    try {
      const response = await getAllAddressByUserId(userId);
      if (response) {
        setAddresses(response.data.address);
      }
    } catch (error) {
      toast.error("Failed to get data");
    }
  };

  useEffect(() => {
    if (user) {
      getUserAddress(user.id);
    }
  }, [user]);

  const subtotal = orderItems.reduce((acc, item) => {
    const price = parseFloat(item.book.price);
    return acc + item.quantity * (isNaN(price) ? 0 : price);
  }, 0);

  const handleAddNewAddress = async (
    userId: number,
    address: String,
    receiverName: String,
    receiverPhone: String
  ) => {
    if (!address || !receiverName || !receiverPhone) {
      toast.error(t("Please fill all fields."));
      return;
    }
    try {
      const response = await addNewAddress(
        userId,
        address,
        receiverName,
        receiverPhone
      );
      if (response?.success) {
        toast.success(t("New address added successfully"));
        setIsModalOpen(false);
        getUserAddress(userId);
      }
    } catch (error) {
      toast.error("Error when add new address");
    }
  };

  const handleConfirm = async (
    userId: number,
    address: String,
    paymentMethod: string
  ) => {
    if (!address || !paymentMethod) {
      toast.error(t("Please choose address and payment method"));
      return;
    }
    const response = await fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: "[GREAT BOOK] Đặt hàng thành công",
        emailTo: user?.email,
        content: `
  <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
    <h2 style="color: #0b3d91;">[GREAT BOOK] Đặt hàng thành công</h2>
    <p><strong>Thông tin đơn hàng:</strong></p>
    <ul>
      <li><strong>Họ và tên:</strong> ${user?.name}</li>
      <li><strong>Địa chỉ:</strong> ${selectedAddress}</li>
      <li><strong>Số điện thoại:</strong> ${receiverPhone}</li>
      <li><strong>Phương thức thanh toán:</strong> ${paymentMethod}</li>
      <li><strong>Ngày đặt hàng:</strong> ${new Date().toLocaleDateString(
        "en-GB"
      )}</li>
    </ul>
    <p><strong>Sản phẩm đã đặt:</strong></p>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background-color: #f2f2f2;">
          <th style="border: 1px solid #ddd; padding: 8px;">Tên sách</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Số lượng</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Giá</th>
        </tr>
      </thead>
      <tbody>
        ${orderItems
          .map(
            (item) => `
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.book.title}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.book.price}$</td>
              </tr>`
          )
          .join("")}
      </tbody>
    </table>
    <p style="margin-top: 20px;"><strong>Tổng tiền:</strong> ${subtotal.toFixed(
      2
    )}$</p>
    <p>Cảm ơn bạn đã mua hàng tại GREAT BOOK!</p>
  </div>
`,
      }),
    });
    try {
      const response = await checkout(userId, address, paymentMethod);
      if (response?.success) {
        setIsOpenModalSuccess((prev) => !prev);
      }
    } catch (error) {
      toast.error("Error when confirm checkout");
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto h-screen py-10 md:py-20 lg:py-24 bg-white">
      <h1 className=" text-center text-base md:text-xl lg:text-3xl py-3 text-darkblue font-bold uppercase">
        {t("Checkout")}
      </h1>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
        <div className="flex flex-col gap-5  w-full">
          <div className="border rounded-lg p-4 shadow-md w-full bg-white ">
            <div className="flex items-center justify-between border-b pb-2 font-semibold text-xs lg:text-base">
              <span>{t("Delivery Address")}</span>
            </div>
            <div>
              {addresses.map((item: Address) => (
                <div key={item.id} className="flex gap-2">
                  <input
                    type="radio"
                    name="selectedAddress"
                    value={item.address}
                    checked={selectedAddress === item.address}
                    onChange={() => setSelectedAddress(item.address)}
                  />
                  <p>{item.address}</p>
                </div>
              ))}
              <button
                className="w-6 h-6 rounded-sm bg-blue-600 mt-2"
                onClick={() => setIsModalOpen(true)}
              >
                +
              </button>
              {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
                    <h2 className="text-lg font-bold mb-4">
                      {t("Enter Address Information")}
                    </h2>

                    <input
                      type="text"
                      placeholder={t("Address")}
                      className="w-full border p-2 rounded mb-2"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder={t("Receiver Name")}
                      className="w-full border p-2 rounded mb-2"
                      value={receiverName}
                      onChange={(e) => setReceiverName(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder={t("Receiver Phone")}
                      className="w-full border p-2 rounded mb-4"
                      value={receiverPhone}
                      onChange={(e) => setReceiverPhone(e.target.value)}
                    />

                    <div className="flex justify-end gap-2">
                      <button
                        className="bg-red-600 px-4 py-2 rounded"
                        onClick={() => setIsModalOpen(false)}
                      >
                        {t("Cancel")}
                      </button>
                      <button
                        onClick={() =>
                          handleAddNewAddress(
                            Number(user?.id),
                            address,
                            receiverName,
                            receiverPhone
                          )
                        }
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        {t("Add")}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="border rounded-lg p-4 shadow-md w-full bg-white">
            <div className="flex items-center justify-between border-b pb-2 font-semibold text-xs lg:text-base">
              <span>{t("Payment Method")}</span>
            </div>
            <div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="CASH"
                  checked={paymentMethod === "CASH"}
                  onChange={() => setPaymentMethod("CASH")}
                />
                <p>{t("Pay when received package")}</p>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="CARD"
                  checked={paymentMethod === "CARD"}
                  onChange={() => setPaymentMethod("CARD")}
                />
                <p>{t("Card")}</p>
              </div>
            </div>
          </div>
          {paymentMethod === "CARD" && (
            <div className="border rounded-lg p-4 shadow-md w-full bg-white mt-4">
              <p className="uppercase text-red-600 underline font-bold text-6xl">
                Day la cho de gan stripe, Ban se thay no neu Card duoc checked
              </p>
            </div>
          )}
        </div>
        <div className="py-3 mt-10 md:mt-0 md:mx-3 md:mr-3 px-5 text-black rounded md:w-[40%] bg-white border shadow-md">
          <div className="mt-3 flex flex-col gap-1">
            <div className="flex justify-between text-xs lg:text-base">
              <span>{t("Name")}:</span>
              <span>{user?.name}</span>
            </div>
            <div className="flex justify-between font-bold text-lg lg:text-xl my-2">
              <span>{t("Total")}:</span>
              <span className="text-darkblue">${subtotal.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={() =>
              handleConfirm(
                Number(user?.id),
                selectedAddress || "",
                paymentMethod
              )
            }
            className="bg-blue text-white w-full h-7 md:h-9 lg:h-12 rounded-lg"
          >
            {t("Confirm")}
          </button>
        </div>
      </div>
      {isOpenModalSuccess && (
        <ModalCheckoutSuccess
          date={new Date().toLocaleDateString("en-GB")}
          address={new String(selectedAddress ?? "")}
          name={user?.name ? user.name.toString() : ""}
          total={subtotal}
          numberOfItem={orderItems.length}
        />
      )}
    </div>
  );
};

export default page;
