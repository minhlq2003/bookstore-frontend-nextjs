"use client";

import { BarChartCard } from "@/components/Chart/bar-chart-card";
import { LineChartCard } from "@/components/Chart/line-chart-card";
import { DashboardTable } from "@/components/Dashboard/dashboard-table";
import DashboardTimeline from "@/components/Dashboard/dashboard-timeline";
import { StatisticCard } from "@/components/Dashboard/statistic-card";
import {
  CurrencyIcon,
  HeartIcon,
  ShoppingIcon,
  TeamIcon,
} from "@/components/svg/DefaultSVG";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const dashboardData = [
  {
    title: "Today’s Sales",
    value: 53000,
    icon: <CurrencyIcon />,
    stats: 30,
    prefix: "$",
  },
  {
    title: "Today’s Users",
    value: 3200,
    icon: <TeamIcon />,
    stats: 20,
  },
  {
    title: "New Clients",
    value: 1200,
    icon: <HeartIcon />,
    stats: -20,
    prefix: "+",
  },
  {
    title: "New Orders",
    value: 13200,
    icon: <ShoppingIcon />,
    stats: 10,
    prefix: "$",
  },
];

const userData = dashboardData[0];

export default function Dashboard() {
  return (
    <div className="w-full h-full space-y-6 font-open_sans">
      <div className="grid grid-cols-4 gap-6">
        {dashboardData.map((item, index) => (
          <StatisticCard
            key={index}
            title={item.title}
            value={item.value}
            icon={item.icon}
            stats={item.stats}
            prefix={item.prefix}
          />
        ))}
      </div>

      <div className="flex flex-row gap-6 h-full">
        <div className="bg-white rounded-xl border-none shadow-gray-200 shadow-lg p-4 h-full w-1/2">
          <BarChartCard />
        </div>

        <div className="bg-white rounded-xl border-none shadow-gray-200 shadow-lg p-4 w-1/2">
          <LineChartCard />
        </div>
      </div>

      <div className="w-full flex flex-row gap-6">
        <div className="bg-white rounded-xl border-none shadow-gray-200 shadow-lg pt-4 h-full w-full">
          <DashboardTable />
        </div>

        <div className="bg-white rounded-xl border-none shadow-gray-200 shadow-lg p-4 w-full max-w-[564px]">
          <DashboardTimeline />
        </div>
      </div>

      <div className="flex flex-row h-full gap-6">
        <div className="bg-white rounded-xl border-none shadow-gray-200 shadow-lg p-4 h-full w-full flex flex-row gap-2 justify-between">
          <div className="flex flex-col justify-between">
            <div>
              <h6 className="text-[#8c8c8c] text-base font-bold leading-6">
                Built by developers{" "}
              </h6>

              <p className="text-[#141414] text-xl font-bold leading-[30px] pb-2.5">
                Muse Dashboard for Ant Design
              </p>

              <p className="text-[#8c8c8c] text-base pb-4 w-full -tracking-[0.3px]">
                From colors, cards, typography to complex elements, you will
                find the full documentation.
              </p>
            </div>

            <Link
              href="#"
              className="text-[#1890ff] font-semibold leading-[21px] flex flex-row gap-1 items-center"
            >
              Read More <ChevronRight size={13} strokeWidth={3} />
            </Link>
          </div>

          <div className="h-[220px] w-[220px] relative shadow-gray-200 shadow-lg">
            <Image
              alt=""
              className="rounded-lg object-cover"
              fill
              src="https://demos.creative-tim.com/muse-vue-ant-design-dashboard/images/info-card-1.jpg"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border-none shadow-gray-200 shadow-lg p-4 w-full max-w-[710px]">
          <div className="bg-[url(https://demos.creative-tim.com/muse-vue-ant-design-dashboard/images/info-card-2.jpg)] rounded-lg p-6 h-full flex flex-col justify-between bg-cover">
            <div>
              <p className="text-xl font-bold text-white leading-[30px] pb-2.5">
                Work with the best
              </p>
              <p className="leading-6 text-white text-base pb-4 -tracking-[0.3px]">
                Wealth creation is an evolutionarily recent positive-sum game.
                It is all about who take the opportunity first.
              </p>
            </div>
            <Link
              href="#"
              className="text-white font-semibold leading-[21px] flex flex-row gap-1 items-center"
            >
              Read More <ChevronRight size={13} strokeWidth={3} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
