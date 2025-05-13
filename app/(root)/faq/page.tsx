"use client";
import { faqsData } from "@/data/faqData";
import React from "react";
import { useTranslation } from "react-i18next";

const page = () => {
  const { t } = useTranslation("common");
  return (
    <div className="max-w-[1200px] mx-auto">
      <h1 className=" text-center text-base md:text-xl lg:text-3xl py-6 text-darkblue font-bold uppercase">
        {t("FAQ")}
      </h1>
      <div className="flex flex-col items-start justify-center">
        {faqsData.map((item) => (
        <div key={item.id} className="flex flex-col py-3 lg:py-6 px-6 gap-3 mb-3 lg:mb-6">
          <h1 className="text-red-600 lg:text-2xl font-bold">{t(item.question)}</h1>
          <p className="text-black lg:text-xl">{t(item.answer)}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default page;
