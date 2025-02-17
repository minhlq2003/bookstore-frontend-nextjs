"use client";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import imgBook from "@/public/images/book-img.png";
import BookItem from "@/components/book-item";

import { Book } from "@/constant/types";

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

  const books: Book[] = [
    {
      id: 1,
      title: "CHASING NEW HORIZONS",
      subTitle: "Inside the Epic First Mission to Pluto",
      price: 19.0,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/655f/c8c0/309c950754d34dae6569f2f7cdd56c8e?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=G2bllpJ2iOZpmP1FPY-wVKixum3gNTJ2DxPb6Y-ODtv2EXnLc-eWxJ2bofLr-mi7KSGC3o-QWcVghIqRCd4i71Nwp6Hp~WBt9ummne0N31TB0lf4nLQlZy3p4maLN3dINZtiDcvtcpckoDzIQwfCIIDOwWbA5cCV25EppdpKZcX~1ZjgTQBweRy87psNsxarFFrUIDbi~7Yi24RJ0VRkyhSZmnj48wD~JOdKItCWERacpW3wqJlpk0BrPMPIio1suC459-ZU~mIN7nt91CGXtGk3YG7FNxiwwpSuWvYtc3vNlLnugYFtsS4c~FE9X5dHcMlUpH7CesPQoGHEI5jSJg__",
      author: "Alan Stern",
      rating: 4.5,
    },
    {
      id: 2,
      title: "CHASING NEW HORIZONS",
      subTitle: "Inside the Epic First Mission to Pluto",
      price: 19.0,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/655f/c8c0/309c950754d34dae6569f2f7cdd56c8e?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=G2bllpJ2iOZpmP1FPY-wVKixum3gNTJ2DxPb6Y-ODtv2EXnLc-eWxJ2bofLr-mi7KSGC3o-QWcVghIqRCd4i71Nwp6Hp~WBt9ummne0N31TB0lf4nLQlZy3p4maLN3dINZtiDcvtcpckoDzIQwfCIIDOwWbA5cCV25EppdpKZcX~1ZjgTQBweRy87psNsxarFFrUIDbi~7Yi24RJ0VRkyhSZmnj48wD~JOdKItCWERacpW3wqJlpk0BrPMPIio1suC459-ZU~mIN7nt91CGXtGk3YG7FNxiwwpSuWvYtc3vNlLnugYFtsS4c~FE9X5dHcMlUpH7CesPQoGHEI5jSJg__",
      author: "Alan Stern",
      rating: 4.5,
    },
    {
      id: 3,
      title: "CHASING NEW HORIZONS",
      subTitle: "Inside the Epic First Mission to Pluto",
      price: 19.0,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/655f/c8c0/309c950754d34dae6569f2f7cdd56c8e?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=G2bllpJ2iOZpmP1FPY-wVKixum3gNTJ2DxPb6Y-ODtv2EXnLc-eWxJ2bofLr-mi7KSGC3o-QWcVghIqRCd4i71Nwp6Hp~WBt9ummne0N31TB0lf4nLQlZy3p4maLN3dINZtiDcvtcpckoDzIQwfCIIDOwWbA5cCV25EppdpKZcX~1ZjgTQBweRy87psNsxarFFrUIDbi~7Yi24RJ0VRkyhSZmnj48wD~JOdKItCWERacpW3wqJlpk0BrPMPIio1suC459-ZU~mIN7nt91CGXtGk3YG7FNxiwwpSuWvYtc3vNlLnugYFtsS4c~FE9X5dHcMlUpH7CesPQoGHEI5jSJg__",
      author: "Alan Stern",
      rating: 4.5,
    },
    {
      id: 4,
      title: "CHASING NEW HORIZONS",
      subTitle: "Inside the Epic First Mission to Pluto",
      price: 19.0,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/655f/c8c0/309c950754d34dae6569f2f7cdd56c8e?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=G2bllpJ2iOZpmP1FPY-wVKixum3gNTJ2DxPb6Y-ODtv2EXnLc-eWxJ2bofLr-mi7KSGC3o-QWcVghIqRCd4i71Nwp6Hp~WBt9ummne0N31TB0lf4nLQlZy3p4maLN3dINZtiDcvtcpckoDzIQwfCIIDOwWbA5cCV25EppdpKZcX~1ZjgTQBweRy87psNsxarFFrUIDbi~7Yi24RJ0VRkyhSZmnj48wD~JOdKItCWERacpW3wqJlpk0BrPMPIio1suC459-ZU~mIN7nt91CGXtGk3YG7FNxiwwpSuWvYtc3vNlLnugYFtsS4c~FE9X5dHcMlUpH7CesPQoGHEI5jSJg__",
      author: "Alan Stern",
      rating: 4.5,
    },
  ];

  return (
    <div className="w-full bg-[#ececec] sm:pt-5 pt-0 pb-20">
      <div className="bg-gray-200 max-w-[1440px] mx-auto">
        <div className="sm:rounded-xl rounded-none overflow-hidden">
          <div className="bg-[#0B3D91] text-white py-4 text-left sm:text-3xl text-xl font-bold sm:pl-10 pl-3">
            {t("FICTION BOOKS")}
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
                    className="w-1/2 sm:w-1/3 rounded-lg -rotate-6 sm:left-40 sm:top-0 top-5 left-10 z-10 absolute"
                  />
                  <Image
                    src={imgBook}
                    alt={book.title}
                    className="absolute top-10 left-0 sm:w-1/3 w-1/2 transform  rounded-lg shadow-md"
                  />
                  <Image
                    src={imgBook}
                    alt={book.title}
                    className="absolute top-10 sm:left-20 left-5 sm:w-1/3 w-1/2 transform  rounded-lg shadow-md"
                  />
                  <Image
                    src={imgBook}
                    alt={book.title}
                    className="absolute top-10 sm:left-60 left-[60px] sm:w-1/3 w-1/2 transform z-20 rounded-lg shadow-md"
                  />
                  <Image
                    src={imgBook}
                    alt={book.title}
                    className="absolute top-10 sm:left-80 left-20 sm:w-1/3 w-1/2 transform z-20  rounded-lg shadow-md"
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
              {books.map((book) => (
                <BookItem key={book.id} book={book} />
              ))}
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
              {books.map((book) => (
                <BookItem key={book.id} book={book} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
