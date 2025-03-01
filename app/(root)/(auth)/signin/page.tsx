"use client";

import { useTranslation } from "next-i18next";
import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Images } from "../../../../constant/images";
import { Eye, EyeOff } from "lucide-react";
import { loginWithGoogle } from "@/lib/actions/auth";

function SignIn() {
  const { t } = useTranslation("common");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
            {t("LOGIN")}
          </h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <span
                className="absolute inset-y-0 right-0 top-8 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff color="gray" /> : <Eye color="gray" />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {t("LOG IN")}
            </button>
            <div className="mt-4 text-center text-gray-500">
              <p>
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-blue-500 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="mt-6 text-center text-gray-500">
              <p>or continue with</p>
            </div>

            
          </form>
          <button
              className="w-full bg-white border text-black border-gray-300 rounded-md py-2 px-4 flex items-center justify-center mt-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
              onClick={() => loginWithGoogle()}
            >
              <Image
                src={Images.googleIcon}
                alt="Google Icon"
                width={20}
                height={20}
                className="mr-2"
              />
              Continue with Google
            </button>
        </div>
      </div>
    </Suspense>
  );
}

export default SignIn;
