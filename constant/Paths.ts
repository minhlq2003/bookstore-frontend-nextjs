import { PathItem } from "./types";

export const DASHBOARD: PathItem = {
  DETAIL: { PATH: "/dashboard", LABEL: "DashBoard", BREADCRUMB: ["DashBoard"] },
};

export const PUBLIC: PathItem = {
  LOGIN: { PATH: "/signin", LABEL: "Đăng nhập", BREADCRUMB: ["Đăng nhập"] },
  FORGOT_PASSWORD: { PATH: "/forgot-password", LABEL: "", BREADCRUMB: [] },
  RESET_PASSWORD: { PATH: "/reset-password", LABEL: "", BREADCRUMB: [] },
};

export const SETTINGS: PathItem = {
  LIST: {
    PATH: "/settings",
    LABEL: "List settings",
    BREADCRUMB: ["List settings"],
  },
  CREATE: {
    PATH: "/settings/create",
    LABEL: "Create Setting",
    BREADCRUMB: ["Create New Setting"],
  },
  EDIT: { PATH: "/settings", LABEL: "", BREADCRUMB: [""] },
};

export const POSTS: PathItem = {
  LIST: { PATH: "/posts", LABEL: "All Post", BREADCRUMB: ["All Post"] },
  CREATE: { PATH: "/posts/create", LABEL: "Add New Post", BREADCRUMB: ["Add"] },
  EDIT: { PATH: `/posts`, LABEL: "Edit Post", BREADCRUMB: ["Edit"] },
};
export const PRODUCTS: PathItem = {
  LIST: { PATH: "/products", LABEL: "All Post", BREADCRUMB: ["All Post"] },
  CREATE: {
    PATH: "/products/create",
    LABEL: "Add New Post",
    BREADCRUMB: ["Add"],
  },
  EDIT: { PATH: `/products`, LABEL: "Edit Post", BREADCRUMB: ["Edit"] },
};
export const ORDERS: PathItem = {
  LIST: { PATH: "/orders", LABEL: "All Post", BREADCRUMB: ["All Post"] },
  CREATE: {
    PATH: "/orders/create",
    LABEL: "Add New Post",
    BREADCRUMB: ["Add"],
  },
  EDIT: { PATH: `/orders`, LABEL: "Edit Post", BREADCRUMB: ["Edit"] },
};
export const SEOSETTING: PathItem = {
  LIST: { PATH: "/seo-setting", LABEL: "SEO", BREADCRUMB: ["SEO"] },
  EDiT: {
    PATH: "/seo-setting",
    LABEL: "Edit SEO Setting",
    BREADCRUMB: ["Edit"],
  },
};

export const MEDIA: PathItem = {
  LIST: { PATH: "/media", LABEL: "Library", BREADCRUMB: ["Library"] },
  CREATE: {
    PATH: "/media/create",
    LABEL: "Add New Media File",
    BREADCRUMB: ["Add New Media File"],
  },
  EDIT: { PATH: "/media", LABEL: "", BREADCRUMB: [] },
};
export const CONTACTFORM: PathItem = {
  LIST: {
    PATH: "/contactForm",
    LABEL: "All Contact Form",
    BREADCRUMB: ["All ConTact Form"],
  },
  CREATE: {
    PATH: "/contactForm/create",
    LABEL: "Add New Contact Form",
    BREADCRUMB: ["Add"],
  },
  EDIT: { PATH: `/contactForm`, LABEL: "Edit Contact", BREADCRUMB: ["Edit"] },
};
export const CATEGORIES: PathItem = {
  LIST: {
    PATH: "/categories",
    LABEL: "Category",
    BREADCRUMB: ["All Categories"],
  },
  EDIT: { PATH: `/categories`, LABEL: "Edit Category", BREADCRUMB: ["Edit"] },
};
export const USERS: PathItem = {
  LIST: { PATH: "/users", LABEL: "All Users", BREADCRUMB: ["All Users"] },
  CREATE: {
    PATH: "/users/create",
    LABEL: "Create User",
    BREADCRUMB: ["Create New User"],
  },
  EDIT: { PATH: "/:idUser", LABEL: "", BREADCRUMB: ["Users Edit"] },
  PROFILE: {
    PATH: "/profile",
    LABEL: "Profile",
    BREADCRUMB: ["Profile"],
  },
};
export const MENUS: PathItem = {
  DETAIL: { PATH: "/menus", LABEL: "Menus", BREADCRUMB: ["Menus"] },
};
export const PAGES: PathItem = {
  LIST: { PATH: "/pages", LABEL: "All Page", BREADCRUMB: ["All Pages"] },
  CREATE: { PATH: "/pages/create", LABEL: "Add New Page", BREADCRUMB: ["Add"] },
  EDIT: { PATH: "/pages/edit", LABEL: "Edit Page", BREADCRUMB: ["Edit"] },
};

export const PUCK: PathItem = {
  LIST: {
    PATH: "/ui-builder",
    LABEL: "UI Builder",
    BREADCRUMB: ["UI Builder"],
  },
};
export const BLOCK_CONTENT = {
  LIST: {
    PATH: "/block-content",
    LABEL: "Block Content",
    BREADCRUMB: ["Block Content"],
  },
  CREATE: {
    PATH: "/block-content/:id",
    LABEL: "Sửa Template",
    BREADCRUMB: ["Sửa Template"],
  },
};

export const GENERAL_SETTING = {
  LIST: {
    PATH: "/general-setting",
    LABEL: "General Setting",
    BREADCRUMB: ["General Setting"],
  },
};
export const BASESYSTEM: PathItem = {
  LIST: { PATH: "/bases", LABEL: "All Base", BREADCRUMB: ["BASES"] },
  CREATE: { PATH: "/bases/create", LABEL: "Add New Base", BREADCRUMB: ["Add"] },
  EDIT: { PATH: "/bases/edit", LABEL: "Edit Base", BREADCRUMB: ["Edit"] },
};

export const RECRUITMENT: PathItem = {
  LIST: {
    PATH: "/recruitment",
    LABEL: "Recruitment",
    BREADCRUMB: ["Recruitment"],
  },
  CREATE: {
    PATH: "/recruitment/create",
    LABEL: "Post Recruitment",
    BREADCRUMB: ["Post Recruitment"],
  },
  EDIT: {
    PATH: "/recruitment/:id",
    LABEL: "Update Recruitment",
    BREADCRUMB: ["Update Recruitment"],
  },
};

export const JOB_DETAIL: PathItem = {
  LIST: {
    PATH: "/job-detail",
    LABEL: "Job Details",
    BREADCRUMB: ["Job Detail"],
  },
  CREATE: {
    PATH: "/job-detail/create",
    LABEL: "Post Job Detail",
    BREADCRUMB: ["Post Job Detail"],
  },
  EDIT: {
    PATH: "/job-detail/:id",
    LABEL: "Update Job Detail",
    BREADCRUMB: ["Update Job Detail"],
  },
};
