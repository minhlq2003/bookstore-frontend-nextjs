"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Book } from "@/constant/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const BookItem: React.FC<{ book: Book }> = ({ book }) => {
  const { t } = useTranslation("common");
  return (
    <div className="border border-gray-300 rounded sm:p-4 p-2 shadow-md bg-white hover:scale-105 transition duration-300 ease-in-out hover:shadow-[0_0_10px_5px_rgba(30,136,229,0.3)]">
      <div className="relative flex justify-center">
        {" "}
        <Link href={`/book/${book.id}`}>
          <Image
            src={book?.book_images?.[0]?.url ?? "/default-image.jpg"}
            alt={book.title}
            width={200}
            height={250}
            className="rounded sm:w-[200px] w-[100px] sm:h-[250px] h-[125px]"
          />
        </Link>
        <div className="absolute sm:top-2 top-1 sm:right-2 right-1">
          {" "}
          {/* Rating badge positioning */}
          <span className="bg-[#0b3d91] text-white sm:px-4 px-2 sm:py-2 py-1 rounded-2xl sm:text-[16px] text-[10px] font-semibold">
            <FontAwesomeIcon icon={faStar} className="pr-1 pt-1" />
            {book.rating}
          </span>
        </div>
      </div>
      <h3 className="sm:text-lg text-sm font-semibold mt-2">{book.title}</h3>
      {book.subTitle && (
        <p className="sm:text-sm text-[10px] text-gray-600">{book.subTitle}</p>
      )}{" "}
      {/* Conditionally render subtitle */}
      <p className="text-sm text-gray-600">By {book.author}</p>
      <div className="flex items-center justify-between mt-2">
        <p className="md:text-lg text-sm font-semibold mr-2">
          ${Number(book.price).toFixed(2)}{" "}
          {book.discount &&
            book.discount > 0 && ( // Conditionally render discount price
              <span className="text-gray-500 line-through">
                ${(book.price * (1 + book.discount / 100)).toFixed(2)}
              </span>
            )}
        </p>
        <Link href={`/book/${book.id}`}>
          <button className=" text-white md:text-lg text-sm  px-4 py-2 rounded hover:border hover:border-white">
            {t(`${book.stock == 0 ? "Sold Out" : "Buy"}`)}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BookItem;
