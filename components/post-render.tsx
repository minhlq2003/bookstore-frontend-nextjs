"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { tryParse } from "@/lib/helper";
import { Spinner } from "@heroui/react";
import TableOfContents from "./table-of-content";
import NormalContent from "./normal-content";
import { Post } from "@/constant/types";

interface PostRenderProps {
  pageData?: Post;
  hasBreadcrumb?: boolean;
  isTemplate?: boolean;
  locale: string;
}

const extractTableOfContents = (content: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const headings = Array.from(doc.querySelectorAll("h2, h3, h4, h5"));

  return headings.map((heading, index) => {
    const id = `section-${index}`;
    heading.id = id;
    const level = parseInt(heading.tagName.replace("H", ""), 10);
    return {
      id,
      title: heading.textContent || "",
      level,
    };
  });
};

const PostRender = ({
  pageData,
  hasBreadcrumb,
  isTemplate,
  locale,
}: PostRenderProps) => {
  const [loading, setLoading] = useState(true);
  const [normalContent, setNormalContent] = useState<string>();
  const [titleBlog, setTitleBlog] = useState<string>("");
  const [updatedAtBlog, setUpdatedAtBlog] = useState<string>("");
  const [excerpt, setExcerpt] = useState<string>();
  const [tag, setTag] = useState<string>();
  const [tableOfContents, setTableOfContents] = useState<
    Array<{ id: string; title: string; level: number }>
  >([]);
  const [imageUrl, setImageUrl] = useState<string>();
  const [isTOCOpen, setIsTOCOpen] = useState(false);
  const [isTOCFixed, setIsTOCFixed] = useState(false);

  const fetchData = async () => {
    if (!pageData) return;

    setLoading(true);

    const post = pageData;
    const contentRaw = tryParse(post?.content ?? "");
    const postContent = post?.content ?? "";
    const toc = extractTableOfContents(postContent);

    setTitleBlog(post?.title ?? "");
    setUpdatedAtBlog(post?.updated_at ?? "");
    setExcerpt(post?.excerpt);
    setImageUrl(post?.image);
    setNormalContent(postContent);
    setTableOfContents(toc);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [pageData]);

  useEffect(() => {
    const handleScroll = () => {
      const tocElement = document.getElementById("mobile-toc");
      if (tocElement) {
        const rect = tocElement.getBoundingClientRect();
        setIsTOCFixed(rect.top <= 66);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isTOCOpen && isTOCFixed) {
      document.body.classList.add("body-no-scroll");
    } else {
      document.body.classList.remove("body-no-scroll");
    }

    return () => {
      document.body.classList.remove("body-no-scroll");
    };
  }, [isTOCOpen]);

  if (loading) return <Spinner />;

  return (
    <div className="pt-8 sm:pt-16 sm:px-0 relative">
      <div className="container flex flex-col gap-16 relative sm:pb-[2rem] pb-10 sm:px-[7.5rem]">
        <div className="flex flex-col gap-6 items-start max-w-[1000px] relative lg:px-0 px-4">
          <p className="px-2 py-1.5 rounded-lg bg-[#0B9444] uppercase text-white font-semibold text-sm leading-4">
            {tag}
          </p>
          <h1 className="text-[#242F3E] font-bold text-5xl leading-[56px]">
            {titleBlog}
          </h1>
          <div
            dangerouslySetInnerHTML={{ __html: excerpt || "" }}
            className="text-xl font-normal text-[#4F4F4F]"
          />
          <div className="flex flex-row gap-16 items-center">
            <div className="flex flex-col gap-1 items-start">
              <p className="uppercase text-[#999999] font-normal text-sm">
                WRITTEN BY
              </p>
              <p className="text-[#242F3E] font-normal text-base">Manager</p>
            </div>
            <div className="flex flex-col gap-1 items-start">
              <p className="uppercase text-[#999999] font-normal text-sm">
                PUBLISH ON
              </p>
              <p className="text-[#242F3E] font-normal text-base">
                {dayjs(updatedAtBlog).format("MMM D, YYYY")}
              </p>
            </div>
          </div>
        </div>

        <div
          id="mobile-toc"
          className="flex flex-col sm:flex-row items-start gap-16 relative"
        >
          <div className="hidden sm:flex flex-col gap-6 sticky top-24  lg:px-0 px-4">
            {tableOfContents.length > 0 && (
              <div className="flex flex-col justify-center gap-4">
                <h2 className="sm:text-sm font-normal uppercase text-[#999999]">
                  Table of contents
                </h2>
                <TableOfContents items={tableOfContents} />
              </div>
            )}
          </div>

          <div className="w-full sm:hidden block min-h-[88px]">
            <div
              className={`sm:hidden block w-full ${
                isTOCFixed ? "fixed top-[66px] left-0 right-0 z-50 " : ""
              } ${isTOCOpen ? "bg-white" : ""}`}
            >
              <Button
                className="sm:hidden bg-[#0B9444] ml-4 mb-4 text-white px-4 py-2 rounded-lg"
                onClick={() => setIsTOCOpen(!isTOCOpen)}
              >
                {isTOCOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
              </Button>

              <div
                className={`flex flex-col gap-6 transition-all max-h-[80vh] overflow-y-auto duration-300 overflow-hidden ${
                  isTOCOpen ? "h-[1500px] opacity-100" : "h-0 opacity-0"
                }`}
              >
                {tableOfContents.length > 0 && (
                  <div className="flex flex-col justify-center gap-4 px-4">
                    <h2 className="sm:text-sm font-normal uppercase text-[#999999]">
                      Table of contents
                    </h2>
                    <TableOfContents items={tableOfContents} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-16 sm:max-w-[888px]">
            <img
              src={imageUrl}
              alt=""
              className="w-full sm:h-[499px] h-[228px] sm:rounded-2xl object-cover"
            />
            <NormalContent
              content={normalContent ?? ""}
              tableOfContents={tableOfContents}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostRender;
