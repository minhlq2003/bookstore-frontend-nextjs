import { NumberCountUp } from "@/lib/helper";
import { Statistic } from "antd";

export const StatisticCard = ({
  title,
  value,
  icon,
  stats,
  prefix,
}: {
  title?: string;
  value?: number;
  // data?: Array<{ key: string; value: number }>
  icon?: React.ReactNode;
  prefix?: string;
  stats?: number;
}) => {
  return (
    <div className="bg-white p-4 rounded-xl border-none shadow-gray-200 shadow-lg hover:scale-105 transition-all duration-300">
      <div className="flex flex-row items-center justify-between h-full">
        <Statistic
          title={title}
          value={value}
          formatter={() => NumberCountUp(value ?? 0, prefix)}
          className="font-semibold text-[#171313] pb-2 font-open_sans"
          valueStyle={{
            fontSize: "1.875rem",
            color: "#141414",
            lineHeight: "30px",
            fontWeight: 700,
          }}
          suffix={
            stats && (
              <span
                className={`text-sm font-bold ml-2 font-open_sans ${
                  stats >= 0 ? `text-[#52c41a]` : `text-[#f5222d]`
                }`}
              >
                {stats >= 0 ? "+" : ""}
                {NumberCountUp(stats)}%
              </span>
            )
          }
        />

        {icon && (
          <div className="w-12 h-12 bg-[#1890ff] rounded-lg flex items-center justify-center text-xl self-center">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};
