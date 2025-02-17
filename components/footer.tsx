"use client";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation("common");

  return (
    <footer className="bg-[#0b3d91]  text-white sm:p-10 p-3 overflow-hidden">
      <div className="max-w-[1440px] w-full mx-auto pt-5 flex justify-between sm:flex-row flex-col">
        <div className="text-center sm:w-1/4 w-full">
          <h2 className="sm:text-3xl text-xl font-bold mb-4">GreatBook</h2>
          <p className="sm:text-md text-[10px]">
            Discover a creative world through books! We offer a vast collection
            to suit every taste, along with special offers just for you.
          </p>
        </div>
        <div className="sm:w-1/2 w-full  flex justify-between sm:text-left text-center sm:ml-5 ml-0 sm:mt-0 mt-5">
          <div className="w-full ">
            <h3 className="font-bold mb-4 sm:text-2xl text-sm">
              {t("Company")}
            </h3>
            <a
              href="/contact"
              className="block sm:text-xl text-xs mb-2 hover:underline"
            >
              {t("Contact Us")}
            </a>
            <a
              href="/about"
              className="block sm:text-xl text-xs mb-2 hover:underline"
            >
              {t("About Us")}
            </a>
          </div>
          <div className="w-full ">
            <h3 className="font-bold mb-4 sm:text-2xl text-sm">
              {t("Support")}
            </h3>
            <a
              href="/privacy-policy"
              className="block sm:text-xl text-xs mb-2 hover:underline"
            >
              {t("Private Policy")}
            </a>
            <a
              href="/terms-of-use"
              className="block sm:text-xl text-xs mb-2 hover:underline"
            >
              {t("Terms of Use")}
            </a>
          </div>
          <div className="w-full ">
            <h3 className="font-bold mb-4 sm:text-2xl text-sm">
              {t("Account")}
            </h3>
            <a
              href="/my-account"
              className="block sm:text-xl text-xs mb-2 hover:underline"
            >
              {t("My Account")}
            </a>
            <a
              href="/cart"
              className="block sm:text-xl text-xs mb-2 hover:underline"
            >
              {t("My Cart")}
            </a>
          </div>
          <div className="w-full ">
            <h3 className="font-bold mb-4 sm:text-2xl text-sm">
              {t("Contact")}
            </h3>
            <div className="flex space-x-4 sm:pl-0 pl-5">
              <Link href="#" target="_blank" rel="noopener noreferrer">
                <div className="facebook-icon rounded-full flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className="sm:text-3xl text-lg"
                  />
                </div>
              </Link>
              <Link href="#" target="_blank" rel="noopener noreferrer">
                <div className="google-icon rounded-full flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faGoogle}
                    className="sm:text-3xl text-lg"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 text-sm sm:mb-0 mb-20">
        <p>Copyright © 2024. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
