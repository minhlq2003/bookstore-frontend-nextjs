"use client";
import { Book } from "@/constant/types";
import { getBooks } from "@/modules/services/bookService";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import BookItem from "@/components/book-item";
const page = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState<Book[]>();
  const [searchBook, setsearchBook] = useState<Book[]>();
  const [isOut, setIsOut] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOut(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchBooks = async (searchTerm: string, page: number) => {
      const response = await getBooks({
        search: searchTerm,
        limit: 16,
        page: page,
      });
      if (response) {
        setTotalItems(response.total);
        setTotalPages(response.totalPages);
        setsearchBook(response.data);
      } else {
        setsearchBook([]);
      }
    };

    if (query) {
      fetchBooks(query, currentPage);
    }
  }, [query, currentPage]);
  console.log("SEARCH BOOK", searchBook);

  useEffect(() => {
    const fetchBooks = async (searchTerm: string) => {
      const response = await getBooks({
        search: searchTerm,
      });
      if (response) {
        setIsOut(false);
        setBooks(response.data);
      } else {
        setBooks([]);
      }
    };

    if (searchTerm) {
      fetchBooks(searchTerm);
    }
  }, [searchTerm, isOut]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };
  return (
    <div className="py-10 lg:py-20 max-w-[1440px] mx-auto">
      <div className="w-full flex items-center justify-center py-5 px-5">
        <div className="relative w-full lg:w-[50%]" ref={searchRef}>
          <input
            type="text"
            placeholder={t("Search...")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
            className="px-2 sm:py-2 py-0 w-full rounded-2xl border border-gray-300 placeholder:text-[12px] sm:placeholder:text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent text-black">
            <FontAwesomeIcon
              icon={faSearch}
              onClick={() => (
                router.push(`/search?query=${encodeURIComponent(searchTerm)}`),
                setSearchTerm("")
              )}
            />
          </button>
          {books && books.length > 0 && searchTerm && !isOut && (
            <div className="absolute flex flex-col gap-2 top-5 lg:top-10 bg-white border-2 border-[#0B3D91] rounded-md mt-2 w-full z-10 max-h-[300px] overflow-auto">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="flex items-center gap-3 cursor-pointer hover:bg-[#0B3D9180] hover:text-white p-2"
                  onClick={() => (
                    router.push(`/book/${book.id}`), setSearchTerm("")
                  )}
                >
                  <Image
                    src={book.book_images[0]?.url || ""}
                    alt="Book Image"
                    width={100}
                    height={100}
                    className="w-[50px] h-[50px] object-cover"
                  />
                  <div className="flex flex-col">
                    <p>{book.title}</p>
                    <p className="text-[#0B3D91]">${book.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col px-5">
        <div className="pb-6 md:col-span-5 ">
          <div className="bg-[#0B3D91] px-2 m-2">
            <p className="text-white">
              {totalItems} {t("books founds")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchBook?.map((book) => (
              <BookItem key={book.id} book={book} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex gap-2 justify-center mt-4">
              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => (
                      setCurrentPage(page),
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    )}
                    className={`px-3 py-1 rounded ${
                      page === currentPage
                        ? "bg-customblue text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
