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
import React from "react";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation("common");

  return (
    <div>
      <header className="bg-[#0B3D9180] p-4 overflow-hidden">
        <div className="sm:max-w-[1440px] max-w-full mx-auto flex justify-between items-center">
          <nav className="flex items-center overflow-hidden">
            <ul className="sm:flex hidden gap-8 font-serif text-white text-2xl">
              <li>
                <Link className=" hover:text-blue-500" href="/">
                  {t("Home")}
                </Link>
              </li>
              <li>
                <Link href="/category" className=" hover:text-blue-500">
                  {t("Category")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className=" hover:text-blue-500">
                  {t("FAQ")}
                </Link>
              </li>
              <li>
                <Link href="/about" className=" hover:text-blue-500">
                  {t("About")}
                </Link>
              </li>
            </ul>
            <h1 className=" font-serif sm:ml-20 ml-0 text-white sm:text-3xl text-[20px]">
              GreatBook
            </h1>{" "}
            {/* Brand Name */}
          </nav>

          <div className="flex items-center">
            <div className="relative sm:mr-4 mr-0">
              {" "}
              {/* Search Bar */}
              <input
                type="text"
                placeholder={t("Search...")}
                className="p-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
            <a
              href="/cart"
              className="mr-4  hover:text-blue-500 sm:block hidden"
            >
              <FontAwesomeIcon
                icon={faBagShopping}
                className="text-white text-3xl"
              />
            </a>

            <button className="bg-[#0B3D91] text-white p-2 rounded-md hover:bg-blue-700 sm:flex hidden items-center">
              {t("Login")}
              <FontAwesomeIcon icon={faUser} className="pl-3" />
            </button>
          </div>
        </div>
      </header>
      <div className="fixed sm:hidden bottom-0 left-0 right-0 bg-white translate-x-0 z-50 py-3">
        <ul className="flex justify-evenly">
          <li>
            <Link href="/" className="flex flex-col">
              <FontAwesomeIcon icon={faBars} />
              Home
            </Link>
          </li>
          <li>
            <Link href="/" className="flex flex-col">
              <FontAwesomeIcon icon={faTableCellsLarge} />
              Category
            </Link>
          </li>
          <li>
            <Link href="/" className="flex flex-col">
              <FontAwesomeIcon icon={faBagShopping} />
              Cart
            </Link>
          </li>
          <li>
            <Link href="/" className="flex flex-col">
              <FontAwesomeIcon icon={faUser} />
              Account
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
