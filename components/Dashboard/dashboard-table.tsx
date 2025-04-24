import { Button, Progress, Radio, Table, TableProps } from "antd";
import Image from "next/image";
import { useState } from "react";
import { DASHBOARD_TABLE_DATA } from "../../data/MOCKDATA";
import { UploadIcon } from "lucide-react";

export const DashboardTable = () => {
  const tableData = DASHBOARD_TABLE_DATA.data;
  const [loading, setLoading] = useState<boolean>(false);

  const columns: TableProps["columns"] = [
    {
      title: "COMPANIES",
      dataIndex: "company",
      key: "COMPANIES",
      width: "25%",
      render: (data, record, index) => {
        const id = data.replace("locations/", "");

        return (
          <div key={index} className="flex items-center gap-2.5">
            <Image src={record.image} alt="brand-logo" width={25} height={25} />
            <p className="font-semibold text-[#141414]">{id}</p>
          </div>
        );
      },
    },
    {
      title: "MEMBERS",
      dataIndex: ["member"],
      key: "MEMBERS",
      width: "25%",
      render: (data, _, index) => (
        <div key={index} className="flex flex-row relative">
          {data &&
            data.map(
              (
                item: {
                  avatar: string;
                },
                index: number
              ) => (
                <Image
                  key={index}
                  src={item.avatar}
                  alt="brand-logo"
                  width={25}
                  height={25}
                  style={{
                    zIndex: index,
                    left: `${index * 13}px`,
                  }}
                  className="absolute hover:scale-105 hover:!z-50 border-[1px] border-white rounded-full transition-all duration-200"
                />
              )
            )}
        </div>
      ),
    },

    {
      title: "BUDGET",
      dataIndex: "budget",
      key: "BUDGET",
      width: "25%",
      render: (data, _, index) => (
        <p className="font-bold text-[#8c8c8c] text-xs" key={index}>
          {data && data >= 0 ? `$${data}` : "Not Set"}
        </p>
      ),
    },
    {
      title: "COMPLETION",
      dataIndex: "completion",
      key: "COMPLETION",
      width: "25%",
      render: (data, _, index) => {
        const color =
          data && (data == 100 ? "#52c41a" : data >= 0 ? "#1890ff" : "#f5222d");

        const percent = data < 0 ? 100 : data;
        const label = data < 0 ? "Cancelled" : `${percent}`;

        return (
          <div className="h-6">
            <p className="text-xs font-bold text-[#8c8c8c] font-open_sans">
              {label}
            </p>
            <Progress
              key={index}
              type="line"
              percent={percent}
              showInfo={false}
              strokeColor={color}
              size={{
                height: 3,
              }}
              style={{
                position: "relative",
                top: "-30%",
              }}
            />
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className="flex flex-row justify-between px-4">
        <div className="pl-2">
          <p className="text-[#141414] text-base font-bold">Projects</p>

          <p className="text-[#8c8c8c] text-sm font-semibold pb-4">
            done this month
            {/* <span className={`text-sm font-bold ml-2 ${userData.stats >= 0 ? `text-[#1890ff]` : `text-[#f5222d]`}`}> */}
            <span className={`text-sm font-bold ml-2 text-[#1890ff]`}>
              +40%
            </span>
          </p>
        </div>

        <Radio.Group
          block
          options={[
            { label: "ALL", value: "ALL" },
            { label: "ONLINE", value: "ONLINE" },
            { label: "STORES", value: "STORES" },
          ]}
          defaultValue="ALL"
          optionType="button"
          prefixCls="custom-radio-group"
        />
      </div>

      <Table
        columns={columns}
        prefixCls="ant-table-custom"
        dataSource={tableData}
        rowKey={"companyCode"}
        className="bg-white rounded-none h-full"
        pagination={false}
        loading={loading}
      />

      <div className="p-4">
        <Button
          type="dashed"
          className="w-full flex flex-row gap-1 h-10 text-xs font-open_sans font-semibold text-[#000000a6] group "
        >
          <UploadIcon />
          Upload New Project
        </Button>
      </div>
    </>
  );
};
