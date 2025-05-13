"use client";
import { CartResponse, User } from "@/constant/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import {
  deleteCartItem,
  getCartItems,
  updateCartItemQuantity,
} from "@/modules/services/cartService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartResponse[]>([]);
  const { t } = useTranslation("common");
  const [user, setUser] = useState<User | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }
  }, []);

  const updateItemQuantity = async (
    itemId: number,
    bookId: number,
    newQuantity: number
  ) => {
    const finalQuantity = newQuantity < 1 ? 1 : newQuantity;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: finalQuantity } : item
      )
    );
    try {
      const response = await updateCartItemQuantity(
        itemId,
        bookId,
        finalQuantity
      );
      if (response?.success) {
        toast.success("Cart updated successfully");
      } else {
        toast.error("Failed to update cart item quantity");
      }
    } catch (error) {
      toast.error("Failed to update cart item quantity");
    }
  };

  const getAllCartItems = async (userId: number) => {
    setLoading(true);
    try {
      const response = await getCartItems(userId);
      if (response?.success) {
        setCartItems(response?.data);
        if (response.data.length === 0) {
          setIsEmpty(true);
        } else {
          setIsEmpty(false);
        }
      } else {
        toast.error("Failed to fetch cart items");
      }
    } catch (error) {
      toast.error("Failed to fetch cart items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    getAllCartItems(user.id as number);
  }, [user]);

  useEffect(()=>{
    if(cartItems.length === 0){
      setIsEmpty(true)
    } else {
      setIsEmpty(false)
    }
  },[cartItems])

  const subtotal = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((acc, item) => {
      const price = parseFloat(item.book.price);
      return acc + item.quantity * (isNaN(price) ? 0 : price);
    }, 0);

  const handleRemoveItem = async (itemId: number) => {
    try {
      const response = await deleteCartItem(itemId);
      if (response?.success) {
        toast.success("Item removed from cart successfully");
        setCartItems((prev) => prev.filter((item) => item.id !== itemId));
      }
    } catch (error) {
      toast.error("Failed to remove cart item");
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  const handleSelectItem = (itemId: number) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleCheckout = () => {
    if(selectedItems.length === 0){
      toast.error("Please select at least one item")
      return;
    }
    const tempOrder = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );
    localStorage.setItem("tempOrder", JSON.stringify(tempOrder));
    router.push("/cart/checkout");
  };

  return (
    <div className="max-w-[1200px] mx-auto h-screen py-10 md:py-20 lg:py-24 bg-white">
      <h1 className=" text-center text-base md:text-xl lg:text-3xl py-3 text-darkblue font-bold uppercase">
        {t("Cart")}
      </h1>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
        <div className="border rounded-lg p-4 shadow-md w-full bg-white max-h-[300px] lg:max-h-[550px] overflow-y-auto">
          <div className="flex items-center justify-between border-b pb-2 font-semibold text-xs lg:text-base">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={
                  selectedItems.length === cartItems.length &&
                  cartItems.length > 0
                }
                onChange={handleSelectAll}
              />
              <span>All</span>
            </div>
            <span>Title</span>
            <span>Quantity</span>
            <span>Total</span>
            <span>{""}</span>
          </div>
          {loading ? (
            <p className="text-base">Loading cart...</p>
          ) : (
            <>
              {cartItems.length === 0 ? (
                <div className="py-2">
                  <p className="text-xl font-bold w-full text-center">Cart is empty.</p>
                </div>
              ) : (
                <>
                  {cartItems.map((item: CartResponse) => (
                    <div key={item.id} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-4 text-xs lg:text-base">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                          />
                          <Image
                            src={item.book.image}
                            alt="Book"
                            width={100}
                            height={100}
                            className="w-12 h-16 object-cover"
                          />
                          <div className="w-[40px] lg:w-[140px]">
                            <p className="font-medium">{item.book.title}</p>
                            <p className="text-customblue">
                              ${item.book.price}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateItemQuantity(
                                item.id,
                                item.book_id,
                                item.quantity - 1
                              )
                            }
                            className="px-1 md:px-2 md:py-1 border rounded"
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateItemQuantity(
                                item.id,
                                item.book_id,
                                item.quantity + 1
                              )
                            }
                            className="px-1 md:px-2 md:py-1 border rounded"
                          >
                            +
                          </button>
                        </div>

                        <p className="text-blue-600">
                          $
                          {(item.quantity * Number(item.book.price)).toFixed(2)}
                        </p>
                        <FontAwesomeIcon
                          onClick={() => handleRemoveItem(item.id)}
                          icon={faRemove}
                          className="size-5 cursor-pointer"
                        />
                      </div>
                      <hr className="my-3 border border-black w-full" />
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
        <div className="py-3 mt-10 md:mt-0 md:mx-3 md:mr-3 px-5 text-black rounded md:w-[40%] bg-white border shadow-md">
          <div className="mt-3 flex flex-col gap-1">
            <div className="flex justify-between text-xs lg:text-base">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs lg:text-base">
              <span>Transfer Fee:</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg lg:text-xl my-2">
              <span>Total:</span>
              <span className="text-darkblue">${subtotal.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            disabled={isEmpty}
            className={`text-white w-full h-7 md:h-9 lg:h-12 rounded-lg ${isEmpty ? "bg-gray-400" : "bg-blue"}`}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
