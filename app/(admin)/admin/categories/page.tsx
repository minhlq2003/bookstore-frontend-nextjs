"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import ListCategory from "./ListCategory";
import AddCategory from "./AddCategory";
import { Button, Input } from "antd";

export default function ProductPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const refreshCategories = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-full bg-white dark:bg-gray-900 flex flex-col items-center justify-start rounded-lg shadow-sm gap-4 px-4 pt-10">
      <div className="flex justify-between w-full ">
        <h1 className="ml-[10px] text-3xl font-bold">Quản lý danh mục</h1>

        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Tìm kiếm danh mục..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-600"
          />
          <Button className="px-4 py-5 items-center justify-center">
            <Search className="text-gray-600" />
          </Button>
        </div>
      </div>

      <div className="flex flex-row justify-between w-full gap-5">
        <AddCategory refreshData={refreshCategories} />
        <ListCategory />
      </div>
    </div>
  );
}
