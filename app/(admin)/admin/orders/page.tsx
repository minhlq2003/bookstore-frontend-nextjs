"use client";

import { Button, Input } from "antd";
import { Search } from "lucide-react";
import { useState } from "react";
import ListOrder from "./ListOrder"; // ListOrder mình viết ở trên

export default function OrderPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-[85vh] bg-white dark:bg-gray-900 flex flex-col items-center justify-start rounded-lg shadow-sm gap-4 px-4 pt-10">
      <div className="flex justify-between w-full">
        <h1 className="ml-[10px] text-3xl font-bold">Quản lý đơn hàng</h1>

        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Tìm kiếm đơn hàng..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-2 rounded-md border border-gray-300 dark:border-gray-600"
          />
          <Button variant="outlined" className="h-[36px]">
            <Search className="text-gray-600" />
          </Button>
        </div>
      </div>

      <ListOrder searchTerm={searchTerm} />
    </div>
  );
}
