"use client";

import { useState, useEffect } from "react";
import { Category } from "@/constant/types";
import { mockCategories } from "@/data/categoryData";
import { Button, Modal } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { getCategories, getCategoryById } from '@/modules/services/categoryService'

export default function ListCategory() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categoryToDelete, setBookToDelete] = useState<Category | null>(null);

  const fetchCategories = async (pageNo: number, pageSize: number) => {
    const response = await getCategories({ page: pageNo, limit: pageSize });
    console.log("response", response);

    setCategories(response?.data ?? []);
  };

  useEffect(() => {
    fetchCategories(1, 10);
  }, []);

  const showDeleteModal = (record: Category) => {
    setBookToDelete(record);
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    setCategories((prev) =>
      prev.filter((category) => category.id !== categoryToDelete?.id)
    );
    setIsModalVisible(false);
    setBookToDelete(null);
  };

  const columns: ColumnsType<Category> = [
    { title: "ID", dataIndex: "id", key: "id", width: 120 },
    { title: "Tên danh mục", dataIndex: "name", key: "name" },
    { title: "Slug", dataIndex: "slug", key: "slug" },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Tạo lúc",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Hành động",
      key: "action",
      width: 200,
      render: (_, record) => (
        <>
          <Button
            danger
            onClick={() => showDeleteModal(record)}
            style={{ marginRight: 8 }}
          >
            Xóa
          </Button>
          <Button type="primary">
            <a href={`/admin/category/edit?id=${record.id}`}>Sửa</a>
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="w-full mt-5">
      <Table
        columns={columns}
        dataSource={categories}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="Xác nhận xóa"
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsModalVisible(false)}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
      >
        <p>Bạn có chắc chắn muốn xóa danh mục này không?</p>
      </Modal>
    </div>
  );
}
