"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/sidebar";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { i18nInstance, initializeI18n } from "./language/i18n";
import { I18nextProvider } from "react-i18next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchParams = useSearchParams();
  const locale = searchParams.get("lang") ?? "vi";
  const [isI18nReady, setIsI18nReady] = useState(false);

  useEffect(() => {
    initializeI18n(locale).then(() => setIsI18nReady(true));
  }, [locale]);

  if (!isI18nReady) {
    return <div>Loading...</div>;
  }
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nextProvider i18n={i18nInstance}>
          <Sidebar />
          {children}
        </I18nextProvider>
      </body>
    </html>
  );
}
