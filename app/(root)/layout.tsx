"use client";
import { Geist, Geist_Mono, Merriweather } from "next/font/google";
import "../../globals.css";
import { Suspense } from "react";
import { I18nextProvider } from "react-i18next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LocaleProvider from "@/components/locale-provider";
import { i18nInstance } from "../../language/i18n";
import { HeroUIProvider } from "@heroui/react";
import { Toaster } from "sonner";
import ChatbotWidget from "@/components/chatbot-widget";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: [ "latin" ],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: [ "latin" ],
});

const merriweather = Merriweather({
  subsets: [ "latin" ],
  weight: [ "300", "400", "700" ],
  variable: "--font-merriweather",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Great Book | Nhà Sách Trực Tuyến</title>
        <meta
          name="description"
          content="Great Book - Hệ thống nhà sách chuyên nghiệp. Đáp ứng tất cả các yêu cầu về sách, nhiều ưu đãi hấp dẫn, voucher miễn phí vận chuyển. Đặt mua ngay!"
        />
        <meta name="og:title" content="Greate Book | Nhà Sách Trực Tuyến" />
        <meta
          name="og:description"
          content="Great Book - Hệ thống nhà sách chuyên nghiệp. Đáp ứng tất cả các yêu cầu về sách, nhiều ưu đãi hấp dẫn, voucher miễn phí vận chuyển. Đặt mua ngay!"
        />
        <meta
          name="og:image"
          content="https://bookstore-frontend-nextjs.vercel.app/_next/static/media/logo_greatbook.1f95abfc.webp"
        />
        <link
          rel="icon"
          type="image/x-icon"
          href="https://bookstore-frontend-nextjs.vercel.app/_next/static/media/logo_greatbook.1f95abfc.webp"
        />
        <script id="headerScripts" />
      </head>
      <body
        className={ `${geistSans.variable} ${geistMono.variable} ${merriweather.variable} antialiased font-merriweather` }
      >
        <Suspense fallback={ <div>Loading...</div> }>
          <LocaleProvider>
            { () => (
              <I18nextProvider i18n={ i18nInstance }>
                <Header />
                <HeroUIProvider>
                  <Toaster richColors position="top-center" duration={ 2000 } />
                  { children }
                </HeroUIProvider>
                <Footer />
                <ChatbotWidget />
              </I18nextProvider>
            ) }
          </LocaleProvider>
        </Suspense>
      </body>
    </html>
  );
}
