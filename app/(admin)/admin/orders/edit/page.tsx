"use client";

import { Button, Form, message, Space, Spin } from "antd";
import Title from "antd/es/typography/Title";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { CheckCircleIcon } from "lucide-react";

import OrderForm from "../OrderForm";
import { Order } from "@/constant/types";
import { getOrderById } from "@/modules/services/orderService";

const EditOrder = () => {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const handleFetchOrder = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        const res = await getOrderById(id);
        setOrder(res?.data || null);
      } catch (error) {
        message.error("Không thể tải thông tin đơn hàng.");
      } finally {
        setLoading(false);
      }
    },
    [form]
  );

  const onFinish = async (values: Order) => {
    const dataPayload = {
      receiverName: values.receiverName,
      receiverPhone: values.receiverPhone,
      address: values.address,
      paymentMethod: values.payment_method,
      orderStatus: values.orderStatus,
      total: Number(values.total),
    };

    try {
      if (id) {
        //await updateOrder(id, dataPayload);
      } else {
        message.error("Order ID không hợp lệ.");
      }
      message.success("Cập nhật đơn hàng thành công!");
      form.resetFields();
      router.push("/admin/orders");
    } catch {
      message.error("Cập nhật đơn hàng thất bại. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    if (id) {
      handleFetchOrder(id);
    }
  }, [id, handleFetchOrder]);

  useEffect(() => {
    if (order) {
      form.setFieldsValue(order);
    }
  }, [order, form]);

  return (
    <div className="min-h-[85vh] bg-white dark:bg-gray-900 flex flex-col items-center justify-start rounded-lg shadow-sm gap-4 px-4 pt-10">
      {loading ? (
        <div className="flex items-center justify-center min-h-[500px]">
          <Spin size="large" />
        </div>
      ) : (
        <div className="p-4 w-full">
          <Space>
            <Title level={2}>Chỉnh sửa đơn hàng</Title>
          </Space>
          <div className="flex justify-between">
            <OrderForm form={form} onFinish={onFinish} />
          </div>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => onFinish(form.getFieldsValue())}
            icon={<CheckCircleIcon />}
          >
            Lưu thay đổi
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditOrder;
