import { Breadcrumb } from "antd";
import { split, startsWith, trimStart } from "lodash";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { MenuItem, menuItems } from "./menuItems";
import { useTranslation } from "react-i18next";

export const Breadcrumbs: FC = () => {
  const { t } = useTranslation("common");
  const pathname = usePathname();
  const parts = split(trimStart(pathname, "/admin/"), "/");
  const parent = menuItems.find(
    (e) => e.key && startsWith(parts[0], e.key as string)
  );
  let breadcrumb: { title: string }[] = [{ title: "Admin" }];
  if (parent) {
    breadcrumb = [...breadcrumb, { title: t(`${parent?.label}`) }];
    const children: MenuItem | null =
      parent.children && parent.children.length
        ? parent.children.find((e) => startsWith(pathname, e.key)) ?? null
        : null;
    if (children) {
      breadcrumb = [...breadcrumb, { title: t(`${children?.label}`) }];
    }
  } else if (parent === undefined) {
    breadcrumb = [...breadcrumb, { title: t("Dashboard") }];
  }
  return <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumb} />;
};
