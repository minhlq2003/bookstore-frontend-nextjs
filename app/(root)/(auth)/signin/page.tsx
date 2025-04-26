"use client";

import { useTranslation } from "next-i18next";
import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Images } from "../../../../constant/images";
import { Eye, EyeOff } from "lucide-react";
import { loginWithGoogle } from "@/lib/actions/auth";
import {useRouter} from "next/navigation";

function SignIn() {
  const { t } = useTranslation("common");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      console.log('Login successful', data);
      // Handle successful login, e.g., redirect or store token
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("accessToken", data.token);
      if(data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
            {t("LOGIN")}
          </h2>
          <form onSubmit={handleSubmit}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <span
                className="absolute inset-y-0 right-0 top-8 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff color="gray" /> : <Eye color="gray" />}
              </span>
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? 'Logging in...' : t("LOG IN")}
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