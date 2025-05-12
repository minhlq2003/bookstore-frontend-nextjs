"use client";

import { useEffect, useState } from "react";
import { Button } from "antd";
import Modal from "antd/es/modal/Modal";
import Table, { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { getOrders } from "@/modules/services/orderService";
import { Order } from "@/constant/types";
import { getUserById } from "@/modules/services/userServices";
import { SorterResult } from "antd/es/table/interface";

interface ListOrderProps {
  searchTerm: string;
}
export default function ListOrder({ searchTerm }: ListOrderProps) {
  const [data, setData] = useState<Order[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalOrders, setTotalOrders] = useState(0);
  const [sortBy, setSortBy] = useState<string | undefined>();
  const [sortOrder, setSortOrder] = useState<string | undefined>();

  const showDeleteModal = (record: Order) => {
    setOrderToDelete(record);
    setIsModalVisible(true);
  };

  const fetchOrders = async (
    pageNo: number,
    pageSize: number,
    sortBy?: string,
    sortOrder?: string
  ) => {
    const response = await getOrders({
      page: pageNo,
      limit: pageSize,
      sortBy,
      sortOrder,
      search: searchTerm,
    });
    if (response?.data) {
      const ordersWithUsers = await Promise.all(
        response.data.map(async (order) => {
          const user = await getUserById(order.user_id || "");
          return { ...order, user };
        })
      );
      setData(ordersWithUsers);
      setTotalOrders(response?.total ?? 0);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage, pageSize, sortBy, sortOrder);
  }, [currentPage, pageSize, sortBy, sortOrder, searchTerm]);

  const handleDelete = async () => {
    if (orderToDelete) {
      // await deleteOrder(orderToDelete.id);
      setIsModalVisible(false);
      setOrderToDelete(null);
      fetchOrders(currentPage, pageSize, sortBy, sortOrder);
    }
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _: Record<string, unknown>,
    sorter: SorterResult<Order> | SorterResult<Order>[]
  ) => {
    setCurrentPage(pagination.current ?? 1);
    setPageSize(pagination.pageSize ?? 5);

    if (!Array.isArray(sorter)) {
      setSortBy((sorter.field as string) || undefined);
      if (sorter.order === "ascend") {
        setSortOrder("asc");
      } else if (sorter.order === "descend") {
        setSortOrder("desc");
      } else {
        setSortOrder(undefined);
      }
    }
  };

  const columns: ColumnsType<Order> = [
    {
      title: "Tên người nhận",
      dataIndex: ["user", "user", "name"],
      key: "receiverName",
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
      sorter: true,
      render: (total: number) => `${total.toLocaleString()} USD`,
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "createdAt",
      sorter: true,
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
