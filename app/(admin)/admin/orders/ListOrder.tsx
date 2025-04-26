"use client";

import { useEffect, useState } from "react";
import { Button } from "antd";
import Modal from "antd/es/modal/Modal";
import Table, { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { getOrders } from "@/modules/services/orderService";
import { Order } from "@/constant/types";
import { getUserById } from "@/modules/services/userServices";

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
    if (response?.data) {
      const ordersWithUsers = await Promise.all(
        response.data.map(async (order) => {
          const user = await getUserById(order.user_id || "");
          return { ...order, user }; // Gắn thông tin người dùng vào đơn hàng
        })
      );
      setData(ordersWithUsers);
      console.log("ordersWithUsers", ordersWithUsers);

      setTotalOrders(response?.total ?? 0);
    }
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
      dataIndex: ["user", "user", "name"],
      key: "receiverName",
      //render: (user) => (user ? `${user.user.username}` : "Unknown User"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "user",
      key: "receiverPhone",
      render: (user) =>
        user ? `${user.user.addresses[0].receiver_phone}` : "Unknown User",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "payment_method",
      key: "paymentMethod",
      render: (method) => {
        switch (method) {
          case "CASH":
            return "Tiền mặt";
          case "CARD":
            return "Chuyển khoản";
          default:
            return method;
        }
      },
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "status",
      key: "orderStatus",
      render: (status) => {
        switch (status) {
          case "delivered":
            return "Đã giao hàng";
          case "shipped":
            return "Đang giao";
          case "processing":
            return "Đang xử lý";
          case "cancelled":
            return "Đã hủy";
          case "pending":
            return "Chờ xác nhận";
          default:
            return status;
        }
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (total: number) => `${total.toLocaleString()} USD`,
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
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
