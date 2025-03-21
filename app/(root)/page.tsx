"use client";

import { useTranslation } from "next-i18next";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Images } from "@/constant/images";
import { Book } from "@/constant/types";
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
      <div className="w-full bg-[#ececec] sm:pt-5 pt-0 pb-20">
        {/* Hero Section */}
        <div className="max-w-[1440px] mx-auto bg-gray-200 rounded-xl overflow-hidden">
          <div className="bg-[#0B3D9180] text-white py-20 sm:py-32 px-7">
            <div className="max-w-[1440px] mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Unlock a World of <span className="text-[#0B3D91] px-2">Creativity</span>
              </h1>
              <p className="text-lg sm:text-xl mb-8">
                Discover a creative world through books! We offer a vast collection to suit every taste,
                along with special offers just for you.
              </p>
            </div>
          </div>
          <div className="mx-auto sm:p-6 p-3 bg-[#0B3D91] text-white">
            <div className="flex flex-row items-center justify-between">
              <div className="w-[40%] sm:pl-10 pl-0">
                <h2 className="sm:text-2xl text-[16px] font-bold text-left mb-2">
                  {featuredBook.title}
                </h2>
                <p className="text-left mb-2 sm:text-[16px] text-[10px]">
                  {featuredBook.author}
                </p>
                <p className="mb-6 sm:block hidden text-justify">
                  {featuredBook.description}
                </p>{" "}
                <div className="flex sm:space-x-4 space-x-2 items-center">
                  <button className="bg-white text-black sm:px-4 px-2 sm:py-2 py-1 rounded-lg hover:bg-gray-400 shadow-lg text-sm">
                    {t("See more")}
                  </button>
                  <div className="sm:flex flex-row items-center hidden gap-1">
                    <span className=" mr-[-8] bg-white sm:py-2 sm:px-4 py-1 px-4 text-black rounded-lg shadow-lg text-sm">
                      ${featuredBook.price.toFixed(2)}
                    </span>
                    <button className="bg-blue-500 text-white sm:px-4 sm:py-2 hover:bg-blue-700 shadow-lg py-2 px-4 rounded-lg text-sm">
                      {t("Buy now")}
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-[60%] my-6 relative sm:h-[400px] h-[160px]">
                <div className="relative ml-10">
                  <Image
                    src={featuredBook.image}
                    alt={featuredBook.title}
                    className="w-1/2 sm:w-1/3 rounded-lg sm:left-40 top-10 left-10 z-10 absolute hover:-rotate-6  hover:top-2 transition-all duration-200 hover:scale-110"
                  />
                  <Image
                    src={featuredBook.image}
                    alt={featuredBook.title}
                    className="absolute top-10 left-0 sm:w-1/3 w-1/2 transform  rounded-lg shadow-md hover:-rotate-6  hover:top-2 transition-all duration-200 hover:scale-110 "
                  />
                  <Image
                    src={featuredBook.image}
                    alt={featuredBook.title}
                    className="absolute top-10 sm:left-20 left-5 sm:w-1/3 w-1/2 transform  rounded-lg shadow-md hover:-rotate-6  hover:top-2 transition-all duration-200 hover:scale-110"
                  />
                  <Image
                    src={featuredBook.image}
                    alt={featuredBook.title}
                    className="absolute top-10 sm:left-60 left-[60px] sm:w-1/3 w-1/2 transform z-20 rounded-lg shadow-md hover:-rotate-6  hover:top-2 transition-all duration-200 hover:scale-110"
                  />
                  <Image
                    src={featuredBook.image}
                    alt={featuredBook.title}
                    className="absolute top-10 sm:left-80 left-20 sm:w-1/3 w-1/2 transform z-20  rounded-lg shadow-md hover:-rotate-6  hover:top-2 transition-all duration-200 hover:scale-110"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Categories Section */}
        <div className="max-w-[1440px] mx-auto px-7 py-10">
          <p className="text-2xl font-bold text-[#0b3d91] mb-5">
            Popular Categories
          </p>

          <div className="flex justify-center items-center gap-10 md:gap-8 lg:gap-12 overflow-x-auto pb-10">
            <CategoryItem iconSrc={Images.fictionIcon} label="Fiction" />
            <CategoryItem iconSrc={Images.astronautIcon} label="Astronaut" />
            <CategoryItem iconSrc={Images.historyIcon} label="History" />
            <CategoryItem iconSrc={Images.mysteryIcon} label="Mystery" />
            <CategoryItem iconSrc={Images.scienceIcon} label="Science" />
            <CategoryItem iconSrc={Images.educationIcon} label="Education" />
          </div>
        </div>

        {/* New Arrival Section */}
        <div className="max-w-[1440px] mx-auto px-7 py-10">
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
        </div>

        {/* Big Spring Sales Section */}
        <div className="relative bg-white p-10 mb-10">
          <Image
            src={Images.banner}
            alt="big-spring-sales"
            className="rounded-xl shadow-lg"
            layout="responsive"
            width={1440}
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
    </Suspense >
  );
}

const CategoryItem: React.FC<{ iconSrc: any; label: string }> = ({ iconSrc, label }) => {
  return (
    <Link href={`/category/${label.toLowerCase()}`}>
      <div className="flex flex-row items-center justify-center min-w-[150px] max-w-[150px] h-[60px] bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 px-3 gap-2">
        <Image src={iconSrc} alt={`${label} Icon`} width={24} height={24} />
        <p className="text-sm font-normal text-black">{label}</p>
      </div>
    </Link>
  );
};

export default Home;
