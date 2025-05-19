"use client";

import { Image, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Images } from "../constant/images";
import { getFilteredMenuItems } from "./menuItems";
import { useTranslation } from "react-i18next";
interface MenuItem {
  key: string;
  label: string;
  path?: string;
  permissionKey?: string;
  parent?: string;
  hasPermission?: boolean;
  children: MenuItem[];
}

export const LayoutSider = ({
  collapsed,
  language,
}: {
  collapsed: boolean;
  language: string;
}) => {
  const { t } = useTranslation("common");
  const route = useRouter();
  const pathname = usePathname();

  const originalMenuItems = getFilteredMenuItems();
  const [menuItems, setMenuItems] = useState(originalMenuItems);

  useEffect(() => {
    const updatedMenuItems = originalMenuItems?.map((item) => ({
      ...item,
      label: t(item?.label ?? ""),
      children: item.children?.map((child) => ({
        ...child,
        label: t(child?.label ?? ""),
        key: child.key,
      })),
    })) as MenuItem[];

    setMenuItems(updatedMenuItems);
  }, [language, originalMenuItems, t]);

  if (!menuItems) return <div> Đang load menu</div>;

  return (
    <Sider
      trigger={null}
      theme="light"
      breakpoint="lg"
      width={220}
      collapsible
      collapsed={collapsed}
    >
      <div
        style={{
          height: 70,
          textAlign: "center",
          width: "100%",
          display: "flex",
          justifyItems: "center",
          alignItems: "center",
          padding: "0 1rem",
        }}
      >
        {collapsed ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              src={Images.banner.src}
              preview={false}
              alt="logo"
              style={{
                height: "32px",
                width: "32px",
                borderRadius: "99px",
                marginRight: "20px",
              }}
            />
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              src={Images.banner.src}
              preview={false}
              alt="logo"
              style={{
                height: "32px",
                width: "32px",
                borderRadius: "99px",
                marginRight: "20px",
              }}
            />
            <p style={{ fontSize: "16px", color: "#333", fontWeight: 600 }}>
              BOOK STORE
            </p>
          </div>
        )}
      </div>

      <Menu
        mode="inline"
        theme="light"
        items={menuItems}
        onClick={(info) => {
          route.push(`/admin/${info.key}`);
        }}
        selectedKeys={[`/${pathname.split("/")?.slice(2).join("/")}`]}
        style={{ minWidth: 0, flex: "auto" }}
      />
    </Sider>
  );
};
