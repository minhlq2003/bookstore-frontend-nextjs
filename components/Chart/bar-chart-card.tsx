import { FormatNumber } from "@/lib/helper";
import { Select } from "antd";
import { Chart, ChartOptions, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(...registerables);
const summaryDataChart = [
  {
    value: 3600,
    title: "Users",
  },
  {
    value: 2242220,
    title: "Clicks",
  },
  {
    value: 772,
    title: "Sales",
    prefix: "$",
  },
  {
    value: 82,
    title: "Items",
  },
];

export const options: ChartOptions<"bar"> = {
  layout: {
    padding: {
      top: 30,
      right: 15,
      left: 10,
      bottom: 5,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      mode: "index",
      intersect: false,
    },
  },
  scales: {
    y: {
      type: "linear",
      border: {
        dash: [6, 6],
        dashOffset: 6,
      },
      grid: {
        color: "rgba(255, 255, 255, .2)",
      },
      ticks: {
        display: true,
        color: "#fff",
        font: {
          size: 14,
          lineHeight: 1.5,
          weight: 600,
          family: "Open Sans",
        },
      },
    },
    x: {
      type: "category",
      grid: {
        display: false,
      },
      ticks: {
        display: true,
        color: "#fff",
        font: {
          size: 14,
          lineHeight: 1.5,
          weight: 600,
          family: "Open Sans",
        },
      },
    },
  },
};

type BarChartCardProps = {
  monthlyData: number[];
  selectedYear: number;
  onYearChange: (year: number) => void;
};

export function BarChartCard({
  monthlyData,
  selectedYear,
  onYearChange,
}: BarChartCardProps) {
  const labels = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  const data = {
    labels,
    datasets: [
      {
        data: monthlyData,
        backgroundColor: "#fff",
        label: "Sales",
        borderWidth: 0,
        borderSkipped: false,
        borderRadius: 6,
        maxBarThickness: 20,
      },
    ],
  };

  return (
    <>
      <div
        style={{
          background: "linear-gradient(to right, #00369E, #005CFD, #A18DFF )",
        }}
        className="rounded-lg shadow-gray-200 shadow-lg h-[13.75rem] w-[42.375rem]"
      >
        <Bar options={options} data={data} />
      </div>
      <div className="flex gap-4 items-center pt-6">
        <p className="text-[#141414] text-base font-bold">Total Sales</p>
        <Select
          value={selectedYear}
          onChange={onYearChange}
          style={{ width: 120 }}
          options={[2022, 2023, 2024, 2025].map((year) => ({
            label: year.toString(),
            value: year,
          }))}
        />
      </div>
      <p className="text-[#8c8c8c] text-sm font-semibold pb-3.5">
        than last week
        {/* <span className={`text-sm font-bold ml-2 ${userData.stats >= 0 ? `text-[#52c41a]` : `text-[#f5222d]`}`}> */}
        <span className={`text-sm font-bold ml-2text-[#52c41a]`}>
          {/* {userData.stats >= 0 ? "+" : ""}
            {userData.stats}% */}
          +23%
        </span>
      </p>
      <p className="text-[#000000A6] text-sm pb-3.5">
        We have created multiple options for you to put together and customise
        into pixel perfect pages
      </p>

      <div className="grid grid-cols-4">
        {summaryDataChart.map((item, index) => (
          <div key={index} className="textcen">
            <p className="text-[#141414] font-bold text-2xl leading-9">
              {FormatNumber(item.value, item.prefix)}
            </p>
            <p className="text-[#000000A6] font-semibold text-sm">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
