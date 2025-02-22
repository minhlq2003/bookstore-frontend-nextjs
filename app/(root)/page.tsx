// app/page.tsx
"use client";

import { useTranslation } from "next-i18next";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Images } from "@/constant/images";
import { Book } from "@/constant/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAtom,
  faBookmark,
  faClockRotateLeft,
  faGraduationCap,
  faMask,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import BookItem from "@/components/book-item";

function Home() {
  const { t } = useTranslation("common");

  const featuredBook = {
    title: "CHASING NEW HORIZONS",
    author: "By Alan Stern",
    description:
      "The book tells a story of a space probe to Pluto, that was proposed by the author, Alan Stern, in the early 1990s.",
    price: 19.0,
    image: Images.bookImg,
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
    <Suspense fallback={<div>Loading...</div>}>
      {/* <div>
        <h1>{t("welcome")}</h1>
        <p>{t("language")}</p>
      </div> */}
      <div className="w-full bg-[#ececec] sm:pt-5 pt-0 pb-20">
        {/* Hero Section */}
        <div className="max-w-[1440px] mx-auto bg-gray-200 rounded-xl overflow-hidden my-5">
          {" "}
          {/* Bao bọc phần hero trong div với class mx-auto để căn giữa */}
          <div className="bg-[#0B3D91] text-white py-4 text-left sm:text-3xl text-xl font-bold sm:pl-10 pl-3">
            {t("FEATURED BOOK")} {/* Thay đổi tiêu đề */}
          </div>
          <div className="mx-auto sm:p-6 p-3 bg-[#0B3D9180] text-white">
            {" "}
            {/* Điều chỉnh padding */}
            <div className="flex flex-row items-center justify-between">
              {" "}
              {/* Sử dụng items-center */}
              <div className="w-[40%] sm:pl-10 pl-0">
                <h2 className="sm:text-2xl text-[16px] font-bold text-left mb-2">
                  {" "}
                  {/* Căn chỉnh tiêu đề sang trái */}
                  {featuredBook.title}
                </h2>
                <p className="text-left mb-2 sm:text-[16px] text-[10px]">
                  {" "}
                  {/* Căn chỉnh tác giả sang trái */}
                  {featuredBook.author}
                </p>
                <p className="mb-6 sm:block hidden text-justify">
                  {featuredBook.description}
                </p>{" "}
                {/* Cho đoạn text description dễ nhìn hơn */}
                <div className="flex sm:space-x-4 space-x-2">
                  <button className="bg-white text-black sm:px-4 px-2 sm:py-2 py-1 rounded-lg hover:bg-gray-400 shadow-lg text-sm">
                    {t("See more")}
                  </button>
                  <div className="sm:flex flex-row items-center hidden gap-1">
                    <span className=" mr-[-8] bg-white sm:py-2 py-1 px-4 text-black rounded-lg shadow-lg text-sm">
                      ${featuredBook.price.toFixed(2)}
                    </span>
                    <button className="bg-blue-500 text-white sm:px-4 px-2 rounded-lg hover:bg-blue-700 shadow-lg py-[6px] text-sm">
                      {t("Buy now")}
                    </button>
                  </div>
                </div>
              </div>
              <div className=" w-[60%] relative">
                {" "}
                {/* Bao phần ảnh trong một div */}
                <Image
                  src={featuredBook.image}
                  alt={featuredBook.title}
                  className="w-[230px] h-[350px] rounded-lg float-right sm:mt-0 mt-2 mr-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Popular Categories Section*/}
        <div className="max-w-[1440px] mx-auto">
          <p className="text-xl font-bold text-[#0b3d91] px-7 pt-10 pb-5">
            Popular Categories
          </p>

          <div className="flex gap-4 items-center justify-center pb-10">
            <div className="w-[75px] h-[75px] flex items-center justify-center bg-gray-200 rounded-lg">
              <FontAwesomeIcon
                icon={faBookmark}
                className="text-[#0b3d91]"
                size="2xl"
              />
            </div>

            <div className="w-[75px] h-[75px] flex items-center justify-center bg-gray-200 rounded-lg">
              <FontAwesomeIcon
                icon={faRocket}
                className="text-[#0b3d91]"
                size="2xl"
              />
            </div>

            <div className="w-[75px] h-[75px] flex items-center justify-center bg-gray-200 rounded-lg">
              <FontAwesomeIcon
                icon={faClockRotateLeft}
                className="text-[#0b3d91]"
                size="2xl"
              />
            </div>

            <div className="w-[75px] h-[75px] flex items-center justify-center bg-gray-200 rounded-lg">
              <FontAwesomeIcon
                icon={faMask}
                className="text-[#0b3d91]"
                size="2xl"
              />
            </div>

            <div className="w-[75px] h-[75px] flex items-center justify-center bg-gray-200 rounded-lg">
              <FontAwesomeIcon
                icon={faAtom}
                className="text-[#0b3d91]"
                size="2xl"
              />
            </div>
            <div className="w-[75px] h-[75px] flex items-center justify-center bg-gray-200 rounded-lg">
              <FontAwesomeIcon
                icon={faGraduationCap}
                className="text-[#0b3d91]"
                size="2xl"
              />
            </div>
          </div>

          <div className="flex gap-4 items-center justify-center pb-10">
            <p>Fiction</p>
            <p>Astronaut</p>
            <p>History</p>
            <p>Mystery</p>
            <p>Science</p>
            <p>Education</p>
          </div>
        </div>

        {/* New Arrival Section */}
        <div className="max-w-[1440px] mx-auto px-7 py-10">
          {" "}
          {/* Điều chỉnh margin và padding */}
          <h2 className="text-2xl font-bold text-[#0b3d91] mb-5">
            {t("New Arrival")}
          </h2>{" "}
          {/* Thêm tiêu đề */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {" "}
            {/* Điều chỉnh lưới */}
            {books.map((book) => (
              <BookItem key={book.id} book={book} />
            ))}
          </div>
        </div>

        {/* Big Spring Sales Section -- Chưa làm */}
        <div className="relative bg-white p-10 mb-10">
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">
            {t("BIG SPRING SALES")}
          </h2>
          <Image
            src={Images.banner}
            alt="big-spring-sales"
            className="rounded-lg"
          />
        </div>

        {/* Popular Collection Section -- giống phần new arrival -- chưa làm */}
      </div>
    </Suspense>
  );
}

export default Home;
