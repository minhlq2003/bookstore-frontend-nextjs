"use client";
import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faHistory, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { CartResponse } from "@/constant/types";
import { checkout } from '@/modules/services/cartService';

export default function CheckoutSuccessPage() {
  const { t } = useTranslation("common");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(true);
  // Use a ref to track if verification has been attempted
  const verificationAttempted = useRef(false);

  useEffect(() => {
    // Only run verification if it hasn't been attempted yet
    if (verificationAttempted.current) return;

    async function verifyPayment() {
      // Mark that verification has been attempted
      verificationAttempted.current = true;

    const sessionId = searchParams.get('session_id');
    const payType = searchParams.get('type');
    const userId = searchParams.get('userId');
    let cartItemIds: number[] = []

    if (!sessionId || !payType) {
      toast.error(t("Invalid session"));
      router.push('/cart');
      return;
    }

    if (payType === "CASH") {
      setTimeout(() => {
        localStorage.removeItem('tempOrder');
        setIsVerifying(false);
        }, 2500);
    } else if (payType === "CARD") {
      let tempOrder = localStorage.getItem("tempOrder");
      if (tempOrder) {
      try {
            const parsedOrder: CartResponse[] = JSON.parse(tempOrder);
            cartItemIds = parsedOrder.map((item: CartResponse) => item.id);
      } catch (error) {
            console.error("Error parsing tempOrder:", error);
            toast.error(t("Error processing your order"));
        router.push('/cart');
            return;
      }
    }

        let tempAddress = localStorage.getItem('tempAddress') ?? 'No Address';
        try {
          const response = await checkout(Number(userId), tempAddress, "CARD", cartItemIds);
          if (response?.success) {
            setIsVerifying(false);
            localStorage.removeItem('tempOrder');
            localStorage.removeItem('tempAddress');
          } else {
            toast.error(t("Payment verification failed"));
            router.push('/cart');
  }
        } catch (error) {
          console.error("Checkout error:", error);
          toast.error(t("Error verifying payment"));
          router.push('/cart');
        }
      }
    }

    verifyPayment();
  }, [searchParams, router, t]);

  return (
    <div className="max-w-[1200px] mx-auto min-h-screen py-20 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-full max-w-md">
        {isVerifying ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <h2 className="text-xl font-semibold">{t("Verifying your payment...")}</h2>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <FontAwesomeIcon 
              icon={faCheckCircle} 
              className="text-green-500 text-6xl mb-4" 
            />
            <h2 className="text-2xl font-bold text-green-600 mb-4">{t("Payment Successful!")}</h2>
            <p className="mb-6">{t("Thank you for your purchase. Your order has been processed successfully.")}</p>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button
              onClick={() => router.push('/')}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 flex-1"
            >
                <FontAwesomeIcon icon={faShoppingBag} />
              {t("Continue Shopping")}
            </button>
              <button
                onClick={() => router.push('/orderhistory')}
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2 flex-1"
              >
                <FontAwesomeIcon icon={faHistory} />
                {t("View Orders")}
              </button>
      </div>
    </div>
        )}
      </div>
    </div>
  );
}