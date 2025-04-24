import { Button, Timeline } from "antd";
import { useState } from "react";

const DashboardTimeline = () => {
  const [reverse, setReverse] = useState(false);

  const handleClickReverse = () => {
    setReverse(!reverse);
  };

  return (
    <>
      <div className="pl-2 pb-4">
        <p className="text-[#141414] text-base font-bold">Orders History</p>

        <p className="text-[#8c8c8c] text-sm font-semibold pb-4">
          this month
          <span className={`text-sm font-bold ml-2 text-[#52c41a]`}>+20%</span>
        </p>
      </div>
      <Timeline
        items={[
          {
            color: "green",
            children: (
              <>
                <p>$2,400 - Redesign store</p>
                <p className="text-[#8C8C8C] text-xs font-bold leading-[1.125rem]">
                  09 JUN 7:20 PM
                </p>
              </>
            ),
          },

          {
            children: (
              <>
                <p>New order #3654323</p>
                <p className="text-[#8C8C8C] text-xs font-bold leading-[1.125rem]">
                  08 JUN 12:20 PM
                </p>
              </>
            ),
          },
          {
            children: (
              <>
                <p>Company server payments</p>
                <p className="text-[#8C8C8C] text-xs font-bold leading-[1.125rem]">
                  04 JUN 3:10 PM
                </p>
              </>
            ),
          },
          {
            children: (
              <>
                <p>New card added for order #4826321</p>
                <p className="text-[#8C8C8C] text-xs font-bold leading-[1.125rem]">
                  02 JUN 2:45 PM
                </p>
              </>
            ),
          },
          {
            children: (
              <>
                <p>Unlock folders for development</p>
                <p className="text-[#8C8C8C] text-xs font-bold leading-[1.125rem]">
                  18 MAY 1:30 PM
                </p>
              </>
            ),
          },
          {
            color: "gray",
            children: (
              <>
                <p>New order #46282344</p>
                <p className="text-[#8C8C8C] text-xs font-bold leading-[1.125rem]">
                  14 MAY 3:30 PM
                </p>
              </>
            ),
          },
          {
            // dot: <div className="ant-timeline-item-head ant-timeline-item-head-gray -left-1 -top-1"></div>,
            className: "border-[#40a9ff] !pb-0",
            pending: true,
            color: "#f0f0f0",
            children: <p className="">Recording...</p>,
          },
        ]}
        style={{
          color: "#141414",
          fontFamily: "Open Sans",
          fontWeight: 600,
          lineHeight: "21px",
        }}
        reverse={reverse}
      />

      <Button
        type="primary"
        className="w-full bg-[#1890ff] hover:!bg-[#40a9ff]"
        onClick={handleClickReverse}
      >
        REVERSE
      </Button>
    </>
  );
};

export default DashboardTimeline;
