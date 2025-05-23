"use client";

import { Button, Progress, Radio, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { getBookStatistics } from "@/modules/services/statisticService";

type BookStat = {
  id: number;
  title: string;
  author: string;
  total_sold: number;
};

export const DashboardTable = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState<BookStat[]>([]);
  const [period, setPeriod] = useState<"week" | "month" | "year">("week");

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await getBookStatistics(period);
        setTableData(res.data);
      } catch (error) {
        console.error("Error fetching book stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [period]);

  const columns: TableProps<BookStat>["columns"] = [
    {
      title: "TITLE",
      dataIndex: "title",
      key: "title",
      width: "40%",
      render: (title: string) => (
        <span className="font-semibold text-[#141414]">{title}</span>
      ),
    },
    {
      title: "AUTHOR",
      dataIndex: "author",
      key: "author",
      width: "30%",
      render: (author: string) => (
        <span className="text-[#8c8c8c] text-sm font-medium">{author}</span>
      ),
    },
    {
      title: "TOTAL SOLD",
      dataIndex: "total_sold",
      key: "total_sold",
      width: "30%",
      render: (total_sold: number) => (
        <span className="text-sm font-bold text-[#1890ff]">{total_sold}</span>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-row justify-between px-4">
        <div className="pl-2">
          <p className="text-[#141414] text-base font-bold">Best Sellers</p>
          <p className="text-[#8c8c8c] text-sm font-semibold pb-4">
            Based on {period}
          </p>
        </div>

        <Radio.Group
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          options={[
            { label: "WEEK", value: "week" },
            { label: "MONTH", value: "month" },
            { label: "YEAR", value: "year" },
          ]}
          optionType="button"
        />
      </div>

      <Table
        columns={columns}
        dataSource={tableData}
        rowKey="id"
        className="bg-white rounded-none h-full"
        pagination={false}
        loading={loading}
      />
    </>
  );
};
