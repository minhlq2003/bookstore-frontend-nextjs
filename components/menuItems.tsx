import {
  BookOutlined,
  CodeSandboxOutlined,
  DatabaseOutlined,
  FileImageOutlined,
  FileOutlined,
  HomeOutlined,
  MailOutlined,
  OrderedListOutlined,
  SettingOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import {
  BASESYSTEM,
  CATEGORIES,
  CONTACTFORM,
  JOB_DETAIL,
  MEDIA,
  PAGES,
  POSTS,
  RECRUITMENT,
  SETTINGS,
  USERS,
} from "../constant/Paths";

export type MenuItem = ItemType & {
  path?: string;
  permissionKey?: string;
  parent?: string;
  children?: MenuItem[];
  label?: string;
};
interface CustomMenuItem extends MenuItemType {
  label: string;
  key: string;
  icon?: React.ReactNode;
  children?: CustomMenuItem[];
  path?: string;
  permissionKey?: string;
  parent?: string;
}
export const settingItems: CustomMenuItem[] = [
  {
    key: SETTINGS.LIST.PATH,
    label: SETTINGS.LIST.LABEL,
  },
  {
    key: SETTINGS.CREATE.PATH,
    label: SETTINGS.CREATE.LABEL,
  },
];

export const postItems: CustomMenuItem[] = [
  {
    key: POSTS.LIST.PATH,
    label: POSTS.LIST.LABEL,
  },
  {
    key: POSTS.CREATE.PATH,
    label: POSTS.CREATE.LABEL,
  },
  {
    key: CATEGORIES.LIST.PATH,
    label: CATEGORIES.LIST.LABEL,
  },
];

export const mediaItems: CustomMenuItem[] = [
  {
    key: MEDIA.LIST.PATH,
    label: MEDIA.LIST.LABEL,
  },
  {
    key: MEDIA.CREATE.PATH,
    label: MEDIA.CREATE.LABEL,
  },
];

export const contactForm: CustomMenuItem[] = [
  {
    key: CONTACTFORM.LIST.PATH,
    label: CONTACTFORM.LIST.LABEL,
  },
  {
    key: CONTACTFORM.CREATE.PATH,
    label: CONTACTFORM.CREATE.LABEL,
  },
];

export const usersItems: CustomMenuItem[] = [
  {
    key: USERS.LIST.PATH,
    label: USERS.LIST.LABEL,
  },
  {
    key: USERS.CREATE.PATH,
    label: USERS.CREATE.LABEL,
  },
  {
    key: USERS.PROFILE.PATH,
    label: USERS.PROFILE.LABEL,
  },
];

export const pageItems: CustomMenuItem[] = [
  {
    key: PAGES.LIST.PATH,
    label: PAGES.LIST.LABEL,
  },
  {
    key: PAGES.CREATE.PATH,
    label: PAGES.CREATE.LABEL,
  },
];
export const baseItems: CustomMenuItem[] = [
  {
    key: BASESYSTEM.LIST.PATH,
    label: BASESYSTEM.LIST.LABEL,
  },
  {
    key: BASESYSTEM.CREATE.PATH,
    label: BASESYSTEM.CREATE.LABEL,
  },
];

export const recruitmentItems: CustomMenuItem[] = [
  {
    key: RECRUITMENT.LIST.PATH,
    label: RECRUITMENT.LIST.LABEL,
  },
  {
    key: RECRUITMENT.CREATE.PATH,
    label: RECRUITMENT.CREATE.LABEL,
  },
];

export const jobDetailItems: CustomMenuItem[] = [
  {
    key: JOB_DETAIL.LIST.PATH,
    label: JOB_DETAIL.LIST.LABEL,
  },
  {
    key: JOB_DETAIL.CREATE.PATH,
    label: JOB_DETAIL.CREATE.LABEL,
  },
];

export const productItems: CustomMenuItem[] = [
  {
    key: "/books",
    label: "Books",
  },
  {
    key: "/books/create",
    label: "Create Book",
  },
];

export const orderItems: CustomMenuItem[] = [
  {
    key: "/orders",
    label: "Orders",
  },
  {
    key: "/orders/create",
    label: "Create Order",
  },
];

export const menuItems: Array<CustomMenuItem> = [
  { label: "Dashboard", key: "", icon: <HomeOutlined /> },
  {
    label: "Books",
    key: "books",
    icon: <BookOutlined />,
    children: productItems,
  },
  {
    label: "Orders",
    key: "orders",
    icon: <OrderedListOutlined />,
    children: orderItems,
  },
  {
    label: "Categories",
    key: "categories",
    icon: <DatabaseOutlined />,
  },
  {
    label: "Posts",
    key: "posts",
    icon: <FileOutlined />,
    children: postItems,
  },

  {
    label: "Media",
    key: "media",
    icon: <FileImageOutlined />,
    children: mediaItems,
  },

  {
    label: "Users",
    key: "users",
    children: usersItems,
    icon: <UserDeleteOutlined />,
  },
  {
    label: "Settings",
    key: "settings",
    icon: <SettingOutlined />,
    children: settingItems,
  },
  {
    label: "Contact Form",
    key: "contactform",
    icon: <MailOutlined />,
    children: contactForm,
  },
  {
    label: "General Setting",
    key: "general-setting",
    icon: <CodeSandboxOutlined />,
  },
  // {
  //   label: "Base System",
  //   key: "base-system",
  //   icon: <ApartmentOutlined />,
  //   children: baseItems,
  //   permissionKey: "base-system",
  // },
];

const filterMenuItemsByPermission = (
  menuItems: MenuItem[],
  permissions: Record<string, any>
): MenuItem[] => {
  return menuItems.reduce<MenuItem[]>((filteredMenuItems, item) => {
    const permissionKey = item.permissionKey;

    if (permissionKey) {
      const hasPermission = permissions[permissionKey]?.find?.enabled === true;

      if (hasPermission) {
        if (item.children?.length) {
          const filteredChildren = item.children.filter((child) => {
            const path = child.key?.toString() || "";

            if (path.includes("/create")) {
              return permissions[permissionKey]?.create?.enabled === true;
            }
            return true;
          });

          if (filteredChildren.length) {
            filteredMenuItems.push({
              ...item,
              children: filteredChildren,
            });
          }
        } else {
          filteredMenuItems.push(item);
        }
      }
    } else {
      filteredMenuItems.push(item);
    }

    return filteredMenuItems;
  }, []);
};

export const getFilteredMenuItems = (): MenuItem[] => {
  if (typeof window !== "undefined") {
    const permissions = JSON.parse(localStorage.getItem("permissions") || "{}");
    const filteredMenuItems = filterMenuItemsByPermission(
      menuItems,
      permissions
    );
    return filteredMenuItems;
  } else {
    return menuItems;
  }
};
