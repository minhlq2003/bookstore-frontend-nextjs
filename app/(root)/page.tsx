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

  const book = {
    title: "CHASING NEW HORIZONS",
    author: "By Alan Stern",
    description:
      "The book tells a story of a space probe to Pluto, that was proposed by the author, Alan Stern, in the early 1990s.",
    price: 19.0,
    image: Images.bookImg,
  };

  const popularCollections: Book[] = [
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
        <div className="bg-[#0B3D9180] text-white py-10 text-center">
          <p className="text-3xl sm:text-5xl font-bold text-white leading-tight">
            Unlock a World of <span className="text-[#0B3D91]">Creativity</span>
          </p>
          <p className="text-xl text-white mt-4 max-w-lg mx-auto">
            Discover a creative world through books! We offer a vast collection to suit every taste, along with special offers just for you.
          </p>
        </div>

        <div className="mx-auto sm:p-6 p-3 bg-[#0B3D91] text-white">
          <div className="flex flex-row items-between justify-between">
            <div className="w-[40%] sm:pl-10 pl-0">
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
                  src={Images.bookImg}
                  alt={book.title}
                  className="w-1/2 sm:w-1/3 rounded-lg sm:left-40 top-10 left-10 z-10 absolute hover:-rotate-6  hover:top-2 transition-all duration-200 hover:scale-110"
                />
                <Image
                  src={Images.bookImg}
                  alt={book.title}
                  className="absolute top-10 left-0 sm:w-1/3 w-1/2 transform  rounded-lg shadow-md hover:-rotate-6  hover:top-2 transition-all duration-200 hover:scale-110 "
                />
                <Image
                  src={Images.bookImg}
                  alt={book.title}
                  className="absolute top-10 sm:left-20 left-5 sm:w-1/3 w-1/2 transform  rounded-lg shadow-md hover:-rotate-6  hover:top-2 transition-all duration-200 hover:scale-110"
                />
                <Image
                  src={Images.bookImg}
                  alt={book.title}
                  className="absolute top-10 sm:left-60 left-[60px] sm:w-1/3 w-1/2 transform z-20 rounded-lg shadow-md hover:-rotate-6  hover:top-2 transition-all duration-200 hover:scale-110"
                />
                <Image
                  src={Images.bookImg}
                  alt={book.title}
                  className="absolute top-10 sm:left-80 left-20 sm:w-1/3 w-1/2 transform z-20  rounded-lg shadow-md hover:-rotate-6  hover:top-2 transition-all duration-200 hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Popular Categories Section */}
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
        {/* <div className="max-w-[1440px] mx-auto px-7 py-10">
          {" "}
          <h2 className="text-2xl font-bold text-[#0b3d91] mb-5">
            {t("New Arrival")}
          </h2>{" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {" "}
            {books.map((book) => (
              <BookItem key={book.id} book={book} />
            ))}
          </div>
        </div> */}

        {/* New Arrival Section */}
        <div className="max-w-[1440px] mx-auto px-7 py-10">
          <h2 className="text-2xl font-bold text-[#0b3d91] mb-5">
            {t("New Arrival")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {books.map((book) => (
              <BookItem key={book.id} book={book} />
            ))}
          </div>
        </div>

        {/* Big Spring Sales Section */}
        <div className="relative bg-white p-10 mb-10">
          <Image
            src={Images.banner} // Sử dụng ảnh banner từ Images constant
            alt="big-spring-sales"
            className="rounded-lg"
            layout="responsive" // Đảm bảo ảnh responsive
            width={1440} // Kích thước tham khảo (có thể tùy chỉnh)
            height={400}
          />
        </div>

        {/* Popular Collection Section */}
        <div className="max-w-[1440px] mx-auto px-7 py-10">
          <h2 className="text-2xl font-bold text-[#0b3d91] mb-5">
            {t("Popular Collections")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularCollections.map((book) => (
              <BookItem key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default Home;
