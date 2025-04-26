"use client";
import { Book } from "@/constant/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useTranslation } from "next-i18next";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import BookItem from "@/components/book-item";

const Page = () => {
  const { t } = useTranslation("common");
  const [quantity, setQuantity] = useState(1);
  const [book, setBook] = useState<Book | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(`${apiBaseUrl}/book/details/${id}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch book details: ${response.status}`);
        }
        
        const data = await response.json();
        setBook(data.data);
        
        // Fetch related books (this could be a separate API call or part of the same response)
        // For now, we'll just use the same book as a placeholder for related books
        setRelatedBooks(Array(4).fill(data.data));
        
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("Failed to load book details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchBookDetails();
    }
  }, [id]);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      setQuantity(1);
    } else {
      setQuantity((prev) => prev - 1);
    }
  };

  if (loading) {
    return <div className="max-w-[1200px] mx-auto bg-[#ECECEC] font-merriweather p-10 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="max-w-[1200px] mx-auto bg-[#ECECEC] font-merriweather p-10 text-center text-red-500">{error}</div>;
  }

  if (!book) {
    return <div className="max-w-[1200px] mx-auto bg-[#ECECEC] font-merriweather p-10 text-center">Book not found</div>;
  }
  return (
    <div className="max-w-[1200px] mx-auto bg-[#ECECEC] font-merriweather">
      <div className="hidden md:block text-black px-7 pt-5">
        <Breadcrumbs
          itemClasses={{
            item: "text-black data-[current=true]:text-customblue/60",
          }}
        >
          <BreadcrumbItem>{book?.categories?.name}</BreadcrumbItem>
          <BreadcrumbItem>{book?.title}</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-start md:gap-10 lg:gap-20 md:px-7 py-5">
        <Image
          src={book?.book_images[0]["url"] || "/default-image.jpg"}
          alt={book?.title || "Book Image"}
          width={100}
          height={100}
          className="w-[200px] h-[300px] lg:w-[300px] lg:h-[400px]"
        />
        <div className="flex flex-col gap-3 lg:gap-5 text-sm md:text-base lg:text-lg md:w-full text-black lg:px-14">
          <div className="flex flex-col items-center justify-center md:flex-row-reverse md:justify-between gap-2">
            <div className="bg-customblue text-white flex items-center justify-center w-[30%] h-6 rounded-lg mt-3 md:mt-0">
              <p>Best seller</p>
            </div>
            <h1 className="text-2xl md:text-3xl">{book?.title}</h1>
          </div>
          <div className="flex gap-5 md:gap-7 lg:gap-12">
            <p>Author: {book?.author}</p>
            <p>Publisher: {book?.publishers?.name}</p>
          </div>
          <div className="flex">
            <p className="text-blue">
              <span>Reviews: 100</span> {book?.rating}
            </p>
            <FontAwesomeIcon icon={ faStar } className="text-blue size-5" />
          </div>
          <p>Genre: {book?.categories?.name}</p>
          <div className="flex gap-5 md:gap-7 lg:gap-12">
            <p>Sold: {book?.sold}</p>
            <p>Storage: {book?.stock}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <p className="text-blue text-base md:text-lg">
                ${Number(book?.price).toFixed(2)}
              </p>
              <p className="-translate-y-0.5 text-gray-500 line-through">
                ${(Number(book?.price)+Number(book?.import_price)).toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faMinus}
                className="bg-gray-400 size-5 md:size-6 rounded p-1"
                onClick={() => decreaseQuantity()}
              />
              <p className=" text-black text-base w-5 text-center">
                {quantity}
              </p>
              <FontAwesomeIcon
                icon={faPlus}
                className="bg-gray-400 size-5 md:size-6 rounded p-1"
                onClick={() => increaseQuantity()}
              />
            </div>
          </div>
          <button className="bg-blue text-white w-full h-7 md:h-9 lg:h-12 rounded-lg">
            Add To Cart
          </button>
        </div>
      </div>
      <div className="px-7">
        <Table
          className="text-black bg-white rounded-xl"
          isStriped
          classNames={{
            th: "md:text-base",
            td: "md:text-base",
          }}
        >
          <TableHeader>
            <TableColumn>{t("Book Details")}</TableColumn>
            <TableColumn>{t("Info")}</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key={book.id} className="bg-gray-200 rounded-xl">
              <TableCell className="text-black/60 md:text-base">
                {t("Genre")}
              </TableCell>
              <TableCell>{book?.categories?.name}</TableCell>
            </TableRow>
            <TableRow key={2}>
              <TableCell className="text-black/60 md:text-base">
                {t("Author")}
              </TableCell>
              <TableCell>{book?.author}</TableCell>
            </TableRow>
            <TableRow key={3} className="bg-gray-200 rounded-xl">
              <TableCell className="text-black/60 md:text-base">
                {t("Publisher")}
              </TableCell>
              <TableCell>{book?.publishers?.name}</TableCell>
            </TableRow>
            <TableRow key={4}>
              <TableCell className="text-black/60 md:text-base">
                {t("Year")}
              </TableCell>
              <TableCell>
                {book?.publish_year
                  ? book?.publish_year
                  : "N/A"}
              </TableCell>
            </TableRow>
            <TableRow key={5} className="bg-gray-200 rounded-xl">
              <TableCell className="text-black/60 md:text-base">
                {t("Weight")}(gr)
              </TableCell>
              <TableCell>{book?.weight}</TableCell>
            </TableRow>
            <TableRow key={6}>
              <TableCell className="text-black/60 md:text-base">
                {t("Size")}
              </TableCell>
              <TableCell>{book?.size}</TableCell>
            </TableRow>
            <TableRow key={7} className="bg-gray-200 rounded-full">
              <TableCell className="text-black/60 md:text-base">
                {t("Pages")}
              </TableCell>
              <TableCell>{book?.pages}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className=" text-black bg-white mx-7 mt-7 p-3 md:p-5 rounded-xl">
        <p className="font-medium text-lg md:text-xl lg:text-2xl pb-2">
          {t("Description")}
        </p>
        <p className="text-justify text-sm md:text-base text-black/80">
          {book?.description}
        </p>
      </div>
      <p className="text-lg md:text-xl lg:text-2xl text-blue py-2 md:py-5 px-7 font-bold">
        {t("Relevant Books")}
      </p>
      <div className="flex overflow-x-auto px-7 gap-5 pb-5">
        {relatedBooks.map((book, index) => (
          <div key={`related_`+index}>
            <BookItem book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;