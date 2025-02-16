export interface Book {
  id: number;
  title: string;
  subTitle?: string;
  price: number;
  author: string;
  rating?: number;
  imageUrl: string;
  discount?: number;
}
