'use client'
import { ModalCheckoutSuccessProps } from "@/constant/types";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";

const ModalCheckoutSuccess = ({date, numberOfItem, address, name, total}:ModalCheckoutSuccessProps) => {
    const { t } = useTranslation("common");
    const router = useRouter();
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-5 w-[80%] max-w-[800px] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <div className="relative flex flex-col items-center justify-center">
            <div className="relative top-0 left-0 size-10 lg:size-16 rounded-full bg-customblue ">
              <div className="absolute inset-0 rounded-full bg-customblue z-20 animate-ping [animation-duration:2s]"></div>
              <div className="absolute inset-0 rounded-full bg-customblue z-10 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-white hover:text-[#0B3D91] text-2xl z-30"
                />
              </div>
            </div>
            <h1 className="text-black text-lg lg:text-2xl font-bold text-center">
              {t("Payment was successful")}
            </h1>
            <p className="text-center text-sm lg:text-base text-black/70 w-[80%] lg:w-[70%]">
              {t("Yes! Your payment has been successful and your order has been placed. If there is any problem, please contact us as soon as possible.")}
            </p>
          </div>
          <div className="flex justify-between w-full gap-5 lg:px-[15%]">
            <div className="flex flex-col gap-2 text-sm lg:text-base">
              <p>{t("Date")}:</p>
              <p>{t("Number of item")}:</p>
              <p>{t("Delivery Fee")}:</p>
              <p>{t("Address")}:</p>
              <p>{t("Name")}:</p>
            </div>
            <div className="flex flex-col gap-2 text-sm lg:text-base items-end">
              <p>{date}</p>
              <p>{numberOfItem}</p>
              <p>$0.00</p>
              <p>{address}</p>
              <p>{name}</p>
            </div>
          </div>
        </div>
        <div className="p-3 text-white rounded-md flex items-center justify-center bg-customblue text-lg lg:text-xl font-bold">
          <p>${total.toFixed(2)}</p>
        </div>
        <button
          onClick={() => (
            localStorage.removeItem("tempOrder"), router.push("/")
          )}
          className="text-base w-[30%] h-[40px] rounded-md mt-4"
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default ModalCheckoutSuccess;
