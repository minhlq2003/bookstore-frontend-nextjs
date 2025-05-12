"use client";

import ListOrder from "@/modules/order/ListOrder";
import { Button, Input, Select } from "antd";
import { Search } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function OrderPage() {
  const { t } = useTranslation("common");
  const [searchTerm, setSearchTerm] = useState("");

  const handleStatusChange = (value: string) => {
    setSearchTerm(value);
  };
  const orderStatusOptions = [
    { value: "", label: "All status" },
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ];

  return (
    <div className="min-h-[85vh] bg-white dark:bg-gray-900 flex flex-col items-center justify-start rounded-lg shadow-sm gap-4 px-4 pt-10">
      <div className="flex justify-between w-full">
        <h1 className="ml-[10px] text-3xl font-bold">{t("Orders")}</h1>

        <div className="flex gap-2">
          <Select
            placeholder="Chọn trạng thái đơn hàng..."
            options={orderStatusOptions}
            value={searchTerm}
            onChange={handleStatusChange}
            className="w-[200px]"
          />
        </div>
      </div>

      <ListOrder searchTerm={searchTerm} />
    </div>
  );
}
