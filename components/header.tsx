"use client";

import {
  faBagShopping,
  faBars,
  faSearch,
  faTableCellsLarge,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation("common");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentLang =
    searchParams.get("lang") || localStorage.getItem("lang") || "en";
  const [scrollingUp, setScrollingUp] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setScrollingUp(currentScrollPos < prevScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = event.target.value;
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

  return (
    <div>
      <div className="h-[75px] bg-[#ececec]">
        <header
          className={`bg-[#0B3D9180] p-4 w-full fixed left-0 right-0 z-50 transition-all duration-300 ${
            !scrollingUp ? "top-[-100px]" : "top-0"
          }`}
        >
          <div className="sm:max-w-[1440px] max-w-full mx-auto flex justify-between items-start sm:items-center">
            <nav className="flex items-center">
              <ul className="sm:flex hidden gap-8  text-white text-2xl">
                <li>
                  <Link className="hover:text-blue-500" href="/">
                    {t("Home")}
                  </Link>
                </li>
                <li>
                  <Link href="/category" className="hover:text-blue-500">
                    {t("Category")}
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-blue-500">
                    {t("FAQ")}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-blue-500">
                    {t("About Us")}
                  </Link>
                </li>
              </ul>
              <Link href="/">
                <h1 className="font-serif sm:ml-20 ml-0 text-white sm:text-3xl text-[20px]">
                  GreatBook
                </h1>
              </Link>
            </nav>

            <div className="flex items-end sm:items-center gap-2 sm:gap-4 flex-col-reverse sm:flex-row ">
              <select
                value={currentLang}
                onChange={changeLanguage}
                className="bg-white text-black px-2 py-1 rounded-md border sm:text-[16px] text-[10px]"
              >
                <option value="en">English</option>
                <option value="vi">Tiếng Việt</option>
              </select>

              <div className="relative sm:mr-4 w-[80%]">
                <input
                  type="text"
                  placeholder={t("Search...")}
                  className="px-2 sm:py-2 py-0 w-full rounded-2xl border border-gray-300 placeholder:text-[12px] sm:placeholder:text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>

              <Link
                href="/cart"
                className="mr-4 hover:text-blue-500 sm:block hidden"
              >
                <FontAwesomeIcon
                  icon={faBagShopping}
                  className="text-white text-3xl"
                />
              </Link>

              <Link
                href="/signin"
                className="bg-[#0B3D91] text-white p-2 rounded-md hover:bg-blue-700 sm:flex hidden items-center"
              >
                {t("Login")}
                <FontAwesomeIcon icon={faUser} className="pl-3" />
              </Link>
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
