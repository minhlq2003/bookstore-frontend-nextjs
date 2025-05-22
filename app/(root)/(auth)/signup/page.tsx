"use client";
import { Images } from "@/constant/images";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";
import {loginWithGoogle} from "@/lib/actions/auth";

function SignUp() {
  const { t } = useTranslation("common");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg sm:my-20 my-10 shadow-md p-8">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
            {t("SIGN UP")}
          </h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                {t("Email")}
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                {t("Username")}
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                {t("Password")}
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  ></svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  ></svg>
                )}
              </span>
            </div>
            <div className="mb-6 relative">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                {t("Confirm Password")}
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    {/* ... eye-off icon ... */}
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    {/* ... eye icon ... */}
                  </svg>
                )}
              </span>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {t("SIGN UP")}
            </button>

            <div className="mt-4 text-center text-gray-500">
              <p>
                {t("Already have an account?")}
                <Link href="/signin" className="text-blue-500 hover:underline">
                  {t("Log in")}
                </Link>
              </p>
            </div>
          </form>
            <div className="mt-6 text-center text-gray-500">
              <p>{t("or continue with")}</p>
            </div>
            <button onClick={() => loginWithGoogle()} className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 flex items-center justify-center mt-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
              <Image
                src={Images.googleIcon}
                alt="Google Icon"
                width={20}
                height={20}
                className="mr-2"
              />
              <p className="text-black">{t("Continue with Google")}</p>
            </button>

        </div>
      </div>
    </Suspense>
  );
}

export default SignUp;
