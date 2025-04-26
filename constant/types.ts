export interface Book {
  import_price: string;
  book_images: string[];
  id: number;
  title: string;
  subTitle?: string;
  price: number;
  author: string;
  rating?: number;
  imageUrl: string;
  discount?: number;
  genre?: string;
  publisher?: string;
  publishedDate?: string;
  weight?: number;
  size?: string;
  pages?: number;
  description?: string;
  sold?: number;
  storage?: number;
  category?: string;
  quantity?: number;
  categories?: string;
}
export type ApiBook = {
  id: number;
  title: string;
  description?: string;
  price: number;
  author: string;
  rating?: number;
  book_images?: { url: string }[];
};
export interface PathItem {
  [k: string]: {
    PATH: string;
    LABEL: string;
    BREADCRUMB: Array<string>;
  };
}

export interface BookImage {
  id: string;
  url: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Publisher {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookResponse {
  code: number;
  message?: string;
  data: Book;
}

export interface BookListResponse {
  code: number;
  message?: string;
  data: Book[];
  page: number;
  total: number;
  totalPages: number;
}

export interface Discount {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  code: string;
  percent: number;
  startDate: string;
  endDate: string;
}

export interface BooksResponse {
  code: number;
  message: string;
  data: Book[];
}

export interface Category {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  slug: string;
  description?: string;
}

export interface CategoriesResponse {
  code: number;
  message: string;
  data: Category[];
}

export interface CategoryResponse {
  code: number;
  message: string;
  data: Category;
}

export interface Discount {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  code: string;
  percent: number;
  startDate: string;
  endDate: string;
}

export interface DiscountResponse {
  code: number;
  message: string;
  data: Discount[];
}

export type OrderDetailRequest = {
  bookId: string;
  quantity: number;
  price: number;
};

export type OrderDetail = {
  bookTitle: string;
  slug: string;
  bookImages: { id: string; url: string }[];
  quantity: number;
  price: number;
};

export enum PaymentMethod {
  COD = "COD",
  VN_PAY = "VN_PAY",
}

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  SHIPPING = "SHIPPING",
  COMPLETED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export type Order = {
  id: string;
  receiverName: string;
  receiverPhone: string;
  address: string;
  paymentMethod: PaymentMethod;
  orderStatus: OrderStatus;
  total: number;
  userId?: string;
  orderDetails: OrderDetail[];
  createdAt: string;
  updatedAt: string;
};

export type OrderResponse = {
  code: number;
  message?: string;
  data: Order;
};

export type ListOrdersResponse = {
  code: number;
  message?: string;
  data: Order[];
  page: number;
  total: number;
  totalPages: number;
};

export interface Address {
  id: number;
  user_id: number;
  address: string;
  receiver_name: string;
  receiver_phone: string;
}

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  avatar: string;
  status: number;
  role: string;
  addresses: Address[];
}
