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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-merriweather",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${merriweather.variable} antialiased font-merriweather`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <LocaleProvider>
            {() => (
              <I18nextProvider i18n={i18nInstance}>
                <Header />
                <HeroUIProvider>{children}</HeroUIProvider>
                <Footer />
              </I18nextProvider>
            )}
          </LocaleProvider>
        </Suspense>
      </body>
    </html>
  );
}
