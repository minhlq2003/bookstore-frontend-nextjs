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

export interface BookDetails extends Book {
  genre: string;
  author: string;
  publisher: string;
  publishedDate: string;
  weight: number;
  size: string;
  pages: number;
  description: string;
  sold: number;
  storage: number;
}
