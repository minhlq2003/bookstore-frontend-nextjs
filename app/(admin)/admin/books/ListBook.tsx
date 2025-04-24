"use client";

import { Book } from "@/constant/types";
import { mockBooks } from "@/data/bookData";
import { getBooks } from "@/modules/services/bookService";
import { Button } from "antd";
import Modal from "antd/es/modal/Modal";
import Table, { ColumnsType } from "antd/es/table";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ListBook() {
  const [data, setData] = useState<Book[]>(mockBooks);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  const showDeleteModal = (record: Book) => {
    setBookToDelete(record);
    setIsModalVisible(true);
  };

  const fetchBooks = async (pageNo: number, pageSize: number) => {
    const response = await getBooks({ page: pageNo, limit: pageSize });
    console.log("response", response);

    setData(response?.data ?? []);
  };

  useEffect(() => {
    fetchBooks(1, 10);
  }, []);

  const handleDelete = () => {
    setData((prev) => prev.filter((book) => book.id !== bookToDelete?.id));
    setIsModalVisible(false);
    setBookToDelete(null);
  };

  const columns: ColumnsType<Book> = [
    {
      title: "Ảnh bìa",
      dataIndex: "image",
      key: "image",
      render: (url: string) => <Image src={url} alt="Book cover" width={50} />,
    },
    { title: "Tên sách", dataIndex: "title", key: "title" },
    { title: "Tác giả", dataIndex: "author", key: "author" },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price.toLocaleString()} VND`,
    },
    { title: "Số trang", dataIndex: "pages", key: "pages" },
    { title: "Danh mục", dataIndex: "category", key: "category" },
    { title: "NXB", dataIndex: "publisher", key: "publisher" },
    {
      title: "Giảm giá",
      dataIndex: "discount",
      key: "discount",
      render: (d) => `${d}%`,
    },
    { title: "Đã bán", dataIndex: "sold", key: "sold" },
    { title: "Năm xuất bản", dataIndex: "publishYear", key: "publishYear" },
    {
      title: "Hành động",
      key: "action",
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
            <a href={`/admin/books/edit?id=${record.id}`}>Sửa</a>
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="w-full mt-5">
      <Table
        columns={columns}
        dataSource={data}
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
        <p>Bạn có chắc chắn muốn xóa sách này không?</p>
      </Modal>
    </div>
  );
}
