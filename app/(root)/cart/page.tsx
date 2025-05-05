"use client";
import { Book } from "@/constant/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Book[]>([]);
  const { t } = useTranslation("common");

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      const parsedCart = JSON.parse(cartData) as Book[];
      setCartItems(parsedCart);
    }
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto h-screen py-10 md:py-20 lg:py-24 bg-white">
      <h1 className=" text-center text-base md:text-xl lg:text-3xl py-3 text-darkblue font-bold uppercase">
        Cart
      </h1>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
        <div className="border rounded-lg p-4 shadow-md w-full bg-white max-h-[300px] lg:max-h-[550px] overflow-y-auto">
          <div className="flex items-center justify-between border-b pb-2 font-semibold text-xs lg:text-base">
            <div className="flex items-center gap-2">
              <input type="radio" name="select-all" />
              <span>All</span>
            </div>
            <span>Title</span>
            <span>Quantity</span>
            <span>Total</span>
            <span>{""}</span>
          </div>
          {cartItems.map((item: Book) => (
            <div key={item.id} className="flex flex-col gap-2">
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4 text-xs lg:text-base">
                  <input type="radio" />
                  <Image
                    src={item.book_images[0].url}
                    alt="Book"
                    width={100}
                    height={100}
                    className="w-12 h-16 object-cover"
                  />
                  <div className="w-[40px] lg:w-[140px]">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-customblue">${item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-1 md:px-2 md:py-1 border rounded">
                    −
                  </button>
                  <span>1</span>
                  <button className="px-1 md:px-2 md:py-1 border rounded">
                    +
                  </button>
                </div>

                <p className="text-blue-600">${item.price}</p>
                <FontAwesomeIcon icon={faRemove} className="size-5" />
              </div>
              <hr className="my-3 border border-black w-full" />
            </div>
          ))}
        </div>
        <div className="py-3 mt-10 md:mt-0 md:mx-3 md:mr-3 px-5 text-black rounded md:w-[40%] bg-white border shadow-md">
          <div className="mt-3 flex flex-col gap-1">
            <div className="flex justify-between text-xs lg:text-base">
              <span>Subtotal:</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between text-xs lg:text-base">
              <span>Transfer Fee:</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg lg:text-xl my-2">
              <span>Total:</span>
              <span className="text-darkblue">$0.00</span>
            </div>
          </div>
          <button className="bg-blue text-white w-full h-7 md:h-9 lg:h-12 rounded-lg">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
