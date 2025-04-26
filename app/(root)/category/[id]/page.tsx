"use client";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import imgBook from "@/public/images/book-img.png";
import BookItem from "@/components/book-item";
import { useParams } from "next/navigation";
import {ApiBook, Book} from "@/constant/types";
import { useEffect, useState, useCallback } from "react";

function Category() {
  const { t } = useTranslation("common");
  const { id } = useParams();

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

  const [newArrivals, setNewArrivals] = useState<Book[]>([]);
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const [loadingArrivals, setLoadingArrivals] = useState(true);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);

  // Helper to map API data to Book type
  const mapApiBookToBook = (apiBook: ApiBook): {
    id: number;
    title: string;
    subTitle: string;
    price: number;
    imageUrl: string;
    author: string;
    rating: number;
    book_images: { url: string }[]
  } => ({
    id: apiBook.id,
    title: apiBook.title,
    subTitle: apiBook.description || "",
    price: Number(apiBook.price),
    imageUrl: apiBook.book_images?.[0]?.url || "",
    author: apiBook.author,
    rating: 0, // API does not provide rating
    book_images: apiBook.book_images || [],
  });

  const fetchNewArrivals = useCallback(async () => {
    setLoadingArrivals(true);
    try {
      const res = await fetch(`${apiBaseUrl}/book/new-arrivals/${id}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setNewArrivals(json.data.map(mapApiBookToBook));
      } else {
        setNewArrivals([]);
      }
    } catch {
      setNewArrivals([]);
    }
    setLoadingArrivals(false);
  }, [apiBaseUrl, id]);

  const fetchRecommendations = useCallback(async () => {
    setLoadingRecommendations(true);
    try {
      const res = await fetch(`${apiBaseUrl}/book/recommendations/${id}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setRecommendations(json.data.map(mapApiBookToBook));
      } else {
        setRecommendations([]);
      }
    } catch {
      setRecommendations([]);
    }
    setLoadingRecommendations(false);
  }, [apiBaseUrl, id]);

  useEffect(() => {
    if (id) {
      fetchNewArrivals();
      fetchRecommendations();
    }
  }, [id, fetchNewArrivals, fetchRecommendations]);

  const book = {
    title: "CHASING NEW HORIZONS",
    author: "By Alan Stern",
    description:
      "The book tells a story of a space probe to Pluto, that was proposed by the author, Alan Stern, in the early 1990s.",
    price: 19.0,
    image: "/path/to/your/book-image.jpg",
  };

  return (
    <div className="w-full bg-[#ececec] sm:pt-5 pt-0 pb-20">
      <div className="bg-gray-200 max-w-[1440px] mx-auto">
        <div className="sm:rounded-xl rounded-none overflow-hidden">
          <div className="bg-[#0B3D91] text-white py-4 text-left sm:text-3xl text-xl font-bold sm:pl-10 pl-3">
            {t(`${id?.toUpperCase()} BOOKS`)}
          </div>

          <div className="mx-auto sm:p-6 p-3 bg-[#0B3D9180] text-white">
            <div className="flex flex-row items-between justify-between">
              <div className="w-[40%] sm:pl-10 pl-0">
                <button className="bg-[#0B3D91] text-white sm:px-10 px-5 sm:py-6 py-3 rounded-full sm:text-sm text-[10px] font-semibold uppercase mb-4">
                  {t("Best Seller")}
                </button>
                <div className="mx-auto sm:mb-10 mb-0">
                  <h2 className="sm:text-2xl text-[16px] font-bold text-center mb-2 sm:mt-10 mt-0">
                    {book.title}
                  </h2>
                  <p className="text-right mb-2 sm:text-[16px] text-[10px]">
                    {book.author}
                  </p>
                </div>
                <p className="mb-6 sm:block hidden">{book.description}</p>
                <div className="flex space-x-4 sm:pt-10 pt-2 justify-between">
                  <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-400 shadow-lg">
                    {t("See more")}
                  </button>
                  <div className="sm:flex items-center hidden">
                    <span className=" mr-[-8] bg-white py-2 px-4 text-black rounded-lg shadow-lg">
                      ${book.price.toFixed(2)}
                    </span>
                    <button className="bg-blue-500 text-white px-4 py-[10px] rounded-lg hover:bg-blue-700 shadow-lg">
                      {t("Buy now")}
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-[60%] my-6 relative sm:h-[400px] h-[160px]">
                <div className="relative ml-10">
                  <Image
                    src={imgBook}
                    alt={book.title}
                    className="w-1/2 sm:w-1/3 rounded-lg sm:left-40 top-10 left-10 z-10 absolute hover:-rotate-6  hover:top-2 transition-all duration-200 hover:scale-110"
                  />
                  <Image
                    src={imgBook}
                    alt={book.title}
                    className="absolute top-10 left-0 sm:w-1/3 w-1/2 transform  rounded-lg shadow-md hover:-rotate-6  hover:top-2 transition-all duration-200 hover:scale-110 "
                  />
                  <Image
                    src={imgBook}
                    alt={book.title}
                    className="absolute top-10 sm:left-20 left-5 sm:w-1/3 w-1/2 transform  rounded-lg shadow-md hover:-rotate-6  hover:top-2 transition-all duration-200 hover:scale-110"
                  />
                  <Image
                    src={imgBook}
                    alt={book.title}
                    className="absolute top-10 sm:left-60 left-[60px] sm:w-1/3 w-1/2 transform z-20 rounded-lg shadow-md hover:-rotate-6  hover:top-2 transition-all duration-200 hover:scale-110"
                  />
                  <Image
                    src={imgBook}
                    alt={book.title}
                    className="absolute top-10 sm:left-80 left-20 sm:w-1/3 w-1/2 transform z-20  rounded-lg shadow-md hover:-rotate-6  hover:top-2 transition-all duration-200 hover:scale-110"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto bg-[#êccec]">
        <div className="sm:px-10 px-3">
          <p className="text-[#0b3d91] font-bold text-[24px] py-5">
            New Arrival
          </p>
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {loadingArrivals ? (
                <span>Loading...</span>
              ) : newArrivals.length === 0 ? (
                <span>No books found.</span>
              ) : (
                newArrivals.map((book) => (
                  <BookItem key={book.id} book={book} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto bg-[#êccec] mt-5">
        <div className="sm:px-10 px-3">
          <p className="text-[#0b3d91] font-bold text-[24px] py-5">
            Your Choice
          </p>
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {loadingRecommendations ? (
                <span>Loading...</span>
              ) : recommendations.length === 0 ? (
                <span>No books found.</span>
              ) : (
                recommendations.map((book) => (
                  <BookItem key={book.id} book={book} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
