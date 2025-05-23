"use client";

import { useTranslation } from "next-i18next";
import { useEffect, useState, Suspense } from "react";
import { Post } from "@/constant/types";
import PostItem from "@/components/post-item";
import { getPosts } from "@/modules/services/postService";
import { Metadata } from "next";
import Link from "next/link";

function Blog() {
  const { t } = useTranslation("common");
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [popularPosts, setPopularPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      const posts = await getPosts();
      const sortedPosts = (posts?.data || []).sort(
        (a: Post, b: Post) =>
          new Date(b.created_at || 0).getTime() -
          new Date(a.created_at || 0).getTime()
      );
      setLatestPosts(sortedPosts);
    };

    fetchLatestPosts();
  }, []);

  useEffect(() => {
    const fetchPopularPosts = async () => {
      const posts = await getPosts();
      setPopularPosts(posts?.data || []);
    };

    fetchPopularPosts();
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full bg-[#f8f8f8] py-10">
        <div className="flex flex-col md:flex-row mx-auto max-w-[1440px] my-5">
          <Link
            className=" w-full md:w-2/3 px-7 flex gap-2 md:gap-10 group"
            href={`/blog/${latestPosts[0]?.slug}`}
          >
            <img className="rounded-xl w-1/2" src={latestPosts[0]?.image} />
            <div>
              <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 group-hover:text-[#0b3d91]">
                {latestPosts[0]?.title}
              </h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: latestPosts[0]?.content || "",
                }}
                className="text-sm text-gray-500 line-clamp-5 mt-1"
              />
            </div>
          </Link>
          <div className="flex w-full md:w-1/3 p-5 md:p-0 flex-col gap-4">
            {latestPosts.slice(1, 3).map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.id}
                className="flex gap-4 group"
              >
                <img
                  className="rounded-xl w-1/3"
                  src={post.image}
                  alt={post.title}
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 group-hover:text-[#0b3d91]">
                    {post.title}
                  </h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: post.content || "",
                    }}
                    className="text-sm text-gray-500 line-clamp-3 mt-1"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto px-7">
          <h2 className="text-3xl font-bold text-[#0b3d91] mb-6">
            {t("Latest Posts")}
          </h2>
          {loading ? (
            <div className="text-center py-10">Loading latest posts...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {latestPosts.map((post) => (
                <PostItem key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>

        <div className="max-w-[1440px] mx-auto px-7 py-10">
          <h2 className="text-3xl font-bold text-[#0b3d91] mb-6">
            {t("Popular Posts")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularPosts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default Blog;
