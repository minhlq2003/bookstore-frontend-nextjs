import { Select } from "antd";
import { Chart, ChartOptions, registerables } from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(...registerables);

export const options: ChartOptions<"line"> = {
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
      border: {
        dash: [6],
        dashOffset: 6,
      },
      grid: {
        display: true,
        color: "rgba(0, 0, 0, .2)",
      },
      ticks: {
        // suggestedMin: 0,
        // suggestedMax: 1000,
        display: true,
        color: "#8C8C8C",
        font: {
          size: 14,
          lineHeight: 1.8,
          weight: 600,
          family: "Open Sans",
        },
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        display: true,
        color: "#8C8C8C",
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

type LineChartCardProps = {
  monthlyData: number[];
  selectedYear: number;
  onYearChange: (year: number) => void;
};

export function LineChartCard({
  monthlyData,
  selectedYear,
  onYearChange,
}: LineChartCardProps) {
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Orders",
        tension: 0.4,
        pointRadius: 0,
        borderColor: "#1890FF",
        borderWidth: 3,
        data: monthlyData,
      },
    ],
  };
  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="pl-2 flex flex-row gap-4">
          <p className="text-[#141414] text-base font-bold">Order In</p>
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

        <div>
          <div className="flex flex-row items-center gap-2">
            <div className="h-1 w-5 bg-[#1890ff] rounded-md" />
            <div className="flex justify-between items-center mb-4">
              <p className="text-[#141414] text-base font-bold">Total Orders</p>
            </div>
          </div>
        </div>
      </div>

      <div
        style={
          {
            // background: "linear-gradient(to right, #00369E, #005CFD, #A18DFF )",
          }
        }
        className="rounded-xl h-[310px] w-full"
      >
        <Line options={options} data={data} />
      </div>
    </>
  );
}
