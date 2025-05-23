import { clsx, type ClassValue } from "clsx";
import CountUp from "react-countup";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const FormatNumber = (value: number, prefix?: React.ReactNode) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(0)}m`;
  } else if (value >= 1000) {
    const thousands = Math.floor(value / 1000);
    const remainder = value % 1000;
    return ` ${prefix ?? ""}  ${thousands},${
      remainder > 0 ? Math.floor(remainder / 100) + `K` : ""
    }`;
  }
  return `${prefix ?? ""}${value.toString()}`;
};

export const NumberCountUp = (value: number, prefix?: string) => (
  <CountUp
    className="font-open_sans"
    end={value as number}
    separator=","
    prefix={prefix}
  />
);

export const HighlightText = (text: string, highlight: string = "") => {
  if (!highlight.trim() || !text) {
    return text;
  }

  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} style={{ backgroundColor: "#FDE68A" }}>
        {part}
      </span>
    ) : (
      part
    )
  );
};

export const tryParse = (jsonString: string) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
};

export function calcPercentDiff(prev: number, curr: number) {
  if (prev === 0) return 100;
  return Math.round(((curr - prev) / prev) * 100);
}
