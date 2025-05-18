"use client";

import { Form, Input, InputNumber, Select, FormInstance } from "antd";
import React from "react";
import { Order } from "@/constant/types";
import { useTranslation } from "react-i18next";

const { TextArea } = Input;

const paymentOptions: { label: string; value: string }[] = [
  { label: "Tiền mặt (COD)", value: "COD" },
  { label: "Chuyển khoản", value: "BANK_TRANSFER" },
  { label: "Ví điện tử", value: "E_WALLET" },
];

const statusOptions: { label: string; value: string }[] = [
  { label: "Đang xử lý", value: "PENDING" },
  { label: "Đang giao", value: "SHIPPING" },
  { label: "Đã hoàn thành", value: "COMPLETED" },
  { label: "Đã hủy", value: "CANCELLED" },
  { label: "Đã giao hàng", value: "DELIVERED" },
  { label: "Đang xử lý", value: "PROCESSING" },
];

const OrderForm: React.FC<{
  form: FormInstance;
  onFinish: (values: Order) => void;
}> = ({ form, onFinish }) => {
  const { t } = useTranslation("common");
  const handleSubmit = () => {
    onFinish(form.getFieldsValue());
  };

  return (
    <Form
      form={form}
      name="orderForm"
      onFinish={handleSubmit}
      autoComplete="off"
      layout="vertical"
      className="w-full"
    >
      <div className="border border-[#d9d9d9] p-4 rounded-md">
        <div className="flex flex-row justify-between">
          <Form.Item
            name="username"
            label={t("Receiver Name")}
            rules={[
              { required: true, message: "Vui lòng nhập tên người nhận!" },
            ]}
            style={{ width: "48%" }}
          >
            <Input
              disabled
              placeholder="Nhập tên người nhận"
              className="custom-input"
            />
          </Form.Item>

          <Form.Item
            name="user_phone"
            label={t("Receiver Phone")}
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
            style={{ width: "48%" }}
          >
            <Input
              disabled
              placeholder="Nhập số điện thoại"
              className="custom-input"
            />
          </Form.Item>
        </div>

        <div className="flex flex-row justify-between">
          <Form.Item
            name="address"
            label={t("Address")}
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
            style={{ width: "48%" }}
          >
            <TextArea
              disabled
              rows={5}
              placeholder="Nhập địa chỉ giao hàng"
              className="custom-textarea"
            />
          </Form.Item>
          <div className="flex flex-col" style={{ width: "48%" }}>
            <Form.Item
              name="created_at"
              label={t("Order Date")}
              style={{ width: "100%" }}
            >
              <Input
                disabled
                placeholder="Nhập ngày đặt hàng"
                className="custom-input"
              />
            </Form.Item>
            {form.getFieldValue("status") === "delivered" && (
              <Form.Item
                name="updated_at"
                label={t("Delivery Date")}
                style={{ width: "100%" }}
              >
                <Input
                  disabled
                  placeholder="Nhập ngày cập nhật"
                  className="custom-input"
                />
              </Form.Item>
            )}
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <Form.Item
            name="payment_method"
            label={t("Payment Method")}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn phương thức thanh toán!",
              },
            ]}
            style={{ width: "48%" }}
          >
            <Select disabled placeholder="Chọn phương thức thanh toán">
              {paymentOptions.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label={t("Order Status")}
            rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
            style={{ width: "48%" }}
          >
            <Select placeholder="Chọn trạng thái đơn hàng">
              {statusOptions.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          name="total"
          label={t("Total Amount")}
          rules={[{ required: true, message: "Vui lòng nhập tổng tiền!" }]}
        >
          <InputNumber
            disabled
            min={0}
            placeholder="Nhập tổng tiền (VND)"
            className="custom-input w-full"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>
      </div>

      <Form.Item></Form.Item>
    </Form>
  );
};

export default OrderForm;
