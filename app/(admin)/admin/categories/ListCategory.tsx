"use client";

import { useState, useEffect } from "react";
import { Category } from "@/constant/types";
import { Button, Modal } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { getCategories } from "@/modules/services/categoryService";

export default function ListCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );

  const fetchCategories = async (pageNo: number, pageSize: number) => {
    const response = await getCategories({ page: pageNo, limit: pageSize });
    setCategories(response?.data ?? []);
  };

  useEffect(() => {
    fetchCategories(1, 10);
  }, []);

  const showDeleteModal = (record: Category) => {
    setCategoryToDelete(record);
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    // Need call API delete
    setCategories((prev) =>
      prev.filter((category) => category.id !== categoryToDelete?.id)
    );
    setIsModalVisible(false);
    setCategoryToDelete(null);
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
            <a href={`/admin/categories/edit?id=${record.id}`}>Sửa</a>
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
