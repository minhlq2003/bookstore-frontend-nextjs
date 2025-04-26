"use client";

import { useEffect, useState } from "react";
import { Button } from "antd";
import Modal from "antd/es/modal/Modal";
import Table, { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { getOrders } from "@/modules/services/orderService";
import { Order } from "@/constant/types";

export default function ListOrder() {
  const [data, setData] = useState<Order[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalOrders, setTotalOrders] = useState(0);

  const showDeleteModal = (record: Order) => {
    setOrderToDelete(record);
    setIsModalVisible(true);
  };

  const fetchOrders = async (pageNo: number, pageSize: number) => {
    const response = await getOrders({ page: pageNo, limit: pageSize });
    console.log("Orders response", response);

    setData(response?.data ?? []);
    setTotalOrders(response?.total ?? 0);
  };

  useEffect(() => {
    fetchOrders(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handleDelete = async () => {
    if (orderToDelete) {
      //await deleteOrder(orderToDelete.id);
      setIsModalVisible(false);
      setOrderToDelete(null);
      fetchOrders(currentPage, pageSize);
    }
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current ?? 1);
    setPageSize(pagination.pageSize ?? 5);
  };

  const columns: ColumnsType<Order> = [
    {
      title: "Tên người nhận",
      dataIndex: "receiverName",
      key: "receiverName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "receiverPhone",
      key: "receiverPhone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (method) => {
        switch (method) {
          case "CASH":
            return "Tiền mặt";
          case "BANK_TRANSFER":
            return "Chuyển khoản";
          default:
            return method;
        }
      },
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (status) => {
        switch (status) {
          case "PENDING":
            return "Chờ xác nhận";
          case "SHIPPING":
            return "Đang giao";
          case "COMPLETED":
            return "Hoàn thành";
          case "CANCELLED":
            return "Đã hủy";
          default:
            return status;
        }
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (total: number) => `${total.toLocaleString()} VND`,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          {/* <Button
            danger
            onClick={() => showDeleteModal(record)}
            style={{ marginRight: 8 }}
          >
            Xóa
          </Button> */}
          <Button type="primary">
            <a href={`/admin/orders/edit?id=${record.id}`}>Chi tiết</a>
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
          total: totalOrders,
        }}
        onChange={handleTableChange}
      />

      <Modal
        title="Xác nhận xóa đơn hàng"
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsModalVisible(false)}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
      >
        <p>Bạn có chắc chắn muốn xóa đơn hàng này không?</p>
      </Modal>
    </div>
  );
}
