"use client";

import { Book } from "@/constant/types";
import { deleteBook, getBooks } from "@/modules/services/bookService";
import { Button } from "antd";
import Modal from "antd/es/modal/Modal";
import Table, { ColumnsType, TablePaginationConfig } from "antd/es/table";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ListBook() {
  const [data, setData] = useState<Book[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalBooks, setTotalBooks] = useState(0);

  const showDeleteModal = (record: Book) => {
    setBookToDelete(record);
    setIsModalVisible(true);
  };

  const fetchBooks = async (pageNo: number, pageSize: number) => {
    const response = await getBooks({ page: pageNo, limit: pageSize });
    console.log("response", response);

    setData(response?.data ?? []);
    setTotalBooks(response?.total ?? 0);
  };

  useEffect(() => {
    fetchBooks(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handleDelete = () => {
    deleteBook(String(bookToDelete?.id ?? "")).then((result) => {
      console.log(result)
      setIsModalVisible(false);
      setBookToDelete(null);
      fetchBooks(currentPage, pageSize);
    });

  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current ?? 1);
    setPageSize(pagination.pageSize ?? 5);
  };

  const columns: ColumnsType<Book> = [
    {
      title: "Ảnh bìa",
      dataIndex: ["book_images", 0, "url"],
      key: "image",
      render: (url: string) => (
        <Image src={url ?? ""} alt="Book cover" width={100} height={100} />
      ),
    },
    { title: "Tên sách", dataIndex: "title", key: "title" },
    { title: "Tác giả", dataIndex: "author", key: "author" },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price.toLocaleString()} USD`,
    },
    { title: "Số trang", dataIndex: "pages", key: "pages" },
    { title: "Danh mục", dataIndex: "categories", key: "category", render: (categories: object) => categories.name},
    { title: "NXB", dataIndex: "publishers", key: "publishers", render: (publishers: object) => publishers.name},
    {
      title: "Giảm giá",
      key: "discount",
      render: (_, record) => {
        // Calculate discount percentage based on price and import_price
        if (record.price && record.import_price && Number(record.import_price) > 0) {
          const discountPercent = 100 - (Math.round((parseFloat(String(record.import_price)) / parseFloat(String(record.price))) * 100));
          return `${discountPercent}%`;
        }
        return "0%";
      },
    },
    { title: "Đã bán", dataIndex: "sold", key: "sold" },
    { title: "Năm xuất bản", dataIndex: "publish_year", key: "publish_year" },
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
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalBooks,
        }}
        onChange={handleTableChange}
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
