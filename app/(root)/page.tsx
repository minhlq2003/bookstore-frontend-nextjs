"use server";

import { Metadata } from "next";
import { getBookById } from "@/modules/services/bookService";
import Home from "@/components/home-page";
import { Images } from "@/constant/images";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Greate Book | Nhà Sách Trực Tuyến`,
    description:
      "Great Book - Hệ thống nhà sách chuyên nghiệp. Đáp ứng tất cả các yêu cầu về sách, nhiều ưu đãi hấp dẫn, voucher miễn phí vận chuyển. Đặt mua ngay!",
    openGraph: {
      title: `Greate Book | Nhà Sách Trực Tuyến`,
      description:
        "Great Book - Hệ thống nhà sách chuyên nghiệp. Đáp ứng tất cả các yêu cầu về sách, nhiều ưu đãi hấp dẫn, voucher miễn phí vận chuyển. Đặt mua ngay!",
      images: [ { url: Images.logo.src } ],
    },
  };
}

export default async function Page() {
  return <Home />;
}
