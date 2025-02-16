"use client";
import React from "react";
import Image from "next/image";
import { Book } from "@/constant/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const BookItem: React.FC<{ book: Book }> = ({ book }) => {
  return (
    <div className="border border-gray-300 rounded sm:p-4 p-2 shadow-md bg-white">
      <div className="relative flex justify-center">
        {" "}
        {/* Added relative positioning for rating badge */}
        <Image
          src={book.imageUrl}
          alt={book.title}
          width={200}
          height={250}
          className="rounded sm:w-[200px] w-[100px] sm:h-[250px] h-[125px]"
        />
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
        <p className="text-lg font-semibold">
          ${book.price.toFixed(2)}{" "}
          {book.discount &&
            book.discount > 0 && ( // Conditionally render discount price
              <span className="text-gray-500 line-through">
                ${(book.price * (1 + book.discount / 100)).toFixed(2)}
              </span>
            )}
        </p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Buy
        </button>
      </div>
    </div>
  );
};

export default BookItem;
