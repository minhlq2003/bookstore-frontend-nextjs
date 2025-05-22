"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

interface StripeCheckoutProps {
  amount: string;
  userId: number;
  addressId: string;
  email: string;
}

const StripeCheckout = ({ amount, userId, addressId, email }: StripeCheckoutProps) => {
  const { t } = useTranslation("common");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    setIsLoading(true);
    localStorage.setItem('tempAddress', JSON.stringify(addressId));
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          userId,
          addressId,
          email,
        }),
      });

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      } else {
        toast.error(t("Failed to create checkout session"));
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(t("Something went wrong with the payment process"));
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 border rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">{t("Card Payment")}</h3>
      <p className="mb-4">{t("Total Amount")}: ${amount}</p>
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className="bg-blue-600 text-white py-2 px-4 rounded-md w-full hover:bg-blue-700 transition-colors"
      >
        {isLoading ? t("Processing...") : t("Proceed to Payment")}
      </button>
      <p className="mt-4 text-sm text-gray-500 text-center">
        {t("You will be redirected to Stripe for secure payment processing")}
        <br />
        <br />
        <br />
        <b>{t("Please note that this is a test environment, use the card 4242 4242 4242 4242 or 5555 5555 5555 4444 to pay!")}</b>
      </p>
    </div>
  );
};

export default StripeCheckout;