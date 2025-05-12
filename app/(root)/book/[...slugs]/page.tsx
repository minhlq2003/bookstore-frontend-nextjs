import { Metadata, ResolvingMetadata } from "next";
import { Book, User } from "@/constant/types";
import BookDetailClient from "@/components/book-render";
import { getBookById } from "@/modules/services/bookService";
import { last } from "lodash";

const Page = async (props: { params: { slugs: string[]; locale: string } }) => {
  const params = await props.params;
  console.log("slug", params);

  const res = await getBookById(last(params.slugs) || "");

  console.log("res", res);

  const book = res?.data;
  const relatedBooks = Array(4).fill(book);

  const user: User | null = null;

  return (
    <BookDetailClient book={book} relatedBooks={relatedBooks} user={user} />
  );
};

export async function generateMetadata(context: {
  params: { slugs?: string[] };
}): Promise<Metadata> {
  const resolvedParams = await context.params;
  const { slugs = [] } = resolvedParams;
  const res = await getBookById(last(slugs) || "");
  const book = res?.data;

  return {
    title: `${book?.title} | Book Detail`,
    description: book?.description?.slice(0, 150),
    openGraph: {
      title: `${book?.title} | Book Detail`,
      description: book?.description?.slice(0, 150),
      images: [{ url: book?.book_images[0]?.url || "/default-image.jpg" }],
    },
  };
}

export default Page;
