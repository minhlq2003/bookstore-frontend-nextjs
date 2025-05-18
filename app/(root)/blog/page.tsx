"use client";

import { useTranslation } from "next-i18next";
import { useEffect, useState, Suspense } from "react";
import { Post } from "@/constant/types";
import PostItem from "@/components/post-item";
import { getPosts } from "@/modules/services/postService";
import { Metadata } from "next";

function Blog() {
  const { t } = useTranslation("common");
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [popularPosts, setPopularPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      const posts = await getPosts();
      setLatestPosts(posts?.data || []);
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
