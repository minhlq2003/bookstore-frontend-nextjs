import { Metadata, ResolvingMetadata } from "next";
import { Book, User } from "@/constant/types";
import BookDetailClient from "@/components/book-render";
import { getBookById } from "@/modules/services/bookService";
import { last } from "lodash";
import { getPostBySlug } from "@/modules/services/postService";
import PostRender from "@/components/post-render";

const Page = async (props: {
  params: Promise<{ slugs: string[]; locale: string }>;
}) => {
  const params = await props.params;

  const res = await getPostBySlug(last(params.slugs) || "");

  const post = res?.data;

  const user: User | null = null;

  return <PostRender pageData={post} />;
};

export async function generateMetadata(context: {
  params: Promise<{ slugs?: string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await context.params;
  const { slugs = [] } = resolvedParams;
  const res = await getPostBySlug(last(slugs) || "");
  const post = res?.data;

  return {
    title: `${post?.title}`,
    description: post?.excerpt?.slice(0, 150),
    openGraph: {
      title: `${post?.title}`,
      description: post?.excerpt?.slice(0, 150),
      images: [{ url: post?.image || "/default-image.jpg" }],
    },
  };
}

export default Page;
