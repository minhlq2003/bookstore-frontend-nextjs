import { Chart, ChartOptions, registerables } from "chart.js"
import { Line } from "react-chartjs-2"

Chart.register(...registerables)

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
}

const labels = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const data = {
  labels,
  datasets: [
    {
      label: "Mobile apps",
      tension: 0.4,
      // borderWidth: 0,
      pointRadius: 0,
      borderColor: "#1890FF",
      borderWidth: 3,
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
      maxBarThickness: 6,
    },
    {
      label: "Websites",
      tension: 0.4,
      // borderWidth: 0,
      pointRadius: 0,
      borderColor: "#B37FEB",
      borderWidth: 3,
      data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
      maxBarThickness: 6,
    },
  ],
}

export function LineChartCard() {
  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="pl-2">
          <p className="text-[#141414] text-base font-bold">Active User</p>

          <p className="text-[#8c8c8c] text-sm font-semibold pb-9">
            than last year
            {/* <span className={`text-sm font-bold ml-2 ${userData.stats >= 0 ? `text-[#52c41a]` : `text-[#f5222d]`}`}> */}
            <span className={`text-sm font-bold ml-2 text-[#52c41a]`}>+20%</span>
          </p>
        </div>

        <div>
          <div className="flex flex-row items-center gap-2">
            <div className="h-1 w-5 bg-[#1890ff] rounded-md" />
            <p className="text-[#8c8c8c] text-sm font-semibold">Traffic</p>
          </div>

          <div className="flex flex-row items-center gap-2">
            <div className="h-1 w-5 bg-[#B37FEB] rounded-md" />
            <p className="text-[#8c8c8c] text-sm font-semibold">User</p>
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
  )
}
