"use client";
import Image from "next/image";
import React from "react";
import { Images } from "@/constant/images";
import { useTranslation } from "react-i18next";
const page = () => {
  const { t } = useTranslation("common");
  return (
    <div className="h-auto px-[10%] py-10 ">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-3">
        <div className="overflow-hidden flex-shrink-0 w-full lg:w-[600px]">
          <Image
            src={Images.aboutusImg01}
            alt="About us"
            width={600}
            height={800}
            className="hover:scale-110 transition-all duration-500 w-full"
          />
        </div>
        <div className="flex flex-col items-start gap-2 lg:gap-5 max-w-[800px]">
          <h1 className="text-2xl lg:text-4xl font-bold text-black">
            {t("Nice to meet you!")}
          </h1>
          <h1 className="text-xl lg:text-3xl font-bold italic text-black">
            {t("We are Great Book!")}
          </h1>
          <p className="text-base lg:text-xl text-black">
            {t(
              "We're based in Ho Chi Minh City, where our passion for books and love for reading come together to create a cozy space for every kind of reader. Our shop offers a wide range of physical books, from best-selling novels and children's stories to self-help, business, and educational titles. Whether you're a curious learner or a lifelong book lover, we've got something for you."
            )}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center my-40">
        <h1 className="text-2xl lg:text-4xl font-bold text-black italic text-center max-w-[800px]">
          {t(
            "“A reader lives a thousand lives before he dies. The man who never reads lives only one.”"
          )}
        </h1>
        <p className="text-base lg:text-xl text-black">George R.R. Martin</p>
      </div>
      <div className="flex flex-col-reverse lg:flex-row justify-between">
        <div className="max-w-[800px]">
          <h1 className="text-xl lg:text-3xl font-bold text-black">
            {t("Our mission is simple")}
          </h1>
          <p className="text-base lg:text-xl text-black py-3">
            {t(
              "Make great books easy to discover and even easier to own. We believe in the magic of holding a real book, turning every page, and building your own personal library."
            )}
          </p>
          <h1 className="text-xl lg:text-3xl font-bold text-black">
            {t("At Great Book we value")}
          </h1>
          <ul className="py-3 list-disc flex flex-col gap-1 lg:gap-2 pl-10">
            <li className="text-base lg:text-xl text-black">
              <span className="font-bold">{t("Quality")}</span>{": "}
              {t(
                "We carefully select and deliver well-printed books in excellent condition."
              )}
            </li>
            <li className="text-base lg:text-xl text-black">
              <span className="font-bold">{t("Simplicity")}</span>{": "}
              {t(
                "A smooth, hassle-free shopping experience from browsing to delivery."
              )}
            </li>
            <li className="text-base lg:text-xl text-black">
              <span className="font-bold">{t("Support")}</span>{": "}
              {t("Dedicated customer service to help you at every step.")}
            </li>
          </ul>
        </div>
        <div className="overflow-hidden flex-shrink-0 w-full lg:w-[600px]">
          <Image
            src={Images.aboutusImg02}
            alt="About us"
            width={600}
            height={800}
            className="hover:scale-110 transition-all duration-500 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
