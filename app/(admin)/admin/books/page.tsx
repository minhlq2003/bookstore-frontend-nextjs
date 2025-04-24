"use client";

import { Button, Input } from "antd";
import ListBook from "./ListBook";

import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProductPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-[85vh] bg-white dark:bg-gray-900 flex flex-col items-center justify-start rounded-lg shadow-sm gap-4 px-4 pt-10">
      <div className="flex justify-between w-full ">
        <h1 className="ml-[10px] text-3xl font-bold">Quản lý sách</h1>

        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Tìm kiếm sách..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-600"
          />
          <Button variant="outlined">
            <Search className="text-gray-600" />
          </Button>

          <Link href="/admin/books/add">
            <Button variant="filled">Thêm sách mới</Button>
          </Link>
        </div>
      </div>

      <ListBook />
    </div>
  );
}
