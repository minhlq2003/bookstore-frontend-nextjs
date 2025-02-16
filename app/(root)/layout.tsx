"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import { Suspense } from "react";
import { I18nextProvider } from "react-i18next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LocaleProvider from "@/components/locale-provider";
import { i18nInstance } from "../../language/i18n";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <LocaleProvider>
            {() => (
              <I18nextProvider i18n={i18nInstance}>
                <Header />
                {children}
                <Footer />
              </I18nextProvider>
            )}
          </LocaleProvider>
        </Suspense>
      </body>
    </html>
  );
}
