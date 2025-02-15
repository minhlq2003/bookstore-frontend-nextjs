"use client";
import { useTranslation } from "next-i18next";

function Category() {
  const { t } = useTranslation("common");

  const book = {
    title: "CHASING NEW HORIZONS",
    author: "By Alan Stern",
    description:
      "The book tells a story of a space probe to Pluto, that was proposed by the author, Alan Stern, in the early 1990s.",
    price: 19.0,
    image: "/path/to/your/book-image.jpg",
  };

  return (
    <div className="w-full">
      <div className="bg-gray-200 max-w-[1180px] mx-auto">
        <div className="bg-[#0B3D91] text-white py-4 text-left text-3xl font-bold pl-7">
          {t("FICTION BOOKS")}
        </div>

        <div className="container mx-auto p-6 bg-[#0B3D9180] text-white">
          <div className="flex flex-col md:flex-row items-center md:justify-between">
            <div className="md:w-[40%]">
              <span className="bg-[#0B3D91] text-white px-6 py-3 rounded-full text-sm font-semibold uppercase mb-4">
                Best Seller
              </span>
              <div className="mx-auto">
                <h2 className="text-2xl font-bold text-center mb-2 mt-10">
                  {book.title}
                </h2>
                <p className="text-right mb-2">{book.author}</p>
              </div>
              <p className="mb-6">{book.description}</p>
              <div className="flex space-x-4">
                <button className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-400">
                  See more
                </button>
                <div className="flex items-center">
                  <span className=" font-semibold mr-2">
                    ${book.price.toFixed(2)}
                  </span>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Buy now
                  </button>
                </div>
              </div>
            </div>

            <div className="md:w-1/3 mt-6 md:mt-0 ml-0 md:ml-6 relative">
              {/* Added relative positioning */}
              <img
                src={book.image}
                alt={book.title}
                className="w-full rounded-lg"
              />
              {/* Example of overlapping images - Adjust styles as needed */}
              <img
                src={book.image}
                alt={book.title}
                className="absolute top-4 left-4 w-2/3 transform -rotate-6 rounded-lg shadow-md"
              />
              <img
                src={book.image}
                alt={book.title}
                className="absolute top-10 right-4 w-1/2 transform rotate-3 rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
