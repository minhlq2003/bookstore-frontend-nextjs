"use client";

import { Images } from "@/constant/images";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  faBagShopping,
  faBars,
  faSearch,
  faTableCellsLarge,
  faUser,
  faSignIn,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { isLogin, logout } from "@/lib/actions/auth";
import { Book, BookListResponse } from "@/constant/types";
import { getBooks } from "@/modules/services/bookService";
import { set } from "lodash";

const Header = () => {
  const { t, i18n } = useTranslation("common");
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentLang =
    searchParams.get("lang") || localStorage.getItem("lang") || "en";
  const [scrollingUp, setScrollingUp] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState<Book[]>();
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setScrollingUp(currentScrollPos < prevScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const changeLanguage = (newLang: string) => {
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);

    const params = new URLSearchParams(searchParams);
    params.set("lang", newLang);
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    localStorage.setItem("lang", currentLang);
    i18n.changeLanguage(currentLang);
  }, [currentLang]);

  useEffect(() => {
    async function checkLoginStatus() {
      const loggedIn = await isLogin();
      const isAccountLoggedIn = localStorage.getItem("user");
      if (loggedIn || isAccountLoggedIn) {
        setIsLoggedIn(true);
      }
    }
    checkLoginStatus();
  }, []);
  function handleLogOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    logout();
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchTerm("");
        setBooks([]); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchBooks = async (searchTerm: string) => {
      const response = await getBooks({
        search: searchTerm,
      });
      if (response) {
        setBooks(response.data);
      } else {
        setBooks([]);
      }
    };

    if (searchTerm) {
      fetchBooks(searchTerm);
    }
  }, [searchTerm]);
const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };
  return (
    <div>
      <div className="h-[95px] sm:h-[75px] bg-[#ececec]" ref={searchRef}>
        <header
          className={`bg-[#0B3D9180] p-4 w-full fixed left-0 right-0 z-50 transition-all duration-300 ${
            !scrollingUp ? "top-[-100px]" : "top-0"
          }`}
        >
          <div className="sm:max-w-[1440px] max-w-full mx-auto flex justify-between items-start sm:items-center">
            <nav className="flex items-center">
              <Link href="/">
                <Image
                  src={Images.logo}
                  alt=""
                  className="rounded-full w-[50px] mr-20"
                />
              </Link>
              <ul className="sm:flex hidden gap-8  text-white text-xl">
                <li>
                  <Link href="/category" className="hover:text-[#0B3D91]">
                    {t("Category")}
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-[#0B3D91]">
                    {t("FAQ")}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#0B3D91]">
                    {t("About Us")}
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-[#0B3D91]">
                    {t("Blog")}
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="flex items-end sm:items-center gap-2 sm:gap-4 flex-col-reverse sm:flex-row ">
              {/* <select
                value={currentLang}
                onChange={changeLanguage}
                className="bg-white text-black px-2 py-1 rounded-md border sm:text-[16px] text-[10px]"
              >
                <option value="en">
                  <Image src={Images.englishFlag} alt="" /> EN
                </option>
                <option value="vi">
                  {" "}
                  <Image src={Images.vietnamFlag} alt="" /> VI
                </option>
              </select> */}

              <Select
                onValueChange={changeLanguage}
                value={currentLang}
                defaultValue="en"
              >
                <SelectTrigger className="w-[120px] py-1 h-6 sm:h-10">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black py-1 rounded-md border sm:text-[16px] text-[10px] w-[50px]">
                  <SelectItem value="en">
                    <div className="flex items-center gap-3">
                      <Image
                        src={Images.englishFlag}
                        alt=""
                        className="sm:w-7 w-5 h-3 sm:h-5"
                      />
                    </div>
                  </SelectItem>
                  <SelectItem value="vi">
                    <div className="flex items-center gap-3">
                      <Image
                        src={Images.vietnamFlag}
                        alt=""
                        className="sm:w-7 w-5 h-3 sm:h-5"
                      />
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              <div className="relative sm:mr-4 w-[80%]">
                <input
                  type="text"
                  placeholder={t("Search...")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="px-2 sm:py-2 py-0 w-full rounded-2xl border border-gray-300 placeholder:text-[12px] sm:placeholder:text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent text-black">
                  <FontAwesomeIcon icon={faSearch} onClick={() => (
                    router.push(`/search?query=${encodeURIComponent(searchTerm)}`),
                    setSearchTerm("")
                  )} />
                </button>
                {books && books.length > 0 && searchTerm && (
                  <div className="absolute flex flex-col gap-2  top-5 lg:top-10 bg-white border-2 border-[#0B3D91] rounded-md mt-2 w-full z-10 max-h-[300px] overflow-auto">
                    {books.map((book) => (
                      <div
                        key={book.id}
                        className="flex items-center gap-3 cursor-pointer hover:bg-[#0B3D9180] hover:text-white p-2"
                        onClick={() => (router.push(`/book/${book.id}`), setSearchTerm(""))}
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

              <Link
                href="/cart"
                className="mr-4 hover:text-blue-500 sm:block hidden"
              >
                <FontAwesomeIcon
                  icon={faBagShopping}
                  className="text-white hover:text-[#0B3D91] text-2xl"
                />
              </Link>

              <Link
                href="/profile"
                className="mr-4 hover:text-blue-500 sm:block hidden"
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-white hover:text-[#0B3D91] text-2xl"
                />
              </Link>

              {isLoggedIn ? (
                <button
                  onClick={() => (setIsLoggedIn(false), handleLogOut())}
                  className="bg-[#0B3D91] text-white whitespace-nowrap p-2 rounded-md hover:bg-blue-700 sm:flex hidden items-center"
                >
                  {t("Logout")}
                  <FontAwesomeIcon icon={faSignOut} className="pl-3" />
                </button>
              ) : (
                <Link
                  href="/signin"
                  className="bg-[#0B3D91] text-white p-2 whitespace-nowrap rounded-md hover:bg-blue-700 sm:flex hidden items-center"
                >
                  {t("Login")}
                  <FontAwesomeIcon icon={faSignIn} className="pl-3" />
                </Link>
              )}
            </div>
          </div>
        </header>
      </div>

      <div className="fixed sm:hidden bottom-0 left-0 right-0 bg-white translate-x-0 z-50 py-3">
        <ul className="flex justify-evenly">
          <li>
            <Link href="/" className="flex flex-col">
              <FontAwesomeIcon icon={faBars} />
              {t("Home")}
            </Link>
          </li>
          <li>
            <Link href="/category" className="flex flex-col">
              <FontAwesomeIcon icon={faTableCellsLarge} />
              {t("Category")}
            </Link>
          </li>
          <li>
            <Link href="/cart" className="flex flex-col">
              <FontAwesomeIcon icon={faBagShopping} />
              {t("Cart")}
            </Link>
          </li>
          <li>
            <Link href="/account" className="flex flex-col">
              <FontAwesomeIcon icon={faUser} />
              {t("Account")}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
