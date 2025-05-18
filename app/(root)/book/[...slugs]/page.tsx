import { Metadata, ResolvingMetadata } from "next";
import { Book, User } from "@/constant/types";
import BookDetailClient from "@/components/book-render";
import {
  getBookById,
  getBooksByCategory,
} from "@/modules/services/bookService";
import { last } from "lodash";

const Page = async (props: {
  params: Promise<{ slugs: string[]; locale: string }>;
}) => {
  const params = await props.params;

  const res = await getBookById(last(params.slugs) || "");

  const book = res?.data;
  const related = await getBooksByCategory(res?.data?.categories?.slug);
  const relatedBooks =
    related?.data?.filter((item) => item.id !== res?.data.id).slice(0, 4) || [];

  const user: User | null = null;

  return (
    <BookDetailClient book={book} relatedBooks={relatedBooks} user={user} />
  );
};

export async function generateMetadata(context: {
  params: Promise<{ slugs?: string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await context.params;
  const { slugs = [] } = resolvedParams;
  const res = await getBookById(last(slugs) || "");
  const book = res?.data;

  return {
    title: `${book?.meta_title || book?.title} | Great Book`,
    description: `${book?.meta_desc || book?.description}`.slice(0, 150),
    openGraph: {
      title: `${book?.meta_title || book?.title} | Great Book`,
      description: `${book?.meta_desc || book?.description}`.slice(0, 150),
      images: [{ url: book?.book_images[0]?.url || "/default-image.jpg" }],
    },
  };
}

export default Page;
