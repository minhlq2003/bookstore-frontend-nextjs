"use client";

import { Layout, message } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LayoutSider } from "@/components/Sider";
import { I18nextProvider, useTranslation } from "react-i18next";
import LocaleProvider from "@/components/locale-provider";
import { i18nInstance } from "@/language/i18n";
import HeaderCMS from "@/components/header-cms";
import "../../../globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation("common");
  const [collapsed, setCollapsed] = useState(false);

  const [userAvatar, setUserAvatar] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user || !user.id) {
        router.push("/signin");
      } else {
      }
    }
  }, [router]);

  return (
    <html lang={"en"}>
      <head>
        <title>Admin | Book Store</title>
      </head>
      <body>
        <Suspense>
          <LocaleProvider>
            {() => (
              <I18nextProvider i18n={i18nInstance}>
                <Layout className="layout" id="mtb-erp-app">
                  <LayoutSider collapsed={collapsed} language={"en"} />
                  <Layout>
                    <HeaderCMS
                      collapsed={collapsed}
                      setCollapsed={setCollapsed}
                      userAvatar={userAvatar}
                    />
                    <Content style={styles.content}>
                      <Breadcrumbs />
                      <Layout
                        className="site-layout-background rounded-[8px]"
                        style={styles.layout}
                      >
                        <Content
                          style={{
                            padding: "0 12px",
                            overflowY: "scroll",
                            height: "calc(100vh - 210px)",
                          }}
                        >
                          {children}
                        </Content>
                      </Layout>
                    </Content>
                    <Footer style={{ textAlign: "center" }}>
                      {t("Copyright ©2025 - Ly Quoc Minh")}
                    </Footer>
                  </Layout>
                </Layout>
              </I18nextProvider>
            )}
          </LocaleProvider>
        </Suspense>
      </body>
    </html>
  );
}

const styles = {
  content: { padding: "0 32px", minHeight: "calc(100vh - 134px)" },
  layout: { padding: "12px 0", borderRadius: "0.5rem" },
};
